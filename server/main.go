package main

import (
	"fmt"

	"log"

	"github.com/gofiber/fiber/v2"

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

	if err := godotenv.Load(); err != nil {
		fmt.Printf("Error loading db credentials: %v", err)
	}

	app := fiber.New()

	// handle CORS error
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	app.Post("/register", controllers.Register)
	app.Post("/login", controllers.Login)
	app.Post("/netflix-plan", controllers.UpdateNetflixPlan)
	app.Get("/user-profile", controllers.GetUserProfileData)

	log.Fatal(app.Listen(":8080"))
}
