package main

import (
	"log"

	"github.com/joho/godotenv"

	"github.com/Vishnu25mvp/ERP/server/user-service/internal/config"
	"github.com/Vishnu25mvp/ERP/server/user-service/internal/model"
	"github.com/Vishnu25mvp/ERP/server/user-service/internal/seed"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("⚠ No .env file found")
	}

	// Connect Database
	config.ConnectDatabase()

	// Run migrations (important if running standalone)
	config.DB.AutoMigrate(
		&model.Tenant{},
		&model.User{},
		&model.Role{},
		&model.Permission{},
		&model.RolePermission{},
		&model.UserRole{},
		&model.Product{},
		&model.Plan{},
		&model.Subscription{},
		&model.Payment{},
	)

	// Seed Super Admin
	seed.SeedSuperAdmin()

	log.Println("✅ Seeding completed successfully")
}
