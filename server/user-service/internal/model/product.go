package model

type Product struct {
	ID          uint   `gorm:"primaryKey"`
	Name        string `gorm:"size:150;not null"`
	Code        string `gorm:"size:100;unique;not null"`
	Description string
	IsActive    bool `gorm:"default:true"`
}
