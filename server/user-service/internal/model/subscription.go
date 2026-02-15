package model

import "time"

type Subscription struct {
	ID        uint `gorm:"primaryKey"`
	TenantID  uint `gorm:"index;not null"`
	ProductID uint `gorm:"not null"`
	PlanID    uint `gorm:"not null"`

	StartDate time.Time
	EndDate   time.Time

	Status string `gorm:"size:50"`
	// active
	// expired
	// cancelled
}
