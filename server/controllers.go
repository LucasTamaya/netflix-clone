package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func RegisterController(c *fiber.Ctx) error {
	user := User{}

	if err := c.BodyParser(&user); err != nil {
		fmt.Println("Failed to parse the body request in the user")
		return err

	}

	query, err := Sql.Prepare("INSERT INTO users (email, password) VALUES(?, ?)")

	if err != nil {
		fmt.Println("Failed to prepare the sql query")
		return err
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		fmt.Println("Failed to hash the password")
		return err
	}

	_, err = query.Exec(user.Email, hashedPassword)

	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(user)

}
