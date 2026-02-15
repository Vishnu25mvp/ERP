package model

import "time"

type Permission struct {
	ID          uint   `gorm:"primaryKey"`
	Code        string `gorm:"size:100;unique;not null"`
	Description string
	CreatedAt   time.Time
}
