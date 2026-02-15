# 🏢 Enterprise SaaS Platform - Architecture & Design

## 📋 System Overview

### Core Modules Structure

```
ENTERPRISE SAAS PLATFORM (Multi-Tenant)
├── 🔐 IAM - Identity & Access Management
│   ├─ Company Management
│   ├─ Staff Users (Admin, Manager, Agent, Accountant, etc)
│   ├─ Role-Based Access Control
│   ├─ Permission Management
│   └─ Activity Audit Logs
│
├── 💼 CRM + Marketing Automation
│   ├─ Lead Inbox (Meta, WhatsApp, Threads, Google Ads)
│   ├─ Pipeline (New → Contacted → Interested → Converted)
│   ├─ AI Lead Scoring
│   ├─ Lead Assignment to Staff
│   ├─ Notes, Follow-ups, Reminders
│   └─ Lead Sources Integration
│
├── ☎️ Call Tracking & AI Conversion
│   ├─ Inbound Calls Tracking
│   ├─ Outbound Calls Tracking
│   ├─ Call Recording (Cloud Storage)
│   ├─ AI Call Scripts & Live Assistant
│   ├─ AI Follow-up Automation
│   ├─ Agent Performance Analytics
│   └─ Auto-call Distribution
│
├── 💬 WhatsApp Automation & Bulk Messaging
│   ├─ Chat Interface (Built-in Platform)
│   ├─ Bulk Messaging Campaigns
│   ├─ AI Flow Builder
│   ├─ Smart Replies (AI-powered)
│   ├─ Lead Conversion from Chats
│   └─ Broadcast Messages
│
├── 📄 Invoice & Billing Management
│   ├─ Proforma Invoices
│   ├─ Quotations
│   ├─ Tax Invoices
│   ├─ Payment Tracking
│   ├─ Receipt Management
│   └─ IMS Integration
│
├── 📦 IMS (Inventory Management System)
│   ├─ Purchase Orders
│   ├─ Goods Receipt Notes
│   ├─ Stock Tracking & Transfers
│   ├─ Returns Management
│   ├─ Product Catalog
│   └─ Reorder Point Optimization
│
├── 🏢 Location & Branch Management
│   ├─ Multi-branch Setup
│   ├─ Inventory per Location
│   ├─ Staff Assignment
│   └─ Branch-level Reporting
│
└── 👥 HRMS (Basic HR Management)
    ├─ Employee Directory
    ├─ Attendance Tracking
    ├─ Leave Management
    └─ Payroll Data
```

## 🛡️ Role-Based Access Control

| Role | Permissions |
|------|------------|
| **ADMIN** | All modules, user management, settings |
| **MANAGER** | CRM, Calls, WhatsApp, Reports (read-only for all) |
| **AGENT** | CRM leads, calls, messaging, own tasks |
| **ACCOUNTANT** | Invoicing, Payments, Reports |
| **INVENTORY_STAFF** | Stock, PO, GRN, Transfers |
| **HR_STAFF** | Employee data, Attendance, Leave |

## 🏗️ Microservices Architecture

- **API Gateway** (3000) - Request routing + JWT validation
- **IAM Service** (3011) - Users, roles, permissions
- **CRM Service** (3021) - Leads, pipeline, notes
- **Call Service** (3031) - Call logs, recordings
- **WhatsApp Service** (3041) - Messaging, flows
- **Invoice Service** (3051) - Invoicing, payments
- **Inventory Service** (3061) - Stock, PO, GRN
- **Branch Service** (3071) - Multi-branch management
- **HRMS Service** (3081) - Employee data, attendance

## 📊 Database Schema (Multi-Tenant)

### Shared Tables
```
companies
├── id, name, subscription_tier, created_at

auth_users
├── id, company_id, email, password_hash, role, permissions

audit_logs
├── id, company_id, user_id, action, resource, timestamp
```

### Per-Company Tenant Tables
```
lead
├── id, name, phone, email, source, status, assigned_to, score, created_at

call_logs
├── id, caller_number, receiver_number, agent_id, status, duration, recording_url

whatsapp_messages
├── id, sender_id, receiver_id, message_text, sent_at

invoices
├── id, invoice_number, customer_id, total_amount, status, created_at

products
├── id, name, category, price, cost, stock_quantity

employees
├── id, name, email, department, position, hire_date

branches
├── id, name, location, manager_id, created_at
```

## 🚀 Getting Started

1. **Read**: PLATFORM_ARCHITECTURE.md  
2. **Build**: Frontend components per module  
3. **Test**: API integration with microservices  
4. **Deploy**: Docker + Kubernetes setup

---

**Platform Version**: 1.0.0  
**Last Updated**: 2024-01-25  
**License**: MIT
