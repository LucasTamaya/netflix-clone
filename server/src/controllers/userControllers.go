package controllers

import (
	"os"

	"github.com/gofiber/fiber/v2"

	"github.com/golang-jwt/jwt/v4"

	"github.com/joho/godotenv"

	"netflix-clone/src/middleware"

	"netflix-clone/src/models"

	"netflix-clone/src/services"
)

func UpdateUserNetflixPlan(c *fiber.Ctx) error {
	user := models.User{}

	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	if err := services.MutateNetflixPlan(user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"ok": true,
	})
}

func GetUserProfileData(c *fiber.Ctx) error {
	if err := godotenv.Load(); err != nil {
		return err
	}

	token, err := middleware.IsAuth(c, os.Getenv("JWT_SECRET"))

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "unauthorized",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)
	email := claims.Issuer

	user := models.User{}

	if err := services.QueryUserProfileData(email, &user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"email":       user.Email,
		"netflixPlan": user.NetflixPlan,
	})
}
