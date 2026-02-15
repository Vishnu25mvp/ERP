package model

import "time"

type User struct {
	ID       uint    `gorm:"primaryKey"`
	TenantID *uint   `gorm:"index"` // NULL for Super Admin
	Tenant   *Tenant `gorm:"foreignKey:TenantID"`

	Name     string `gorm:"size:150;not null"`
	Email    string `gorm:"size:150;unique;not null"`
	Password string `gorm:"size:255;not null"`

	UserType string `gorm:"size:50;not null"`
	// super_admin
	// root
	// iam_user

	IsActive bool `gorm:"default:true"`

	CreatedAt time.Time
	UpdatedAt time.Time
}
