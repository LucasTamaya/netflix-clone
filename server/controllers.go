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
		fmt.Println("Failed to hash the password")
		return err
	}

	return c.Status(fiber.StatusOK).JSON(user)
}

func LoginController(c *fiber.Ctx) error {
	user := User{}
	userFromDb := User{}

	if err := c.BodyParser(&user); err != nil {
		fmt.Println("Failed to parse the body request in the user: ", err)
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := CheckIfUserExists(&user, &userFromDb); err != nil {
		fmt.Println("Failed during the query:", err)
		return c.Status(fiber.StatusNoContent).SendString(err.Error())
	}

	if err := bcrypt.CompareHashAndPassword([]byte(userFromDb.Password), []byte(user.Password)); err != nil {
		fmt.Println("Wrong password", err)
		return c.Status(fiber.StatusOK).SendString("Wrong email or password")
	}

	fmt.Println("Successfull connection")
	return c.Status(fiber.StatusOK).SendString("Successfull connection!")
}
