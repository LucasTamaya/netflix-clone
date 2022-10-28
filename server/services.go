package main

func CheckIfUserExists(user *User) bool {
	err := Sql.QueryRow("SELECT email, password FROM users WHERE email = ?", user.Email).Scan(&user.Email, &user.Password)

	if err != nil {
		return false
	}

	return true
}

func CheckIfUserExistsAndScanData(user *User, userFromDb *User) error {
	err := Sql.QueryRow("SELECT email, password FROM users WHERE email = ?", user.Email).Scan(&userFromDb.Email, &userFromDb.Password)

	if err != nil {
		return err
	}

	return nil
}
