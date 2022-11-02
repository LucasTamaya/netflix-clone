package controllers

import (
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"

	"github.com/golang-jwt/jwt/v4"

	"github.com/joho/godotenv"

	"golang.org/x/crypto/bcrypt"

	"netflix-clone/src/config"
	"netflix-clone/src/middleware"

	"netflix-clone/src/models"

	"netflix-clone/src/services"
)

func Register(c *fiber.Ctx) error {
	user := models.User{}

	if err := c.BodyParser(&user); err != nil {
		fmt.Println("Failed to parse the body request in the user")
		return err
	}

	if existingUser := services.CheckIfUserExists(&user); existingUser == true {
		return c.Status(200).JSON(fiber.Map{
			"ok":    false,
			"error": "User already exists",
		})
	}

	query, err := config.Db.Prepare("INSERT INTO users (email, password) VALUES(?, ?)")

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
		fmt.Println("Failed to execute the query")
		return err
	}

	tokenStr, err := services.CreateJWT(user.Email)

	if err != nil {
		fmt.Println(err.Error())
	}

	fmt.Printf("token: %v\n", tokenStr)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"ok": true,
	})
}

func Login(c *fiber.Ctx) error {
	user := models.User{}
	userFromDb := models.User{}

	if err := c.BodyParser(&user); err != nil {
		fmt.Println("Failed to parse the body request in the user: ", err)
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := services.CheckIfUserExistsAndScanData(&user, &userFromDb); err != nil {
		fmt.Println("Error during the query: ", err)
		return c.Status(200).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(userFromDb.Password), []byte(user.Password)); err != nil {
		fmt.Println("Wrong password", err)
		return c.Status(200).JSON(fiber.Map{
			"ok":    false,
			"error": "Wrong email or password",
		})
	}

	jwt, err := services.CreateJWT(user.Email)

	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Printf("token: %v\n", jwt)

	// store token in a cookie so the browser can access it
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    jwt,
		Expires:  time.Now().Add(time.Hour * 24), // 1 day
		HTTPOnly: true,
		Secure:   true,
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"ok": true,
	})
}

func UpdateNetflixPlan(c *fiber.Ctx) error {
	user := models.User{}

	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"ok":    false,
			"error": err.Error(),
		})
	}

	if err := services.MutateNetflixPlan(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
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
