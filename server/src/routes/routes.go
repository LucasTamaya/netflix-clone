package routes

import (
	"netflix-clone/src/controllers"

	"os"

	"github.com/gofiber/fiber/v2"

	jwtware "github.com/gofiber/jwt/v3"
)

func Setup(app *fiber.App) {
	app.Post("/auth/register", controllers.Register)
	app.Post("/auth/login", controllers.Login)
	app.Patch("/user/netflix-plan", controllers.UpdateUserNetflixPlan)

	// All routes below will use this JWT auth middleware
	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"isError": true,
				"error":   "Unauthorized",
			})
		},
	}))

	app.Get("/auth/valid", controllers.ValidUserAuthentification)
	app.Get("/user/profile", controllers.GetUserProfileData)
}
