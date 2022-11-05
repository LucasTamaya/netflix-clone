package main

import (
	"fmt"

	"log"

	"github.com/gofiber/fiber/v2"

	"github.com/joho/godotenv"

	"github.com/gofiber/fiber/v2/middleware/logger"

	"github.com/gofiber/fiber/v2/middleware/cors"

	"netflix-clone/src/config"

	"netflix-clone/src/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading db credentials")
	}

	fmt.Println("Env variables correctly loaded!")

	err := config.DbConnection()

	if err != nil {
		log.Fatal("Failed to connect to DB")
	}

	defer config.Db.Close()

	app := fiber.New()

	// get request logs
	app.Use(logger.New())

	// middleware to handle CORS error + enable cookies sending to the client
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "https://netflix-clone-plum-psi.vercel.app, https://netflix-clone-lucastamaya.vercel.app, https://netflix-clone-git-master-lucastamaya.vercel.app",
	}))

	routes.Setup(app)

	// url := fmt.Sprintf("0.0.0.0:%v", os.Getenv("PORT"))
	url := ":8080"

	log.Fatal(app.Listen(url))
}
