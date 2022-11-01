package services

import (
	"netflix-clone/src/config"

	"netflix-clone/src/models"
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
