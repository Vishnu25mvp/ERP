import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Register from "./pages/auth/Register";
import DashboardLayout from "./DashboardLayout";
import { modules } from "./modules.config";

// ✅ Import all module components
import Dashboard from "./pages/Dashboard";
import CRMLeads from "./pages/crm/Leads";
import CRMPipeline from "./pages/crm/Pipeline";
import CRMLeadSources from "./pages/crm/CRMLeadSources";
import CRMAnalytics from "./pages/crm/CRMAnalytics";
import CRMCallLogs from "./pages/calls/CRMCallLogs";
import CRMOutboundCalls from "./pages/calls/CRMOutboundCalls";
import CRMLeadAssignment from "./pages/calls/CRMLeadAssignment";
import CRMPerformance from "./pages/calls/CRMPerformance";
import Invoicing from "./pages/invoicing/Invoicing";
import Inventory from "./pages/inventory/Inventory";
import WhatsAppAutomation from "./pages/whatsapp/WhatsAppAutomation";
import WhatsAppCampaigns from "./pages/whatsapp/WhatsAppCampaigns";
import WhatsAppFlows from "./pages/whatsapp/WhatsAppFlows";
import WhatsAppBulk from "./pages/whatsapp/WhatsAppBulk";
import WhatsAppTemplates from "./pages/whatsapp/WhatsAppTemplates";
import WhatsAppFlowBuilder from "./pages/whatsapp/WhatsAppFlowBuilder";
import HRMSEmployees from "./pages/hrms/HRMSEmployees";
import IAMUsers from "./pages/iam/IAMUsers";
import UserPermissions from "./pages/iam/UserPermissions";
import AuditLogs from "./pages/iam/AuditLogs";
import CompanySettings from "./pages/iam/CompanySettings";
import BranchesList from "./pages/branches/BranchManagement";
import CreateBranch from "./pages/branches/CreateBranch";
// ✅ Component Map
const componentMap = {
  "/dashboard": Dashboard,
  "/crm/leads": CRMLeads,
  "/crm/pipeline": CRMPipeline,
  "/crm/sources":CRMLeadSources,
  "/crm/analytics": CRMAnalytics,
  "/calls/logs": CRMCallLogs,
  "/calls/outbound": CRMOutboundCalls,
  "/calls/assignments": CRMLeadAssignment,
  "/calls/performance": CRMPerformance,
  "/whatsapp/chats": WhatsAppAutomation,
  "/whatsapp/campaigns": WhatsAppCampaigns,
  "/whatsapp/flows": WhatsAppFlows,
  "/whatsapp/bulk": WhatsAppBulk,
  "/whatsapp/templates": WhatsAppTemplates,
  "/invoicing/create": Invoicing,
  "/invoicing/list": Invoicing,
  "/invoicing/payments": Invoicing,
  "/invoicing/reports": Invoicing,
  "/inventory/products": Inventory,
  "/inventory/stock": Inventory,
  "/inventory/po": Inventory,
  "/inventory/grn": Inventory,
  "/inventory/transfers": Inventory,
  "/inventory/reorders": Inventory,
  "/hrms/employees": HRMSEmployees,
  "/hrms/attendance": HRMSEmployees,
  "/hrms/leave": HRMSEmployees,
  "/hrms/payroll": HRMSEmployees,
  "/iam/users": IAMUsers,
  "/iam/permissions": UserPermissions,
  "/iam/audit": AuditLogs,
  "/iam/company": CompanySettings,
  "/branches/list":BranchesList,
  "/branches/add":CreateBranch
};

/* ✅ Recursive Route Builder */
function renderRoutes(modulesList) {
  return modulesList.flatMap((mod) => {
    let routes = [];

    // ✅ Main Route (if path exists, get component from map or use config component)
    if (mod.path) {
      const Component = componentMap[mod.path] || mod.component;
      if (Component) {
        routes.push(
          <Route
            key={mod.path}
            path={mod.path}
            element={<Component />}
          />
        );
      }
    }

    // ✅ Child Routes (submenu)
    if (mod.children) {
      routes = routes.concat(renderRoutes(mod.children));
    }

    return routes;
  });
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          {renderRoutes(modules)}
        </Route>

        {/* Redirect Unknown */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
