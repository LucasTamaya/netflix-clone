package main

import (
	"fmt"

	"log"

	"github.com/gofiber/fiber/v2"

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

	app := fiber.New()

	// handle CORS error
	app.Use(cors.New())

	app.Post("/register", controllers.RegisterController)
	app.Post("/login", controllers.LoginController)

	log.Fatal(app.Listen(":8080"))
}
