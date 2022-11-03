package utils

import (
	"fmt"

	"log"

	"github.com/joho/godotenv"
)

func LoadEnvVariables() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading db credentials")
	}

	fmt.Println("Env variables correctly loaded!")
}
