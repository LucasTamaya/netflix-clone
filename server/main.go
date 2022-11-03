package main

import (
	"fmt"

	"log"

	"github.com/gofiber/fiber/v2"

	"github.com/joho/godotenv"

	"github.com/gofiber/fiber/v2/middleware/cors"

	"netflix-clone/src/config"
	"netflix-clone/src/routes"
)

func main() {
	err := config.DbConnection()

	if err != nil {
		log.Fatal("Failed to connect to DB")
	}

	defer config.Db.Close()

	if err := godotenv.Load(); err != nil {
		fmt.Printf("Error loading db credentials: %v", err)
	}

	app := fiber.New()

	// middleware to handle CORS error + enable cookies sending to the client
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)

	log.Fatal(app.Listen(":8080"))
}
