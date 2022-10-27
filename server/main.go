package main

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	// handle CORS error
	app.Use(cors.New())

	log.Fatal(app.Listen(":8080"))
}
