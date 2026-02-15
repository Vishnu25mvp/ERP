package main

import (
	"github.com/Vishnu25mvp/ERP/server/user-service/internal/handler"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	userHandler := handler.NewUserHandler()

	r.GET("/users", userHandler.GetUsers)

	r.Run(":8080")
}
