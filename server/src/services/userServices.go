package services

import (
	"netflix-clone/src/config"
	"os"

	"time"

	"netflix-clone/src/models"

	"github.com/golang-jwt/jwt/v4"

	"github.com/joho/godotenv"
)

func CheckIfUserExists(user *models.User) bool {
	err := config.Db.QueryRow("SELECT email, password FROM users WHERE email = ?", user.Email).Scan(&user.Email, &user.Password)

	if err != nil {
		return false
	}

	return true
}

func CheckIfUserExistsAndScanData(user *models.User, userFromDb *models.User) error {
	err := config.Db.QueryRow("SELECT email, password FROM users WHERE email = ?", user.Email).Scan(&userFromDb.Email, &userFromDb.Password)

	if err != nil {
		return err
	}

	return nil
}

func MutateNetflixPlan(user models.User) error {
	query, err := config.Db.Prepare("UPDATE users SET netflixPlan = ? WHERE email = ?")

	if err != nil {
		return err
	}

	_, err = query.Exec(user.NetflixPlan, user.Email)

	if err != nil {
		return err
	}

	return nil
}

func CreateJWT(email string) (string, error) {
	envErr := godotenv.Load()

	if envErr != nil {
		return "", envErr
	}

	claims := jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Hour * 24).Unix(), // 1 day
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	encodedToken, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}

	return encodedToken, nil
}
