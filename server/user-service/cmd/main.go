package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/Vishnu25mvp/ERP/server/user-service/internal/config"
	"github.com/Vishnu25mvp/ERP/server/user-service/internal/handler"
	"github.com/Vishnu25mvp/ERP/server/user-service/internal/middleware"
	"github.com/Vishnu25mvp/ERP/server/user-service/internal/model"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	config.ConnectDatabase()
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

	config.ConnectRedis()

	r := gin.Default()

	// middleware
	r.Use(middleware.ErrorHandler())

	// controller
	userHandler := handler.NewUserHandler()
	authHandler := handler.NewUserHandler()

	r.GET("/users", userHandler.GetUsers)
	r.POST("/auth/register", authHandler.Register)
	r.POST("/auth/login", authHandler.Login)

	r.Run(":8080")
}
