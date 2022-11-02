package middleware

import (
	"github.com/gofiber/fiber/v2"

	"github.com/golang-jwt/jwt/v4"
)

func IsAuth(c *fiber.Ctx, secret string) (*jwt.Token, error) {

	cookie := c.Cookies("token")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		return nil, err
	}

	return token, nil
}
