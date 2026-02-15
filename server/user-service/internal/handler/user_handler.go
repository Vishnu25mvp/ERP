package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct{}

func NewUserHandler() *UserHandler {
	return &UserHandler{}
}

func (h *UserHandler) GetUsers(c *gin.Context) {
	users := []string{"Vishnu", "John", "Rahul"}

	c.JSON(http.StatusOK, gin.H{
		"data": users,
	})
}
