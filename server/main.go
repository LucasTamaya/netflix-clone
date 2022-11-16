package main

import (
	"fmt"

	"os"

	"log"

	"github.com/gofiber/fiber/v2"

	"github.com/gofiber/fiber/v2/middleware/cors"

	"github.com/gofiber/fiber/v2/middleware/logger"

	"netflix-clone/src/config"

	"netflix-clone/src/routes"
)

func main() {
	// if err := godotenv.Load(); err != nil {
	// 	log.Fatal("Error loading db credentials")
	// }

	// fmt.Println("Env variables correctly loaded!")

	err := config.DbConnection()

	if err != nil {
		log.Fatal("Failed to connect to DB")
	}

	defer config.Db.Close()

	app := fiber.New()

	// get request logs
	app.Use(logger.New())

	// handle CORS error
	app.Use(cors.New(cors.Config{
		AllowOrigins: "https://netflix-clone-plum-psi.vercel.app, https://netflix-clone-lucastamaya.vercel.app, https://netflix-clone-git-master-lucastamaya.vercel.app",
	}))
	// app.Use(cors.New())

	routes.Setup(app)

	url := fmt.Sprintf("0.0.0.0:%v", os.Getenv("PORT"))
	// url := ":8080"

	log.Fatal(app.Listen(url))
}
