package models

type User struct {
	Id          int    `json:"id"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	NetflixPlan string `json:"netflixPlan"`
}
