package controllers

import (
	"github.com/gofiber/fiber/v2"

	"golang.org/x/crypto/bcrypt"

	"netflix-clone/src/config"

	"netflix-clone/src/models"

	"netflix-clone/src/services"
)

func Register(c *fiber.Ctx) error {
	user := models.User{}

	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	if existingUser := services.CheckIfUserExists(&user); existingUser == true {
		return c.Status(200).JSON(fiber.Map{
			"ok":    false,
			"error": "User already exists",
		})
	}

	query, err := config.Db.Prepare("INSERT INTO users (email, password) VALUES(?, ?)")

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	_, err = query.Exec(user.Email, hashedPassword)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	token, err := services.CreateJWT(user.Email)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	services.SendCookiesOnAuth(c, token)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"ok": true,
	})
}

func Login(c *fiber.Ctx) error {
	user := models.User{}
	userFromDb := models.User{}

	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	if err := services.CheckIfUserExistsAndScanData(&user, &userFromDb); err != nil {
		return c.Status(200).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(userFromDb.Password), []byte(user.Password)); err != nil {
		return c.Status(200).JSON(fiber.Map{
			"ok":    false,
			"error": "Wrong email or password",
		})
	}

	token, err := services.CreateJWT(user.Email)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	services.SendCookiesOnAuth(c, token)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"ok": true,
	})
}

func Logout(c *fiber.Ctx) error {
	c.ClearCookie()
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"ok": true,
	})
}
