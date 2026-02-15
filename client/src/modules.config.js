import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  Workflow,
  Phone,
  MessageSquare,
  FileText,
  MapPin,
  UserCheck,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";
import Dashboard from "./pages/Dashboard";

export const modules = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    sideNav: true,
    component: Dashboard,
    permission: "dashboard",
    roles: ["admin", "manager", "agent", "accountant", "inventory_staff", "hr_staff"],
  },

  {
    name: "CRM",
    icon: Users,
    sideNav: true,
    permission: "crm",
    roles: ["admin", "manager", "agent"],
    children: [
      {
        name: "Leads",
        path: "/crm/leads",
        sideNav: true,
        permission: "crm.leads",
      },
      {
        name: "Pipeline",
        path: "/crm/pipeline",
        sideNav: true,
        permission: "crm.pipeline",
      },
      {
        name: "Lead Sources",
        path: "/crm/sources",
        sideNav: true,
        permission: "crm.sources",
      },
      {
        name: "Analytics",
        path: "/crm/analytics",
        sideNav: true,
        permission: "crm.analytics",
      },
    ],
  },

  {
    name: "Call Tracking",
    icon: Phone,
    sideNav: true,
    permission: "calls",
    roles: ["admin", "manager", "agent"],
    children: [
      {
        name: "Call Logs",
        path: "/calls/logs",
        sideNav: true,
        permission: "calls.inbound",
      },
      {
        name: "Outbound Calls",
        path: "/calls/outbound",
        sideNav: true,
        permission: "calls.outbound",
      },
      {
        name: "Leads Assignments",
        path: "/calls/assignments",
        sideNav: true,
        permission: "calls.recordings",
      },
      {
        name: "Performance",
        path: "/calls/performance",
        sideNav: true,
        permission: "calls.performance",
      },
    ],
  },

  {
    name: "WhatsApp",
    icon: MessageSquare,
    sideNav: true,
    permission: "whatsapp",
    roles: ["admin", "manager", "agent"],
    children: [
      {
        name: "Chats",
        path: "/whatsapp/chats",
        sideNav: true,
        permission: "whatsapp.chats",
      },
      {
        name: "Campaigns",
        path: "/whatsapp/campaigns",
        sideNav: true,
        permission: "whatsapp.campaigns",
      },
      {
        name: "Flows",
        path: "/whatsapp/flows",
        sideNav: true,
        permission: "whatsapp.flows",
      },
      {
        name: "Bulk Send",
        path: "/whatsapp/bulk",
        sideNav: true,
        permission: "whatsapp.bulk",
      },
      {
        name: "Templates",
        path: "/whatsapp/templates",
        sideNav: true,
        permission: "whatsapp.bulk",
      },
    ],
  },

  // {
  //   name: "Invoicing",
  //   icon: FileText,
  //   sideNav: true,
  //   permission: "invoicing",
  //   roles: ["admin", "manager", "accountant"],
  //   children: [
  //     {
  //       name: "Create Invoice",
  //       path: "/invoicing/create",
  //       sideNav: true,
  //       permission: "invoicing.create",
  //     },
  //     {
  //       name: "All Invoices",
  //       path: "/invoicing/list",
  //       sideNav: true,
  //       permission: "invoicing.view",
  //     },
  //     {
  //       name: "Payments",
  //       path: "/invoicing/payments",
  //       sideNav: true,
  //       permission: "invoicing.payments",
  //     },
  //     {
  //       name: "Reports",
  //       path: "/invoicing/reports",
  //       sideNav: true,
  //       permission: "invoicing.reports",
  //     },
  //   ],
  // },

  // {
  //   name: "Inventory",
  //   icon: Package,
  //   sideNav: true,
  //   permission: "inventory",
  //   roles: ["admin", "manager", "inventory_staff"],
  //   children: [
  //     {
  //       name: "Products",
  //       path: "/inventory/products",
  //       sideNav: true,
  //       permission: "inventory.products",
  //     },
  //     {
  //       name: "Stock",
  //       path: "/inventory/stock",
  //       sideNav: true,
  //       permission: "inventory.stock",
  //     },
  //     {
  //       name: "Purchase Orders",
  //       path: "/inventory/po",
  //       sideNav: true,
  //       permission: "inventory.po",
  //     },
  //     {
  //       name: "Goods Receipt",
  //       path: "/inventory/grn",
  //       sideNav: true,
  //       permission: "inventory.grn",
  //     },
  //     {
  //       name: "Transfers",
  //       path: "/inventory/transfers",
  //       sideNav: true,
  //       permission: "inventory.transfers",
  //     },
  //     {
  //       name: "Reorders",
  //       path: "/inventory/reorders",
  //       sideNav: true,
  //       permission: "inventory.reorders",
  //     },
  //   ],
  // },

  {
    name: "Locations",
    icon: MapPin,
    sideNav: true,
    permission: "branches",
    roles: ["admin", "manager"],
    children: [
      {
        name: "All Branches",
        path: "/branches/list",
        sideNav: true,
        permission: "branches.view",
      },
      {
        name: "Add Branch",
        path: "/branches/add",
        sideNav: true,
        permission: "branches.create",
      },
      // {
      //   name: "Branch Reports",
      //   path: "/branches/reports",
      //   sideNav: true,
      //   permission: "branches.reports",
      // },
    ],
  },

  // {
  //   name: "HRMS",
  //   icon: UserCheck,
  //   sideNav: true,
  //   permission: "hrms",
  //   roles: ["admin", "manager", "hr_staff"],
  //   children: [
  //     {
  //       name: "Employees",
  //       path: "/hrms/employees",
  //       sideNav: true,
  //       permission: "hrms.employees",
  //     },
  //     {
  //       name: "Attendance",
  //       path: "/hrms/attendance",
  //       sideNav: true,
  //       permission: "hrms.attendance",
  //     },
  //     {
  //       name: "Leave Requests",
  //       path: "/hrms/leave",
  //       sideNav: true,
  //       permission: "hrms.leave",
  //     },
  //     {
  //       name: "Payroll",
  //       path: "/hrms/payroll",
  //       sideNav: true,
  //       permission: "hrms.payroll",
  //     },
  //   ],
  // },

  {
    name: "IAM",
    icon: Shield,
    sideNav: true,
    permission: "iam",
    roles: ["admin"],
    children: [
      {
        name: "Users & Roles",
        path: "/iam/users",
        sideNav: true,
        permission: "iam.users",
      },
      {
        name: "Permissions",
        path: "/iam/permissions",
        sideNav: true,
        permission: "iam.permissions",
      },
      {
        name: "Audit Logs",
        path: "/iam/audit",
        sideNav: true,
        permission: "iam.audit",
      },
      {
        name: "Company Settings",
        path: "/iam/company",
        sideNav: true,
        permission: "iam.company",
      },
    ],
  },

  {
    name: "Settings",
    icon: Settings,
    sideNav: true,
    path: "/settings",
    permission: "settings",
    roles: ["admin", "manager"],
  },
];
