package handler

import (
	"net/http"

	"github.com/Vishnu25mvp/ERP/server/user-service/internal/utils"
	"github.com/gin-gonic/gin"
)

type UserHandler struct{}

func NewUserHandler() *UserHandler {
	return &UserHandler{}
}

func (h *UserHandler) GetUsers(c *gin.Context) {
	users := []string{"Vishnu", "John", "Rahul"}

	utils.SuccessResponse(c, http.StatusOK, "Users fetched successfully", users)
}
