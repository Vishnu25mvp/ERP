package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/Vishnu25mvp/ERP/server/user-service/internal/config"
	"github.com/Vishnu25mvp/ERP/server/user-service/internal/handler"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	config.ConnectDatabase()
	config.ConnectRedis()

	r := gin.Default()

	userHandler := handler.NewUserHandler()

	r.GET("/users", userHandler.GetUsers)

	r.Run(":8080")
}
