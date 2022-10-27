package main

import (
	"database/sql"

	"fmt"

	"log"

	"github.com/gofiber/fiber/v2"

	"github.com/gofiber/fiber/v2/middleware/cors"

	"netflix-clone/src/config"
)

var Sql *sql.DB

func main() {
	db, err := config.DbConnection()

	if err != nil {
		fmt.Println("Failed to connect to DB")
	}

	fmt.Println("Connected to DB!")

	Sql = db

	app := fiber.New()

	// handle CORS error
	app.Use(cors.New())

	app.Post("/register", RegisterController)

	log.Fatal(app.Listen(":8080"))
}
