package model

import "time"

type Role struct {
	ID        uint   `gorm:"primaryKey"`
	TenantID  uint   `gorm:"index;not null"`
	Name      string `gorm:"size:100;not null"`
	IsSystem  bool   `gorm:"default:false"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
