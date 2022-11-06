package controllers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"

	"netflix-clone/src/models"

	"netflix-clone/src/services"
)

func UpdateUserNetflixPlan(c *fiber.Ctx) error {
	user := models.User{}

	if err := c.BodyParser(&user); err != nil {
		fmt.Println("Error with BodyParser")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"isError": true,
			"error":   err.Error(),
		})
	}

	if err := services.MutateNetflixPlan(user); err != nil {
		fmt.Println("Error when mutating netflix plan")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"isError": true,
			"error":   err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"isSuccess": true,
	})
}

func GetUserProfileData(c *fiber.Ctx) error {
	email := services.GetJWTPayload(c, "email")
	user := models.User{}

	if err := services.QueryUserProfileData(email, &user); err != nil {
		fmt.Println("Error during QueryUserProfileData")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"isError": true,
			"error":   err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"isSuccess":   true,
		"email":       user.Email,
		"netflixPlan": user.NetflixPlan,
	})
}
