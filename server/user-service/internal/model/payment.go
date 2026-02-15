package model

import "time"

type Payment struct {
	ID             uint    `gorm:"primaryKey"`
	TenantID       uint    `gorm:"index;not null"`
	SubscriptionID uint    `gorm:"not null"`
	Amount         float64 `gorm:"not null"`
	Status         string  `gorm:"size:50"`
	// pending
	// paid
	// failed

	PaymentRef string
	CreatedAt  time.Time
}
