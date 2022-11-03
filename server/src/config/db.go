package config

import (
	"database/sql"

	"fmt"

	"os"

	_ "github.com/go-sql-driver/mysql"
)

var Db *sql.DB

func DbConnection() error {
	dbConnectionString := fmt.Sprintf("%v:%v@tcp(%v:%v)/%v", os.Getenv("MYSQL_DB_USER"), os.Getenv("MYSQL_DB_PWD"), os.Getenv("MYSQL_DB_HOST"), os.Getenv("MYSQL_DB_PORT"), os.Getenv("MYSQL_DB_NAME"))

	db, err := sql.Open("mysql", dbConnectionString)

	if err != nil {
		return err
	}

	Db = db
	return nil
}
