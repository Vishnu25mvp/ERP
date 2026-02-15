package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type CustomClaims struct {
	UserID       uint     `json:"user_id"`
	TenantID     *uint    `json:"tenant_id"`
	UserType     string   `json:"user_type"`
	Roles        []string `json:"roles"`
	Permissions  []string `json:"permissions"`
	Subscription string   `json:"subscription_status"`
	jwt.RegisteredClaims
}

func GenerateJWT(claims CustomClaims) (string, error) {
	claims.ExpiresAt = jwt.NewNumericDate(time.Now().Add(24 * time.Hour))
	claims.IssuedAt = jwt.NewNumericDate(time.Now())

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func VerifyJWT(tokenString string) (*CustomClaims, error) {

	secret := []byte(os.Getenv("JWT_SECRET"))

	token, err := jwt.ParseWithClaims(
		tokenString,
		&CustomClaims{},
		func(token *jwt.Token) (interface{}, error) {

			// Validate signing method
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, jwt.ErrSignatureInvalid
			}

			return secret, nil
		},
	)

	if err != nil {
		return nil, err
	}

	// Extract claims
	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, jwt.ErrTokenInvalidClaims
}
