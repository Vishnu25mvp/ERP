package model

import "time"

type Tenant struct {
	ID        uint   `gorm:"primaryKey"`
	Name      string `gorm:"size:150;not null"`
	Domain    string `gorm:"size:150;unique"`
	IsActive  bool   `gorm:"default:true"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
