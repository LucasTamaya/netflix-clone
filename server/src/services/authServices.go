package services

import (
	"os"

	"time"

	"github.com/gofiber/fiber/v2"

	"github.com/golang-jwt/jwt/v4"
)

func CreateJWT(email string) (string, error) {
	claims := jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Hour * 24).Unix(), //1 day
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	jwt, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}

	return jwt, nil
}

func GetJWTPayload(c *fiber.Ctx, payloadKey string) string {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	payload := claims[payloadKey].(string)

	return payload
}
