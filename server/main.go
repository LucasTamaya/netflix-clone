package main

import (
	"fmt"

	"os"

	"log"

	"github.com/gofiber/fiber/v2"

	"github.com/joho/godotenv"

	jwtware "github.com/gofiber/jwt/v3"

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
	app.Use(cors.New())

	app.Post("/register", controllers.RegisterController)
	app.Post("/login", controllers.LoginController)

	// JWT Middleware
	// All routes after will use this middleware
	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
	}))

	app.Post("/netflix-plan", controllers.UpdateNetflixPlan)

	log.Fatal(app.Listen(":8080"))
}
