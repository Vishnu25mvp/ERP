package config

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	schema := os.Getenv("DB_SCHEMA")

	// First connect WITHOUT search_path (to create schema safely)
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}

	DB = database

	// Create schema if not exists
	if err := DB.Exec(fmt.Sprintf("CREATE SCHEMA IF NOT EXISTS %s", schema)).Error; err != nil {
		log.Fatal("❌ Failed to create schema:", err)
	}

	// Set search path
	if err := DB.Exec(fmt.Sprintf("SET search_path TO %s", schema)).Error; err != nil {
		log.Fatal("❌ Failed to set search_path:", err)
	}

	fmt.Println("✅ Database connected with schema:", schema)
}
