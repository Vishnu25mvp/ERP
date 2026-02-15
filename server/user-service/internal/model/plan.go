package model

type Plan struct {
	ID             uint    `gorm:"primaryKey"`
	ProductID      uint    `gorm:"index;not null"`
	Name           string  `gorm:"size:100;not null"`
	Price          float64 `gorm:"not null"`
	Currency       string  `gorm:"size:10;default:'INR'"`
	DurationInDays int     `gorm:"not null"`
	IsActive       bool    `gorm:"default:true"`
}
