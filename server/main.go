package main

import (
	"fmt"
	"os"

	"log"

	"github.com/gofiber/fiber/v2"

	jwtware "github.com/gofiber/jwt/v3"

	"github.com/joho/godotenv"

	"github.com/gofiber/fiber/v2/middleware/cors"

	"netflix-clone/src/config"

	"netflix-clone/src/controllers"
)

func main() {
	err := config.DbConnection()

	if err != nil {
		fmt.Println("Failed to connect to DB")
	}

	fmt.Println("Connected to DB!")

	defer config.Db.Close()

	envErr := godotenv.Load()

	if envErr != nil {
		fmt.Printf("Error loading db credentials: %v", envErr)
	}

	app := fiber.New()

	// handle CORS error
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	app.Post("/register", controllers.Register)
	app.Post("/login", controllers.Login)

	// JWT Middleware
	// All routes after will use this middleware
	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"ok":    false,
				"error": "Unauthorized",
			})
		},
	}))

	app.Post("/netflix-plan", controllers.UpdateNetflixPlan)

	app.Get("/user-profile", controllers.GetUserProfileData)

	log.Fatal(app.Listen(":8080"))
}
