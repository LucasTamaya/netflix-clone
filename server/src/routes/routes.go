package routes

import (
	"netflix-clone/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/register", controllers.Register)
	app.Post("/login", controllers.Login)
	app.Get("/logout", controllers.Logout)
	app.Post("/netflix-plan", controllers.UpdateNetflixPlan)
	app.Get("/user-profile", controllers.GetUserProfileData)
}
