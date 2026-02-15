package utils

import "github.com/gin-gonic/gin"

func SuccessResponse(c *gin.Context, status int, message string, data any) {
	c.JSON(status, gin.H{
		"success": true,
		"message": message,
		"data":    data,
	})
}

func ErrorResponse(c *gin.Context, status int, message string) {
	c.JSON(status, gin.H{
		"success": false,
		"error":   message,
	})
}

func ValidationErrorResponse(c *gin.Context, status int, errors any) {
	c.JSON(status, gin.H{
		"success": false,
		"errors":  errors,
	})
}
