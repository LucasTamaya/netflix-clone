package middleware

import (
	"fmt"

	"os"

	"github.com/gofiber/fiber/v2"

	"github.com/golang-jwt/jwt/v4"
)

func IsAuth(c *fiber.Ctx) (*jwt.Token, error) {
	cookie := c.Cookies("token")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		fmt.Println("Error during auth proccess: ", err.Error())
		return nil, err
	}

	return token, nil
}
