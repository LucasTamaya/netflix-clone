package services

import (
	"os"

	"time"

	"github.com/gofiber/fiber/v2"

	"github.com/golang-jwt/jwt/v4"
)

func CreateJWT(email string) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    email,
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 day
	})

	token, err := claims.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}

	return token, nil
}

func SendCookiesOnAuth(c *fiber.Ctx, token string) {
	// JWT to secure my API
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24), // 1 day
		HTTPOnly: true,
		Secure:   true,
		SameSite: "None",
	})

	// to keep track if the user is auth on the client
	c.Cookie(&fiber.Cookie{
		Name:    "isAuth",
		Value:   "true",
		Expires: time.Now().Add(time.Hour * 24),
	})
}
