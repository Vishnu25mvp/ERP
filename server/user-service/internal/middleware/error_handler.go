package middleware

import (
	"net/http"

	"github.com/Vishnu25mvp/ERP/server/user-service/internal/utils"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Next()

		if len(c.Errors) > 0 {
			err := c.Errors.Last().Err

			// Handle validation errors
			if validationErrors, ok := err.(validator.ValidationErrors); ok {

				errors := make([]map[string]string, 0)

				for _, fieldErr := range validationErrors {
					errors = append(errors, map[string]string{
						"field": fieldErr.Field(),
						"error": fieldErr.Tag(),
					})
				}

				utils.ValidationErrorResponse(c, http.StatusBadRequest, errors)
				return
			}

			// Custom app error
			if appErr, ok := err.(*utils.AppError); ok {
				utils.ErrorResponse(c, appErr.StatusCode, appErr.Message)
				return
			}

			// Default fallback
			utils.ErrorResponse(c, http.StatusInternalServerError, "Internal Server Error")
		}
	}
}
