package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"

	"github.com/gofiber/fiber/v2/middleware/cors"

	"netflix-clone/src/config"

	"netflix-clone/src/routes"
)

func main() {
	// loads env variables just once here, so that the whole app can access it

	err := config.DbConnection()

	if err != nil {
		log.Fatal("Failed to connect to DB")
	}

	defer config.Db.Close()

	app := fiber.New()

	// middleware to handle CORS error + enable cookies sending to the client
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)

	url := fmt.Sprintf("0.0.0.0:%v", os.Getenv("PORT"))
	log.Fatal(app.Listen(url))
}
