package seed

import (
	"fmt"
	"log"

	"github.com/Vishnu25mvp/ERP/server/user-service/internal/config"
	"github.com/Vishnu25mvp/ERP/server/user-service/internal/model"
	"github.com/Vishnu25mvp/ERP/server/user-service/internal/utils"
)

func SeedSuperAdmin() {
	var count int64

	// Check if super admin already exists
	config.DB.Model(&model.User{}).
		Where("user_type = ?", "super_admin").
		Count(&count)

	if count > 0 {
		fmt.Println("✅ Super Admin already exists")
		return
	}

	// Use utility for hashing
	hashedPassword, err := utils.HashPassword("SuperAdmin@123")
	if err != nil {
		log.Fatal("❌ Failed to hash password:", err)
	}

	superAdmin := model.User{
		Name:     "Super Admin",
		Email:    "admin@erp.com",
		Password: hashedPassword,
		UserType: "super_admin",
		IsActive: true,
	}

	if err := config.DB.Create(&superAdmin).Error; err != nil {
		log.Fatal("❌ Failed to create Super Admin:", err)
	}

	fmt.Println("🔥 Super Admin created successfully")
}
