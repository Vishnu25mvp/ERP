package handler

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgconn"

	"github.com/Vishnu25mvp/ERP/server/user-service/internal/config"
	"github.com/Vishnu25mvp/ERP/server/user-service/internal/model"
	"github.com/Vishnu25mvp/ERP/server/user-service/internal/utils"
)

type RegisterRequest struct {
	CompanyName string `json:"company_name" binding:"required"`
	Domain      string `json:"domain" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	Password    string `json:"password" binding:"required,min=8"`
	Name        string `json:"name" binding:"required"`
}

func (h *UserHandler) Register(c *gin.Context) {
	var req RegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.Error(err)
		return
	}

	tx := config.DB.Begin()

	tenant := model.Tenant{
		Name: req.CompanyName,
		Domain: req.Domain,
	}

	if err := tx.Create(&tenant).Error; err != nil {
		tx.Rollback()
		status, msg := mapDBErrorToResponse(err, "tenant")
		utils.ErrorResponse(c, status, msg)
		return
	}

	hashedPassword, _ := utils.HashPassword(req.Password)

	rootUser := model.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: hashedPassword,
		UserType: "root",
		TenantID: &tenant.ID,
		IsActive: true,
	}

	if err := tx.Create(&rootUser).Error; err != nil {
		tx.Rollback()
		status, msg := mapDBErrorToResponse(err, "user")
		utils.ErrorResponse(c, status, msg)
		return
	}

	tx.Commit()

	utils.SuccessResponse(c, http.StatusCreated, "Tenant and Root User created successfully", nil)
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (h *UserHandler) Login(c *gin.Context) {
	var req LoginRequest
	var user model.User

	if err := c.ShouldBindJSON(&req); err != nil {
		c.Error(err)
		return
	}

	if err := config.DB.Preload("Tenant").
		Where("email = ?", req.Email).
		First(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusUnauthorized, "Invalid credentials")
		return
	}

	if err := utils.CheckPassword(user.Password, req.Password); err != nil {
		utils.ErrorResponse(c, http.StatusUnauthorized, "Invalid credentials")
		return
	}

	// Load roles
	var roles []model.Role
	config.DB.Joins("JOIN user_roles ur ON ur.role_id = roles.id").
		Where("ur.user_id = ?", user.ID).
		Find(&roles)

	roleNames := []string{}
	for _, r := range roles {
		roleNames = append(roleNames, r.Name)
	}

	// Load permissions
	var permissions []model.Permission
	config.DB.Joins("JOIN role_permissions rp ON rp.permission_id = permissions.id").
		Joins("JOIN user_roles ur ON ur.role_id = rp.role_id").
		Where("ur.user_id = ?", user.ID).
		Find(&permissions)

	permCodes := []string{}
	for _, p := range permissions {
		permCodes = append(permCodes, p.Code)
	}

	// Load subscription
	var subscription model.Subscription
	config.DB.Where("tenant_id = ? AND status = ?", user.TenantID, "active").
		First(&subscription)

	subStatus := "none"
	if subscription.ID != 0 && subscription.EndDate.After(time.Now()) {
		subStatus = "active"
	}

	token, _ := utils.GenerateJWT(utils.CustomClaims{
		UserID:       user.ID,
		TenantID:     user.TenantID,
		UserType:     user.UserType,
		Roles:        roleNames,
		Permissions:  permCodes,
		Subscription: subStatus,
	})

	utils.SuccessResponse(c, http.StatusOK, "Login successful", gin.H{
		"token": token,
	})
}

func mapDBErrorToResponse(err error, entity string) (int, string) {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) && pgErr.Code == "23505" {
		constraint := strings.ToLower(pgErr.ConstraintName)
		msg := strings.ToLower(pgErr.Message)

		if strings.Contains(constraint, "tenant") || strings.Contains(msg, "tenants") {
			if strings.Contains(constraint, "domain") || strings.Contains(msg, "domain") {
				return http.StatusConflict, "Tenant domain already exists. Please use a different domain."
			}
			return http.StatusConflict, "Tenant already exists."
		}

		if strings.Contains(constraint, "user") || strings.Contains(msg, "users") {
			if strings.Contains(constraint, "email") || strings.Contains(msg, "email") {
				return http.StatusConflict, "Email is already registered. Please use a different email."
			}
			return http.StatusConflict, "User already exists."
		}

		return http.StatusConflict, "Duplicate value already exists."
	}

	if entity == "tenant" {
		return http.StatusInternalServerError, "Failed to create tenant"
	}
	return http.StatusInternalServerError, "Failed to create root user"
}
