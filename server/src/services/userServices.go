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
	if err := godotenv.Load(); err != nil {
		return "", err
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    email,
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 day
	})

	token, err := claims.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}

	return token, nil
}

func QueryUserProfileData(email string, user *models.User) error {
	err := config.Db.QueryRow("SELECT email, netflixPlan FROM users WHERE email = ?", email).Scan(&user.Email, &user.NetflixPlan)

	if err != nil {
		return err
	}

	return nil
}
