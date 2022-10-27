package main

import (
	"database/sql"

	"fmt"

	"log"

	"github.com/gofiber/fiber/v2"

	"github.com/gofiber/fiber/v2/middleware/cors"
)

type User struct {
	Id       int
	Email    string
	Password string
}

var Sql *sql.DB

func main() {
	db, err := dbConnection()

	if err != nil {
		fmt.Println("Failed to connect to DB")
	}

	fmt.Println("Connected to DB!")

	Sql = db

	app := fiber.New()

	// handle CORS error
	app.Use(cors.New())

	log.Fatal(app.Listen(":8080"))
}
