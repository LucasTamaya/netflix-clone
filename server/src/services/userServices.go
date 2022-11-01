package services

import (
	"fmt"
	"netflix-clone/src/config"
	"time"

	"netflix-clone/src/models"

	"github.com/golang-jwt/jwt/v4"
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

	secret := []byte("abce")

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = email
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix() // 1 day

	tokenStr, err := token.SignedString(secret)

	if err != nil {
		fmt.Println(err.Error())
		return "", err
	}

	return tokenStr, nil
}
