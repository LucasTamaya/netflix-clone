package controllers

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"

	"github.com/golang-jwt/jwt/v4"

	"netflix-clone/src/middleware"

	"netflix-clone/src/models"

	"netflix-clone/src/services"
)

func UpdateUserNetflixPlan(c *fiber.Ctx) error {
	user := models.User{}

	if err := c.BodyParser(&user); err != nil {
		fmt.Println("Error with BodyParser")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"isSuccess": false,
			"error":     err.Error(),
		})
	}

	if err := services.MutateNetflixPlan(user); err != nil {
		fmt.Println("Error when mutating netflix plan")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"isSuccess": false,
			"error":     err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"isSuccess": true,
	})
}

func GetUserProfileData(c *fiber.Ctx) error {
	token, err := middleware.IsAuth(c, os.Getenv("JWT_SECRET"))

	if err != nil {
		fmt.Println("Unauthorized access")
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"isSuccess": false,
			"error":     "unauthorized",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)
	email := claims.Issuer

	user := models.User{}

	if err := services.QueryUserProfileData(email, &user); err != nil {
		fmt.Println("Error during QueryUserProfileData")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"isSuccess": false,
			"error":     err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"email":       user.Email,
		"netflixPlan": user.NetflixPlan,
	})
}
