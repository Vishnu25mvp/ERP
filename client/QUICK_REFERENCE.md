# ⚡ Developer Quick Reference

## 🔍 Finding What You Need

### To Use an API:
```javascript
// In any component
import { crmAPI } from '../api/moduleAPI';

// Create lead
await crmAPI.createLead({ name, email, phone, source });

// Get leads
const leads = await crmAPI.getLeads(filters);

// Similar for other services:
callAPI.*, whatsappAPI.*, invoicingAPI.*, etc.
```

### To Check Permissions:
```javascript
import { PermissionGate } from '../components/ProtectedRoute';
import { PERMISSIONS } from '../context/IAMContext';

<PermissionGate permission={PERMISSIONS.CRM_LEADS_CREATE}>
  <button>Add Lead</button>
</PermissionGate>
```

### To Check Roles:
```javascript
import { RoleGate } from '../components/ProtectedRoute';
import { ROLES } from '../context/IAMContext';

<RoleGate role={ROLES.ADMIN}>
  <AdminPanel />
</RoleGate>

// Multiple roles
<RoleGate role={[ROLES.ADMIN, ROLES.MANAGER]}>
  <ReportingPanel />
</RoleGate>
```

### To Access Multi-Tenant Context:
```javascript
import { useMultiTenant } from '../context/MultiTenantContext';

const { currentTenant, switchTenant } = useMultiTenant();
// All API calls automatically include X-Company-ID header
```

### To Access IAM Context:
```javascript
import { useIAM } from '../context/IAMContext';

const { currentUser, userRole, hasPermission } = useIAM();

if (hasPermission(PERMISSIONS.CRM_LEADS_EDIT)) {
  // Show edit button
}
```

### To Access Theme:
```javascript
import { useTheme } from '../context/ThemeContext';

const { theme, isDark, setTheme } = useTheme();
```

---

## 📂 File Locations Cheat Sheet

| What | Where |
|-----|-------|
| **Create API endpoint** | `src/api/moduleAPI.js` → Find service → Add method |
| **Add new page/module** | `src/pages/module-name/PageName.jsx` → Import in routes.jsx |
| **Add sidebar item** | `src/modules.config.js` → Add to modules array |
| **Add new permission** | `src/context/IAMContext.jsx` → PERMISSIONS object → modules.config.js |
| **Add new role** | `src/context/IAMContext.jsx` → ROLES object → moduleSettings |
| **Auth flow** | `src/api/auth.js` |
| **Reusable components** | `src/components/` |

---

## 🔌 API Service Methods Available

### CRM API (crmAPI)
```js
getLeads(filters)
createLead(data)
updateLead(id, data)
deleteLead(id)
assignLead(id, agentId)
getPipeline()
moveLead(id, stage)
addNote(leadId, note)
scheduleFollowUp(leadId, date)
getLeadActivity(id)
scoreLead(id)
```

### Call API (callAPI)
```js
getCallLogs(filters)
logInboundCall(data)
logOutboundCall(data)
uploadRecording(callId, file)
getRecording(callId)
transcribeRecording(callId)
getAgentMetrics(agentId)
getCallAnalytics()
deleteCallLog(id)
```

### WhatsApp API (whatsappAPI)
```js
getChats(filters)
sendMessage(data)
getCampaigns()
createCampaign(data)
getFlows()
createFlow(data)
sendBulkMessage(data)
getBroadcastStatus(id)
convertChatToLead(chatId)
```

### Invoicing API (invoicingAPI)
```js
getInvoices(filters)
createInvoice(data)
updateInvoice(id, data)
getQuotation(id)
createQuotation(data)
recordPayment(invoiceId, data)
downloadInvoice(id)
getPaymentStatus(invoiceId)
sendReminder(invoiceId)
```

### Inventory API (inventoryAPI)
```js
getProducts()
createProduct(data)
getStockLevels(branchId)
createPO(data)
createGRN(data)
transferStock(data)
getReorderAlerts()
trackTransfer(id)
getReturns()
processReturn(data)
```

### Branch API (branchAPI)
```js
getBranches()
createBranch(data)
updateBranch(id, data)
getBranchInventory(branchId)
getBranchStaff(branchId)
getBranchMetrics(branchId)
```

### HRMS API (hrmsAPI)
```js
getEmployees()
createEmployee(data)
updateEmployee(id, data)
markAttendance(data)
getLeaveRequests()
approveLeave(id)
rejectLeave(id)
getPayrollData()
```

### IAM API (iamAPI)
```js
getStaff()
createStaff(data)
updateStaff(id, data)
deleteStaff(id)
getRoles()
getPermissions()
assignRole(userId, roleId)
getAuditLogs(filters)
assignPermission(userId, permission)
```

---

## 🎯 Common Tasks

### Create a New Module
```javascript
// 1. Create page file
// src/pages/module-name/PageName.jsx

// 2. Add to modules.config.js
{
  id: "module-id",
  label: "Module Name",
  icon: Icon,
  path: "/module-path",
  sideNav: true,
  roles: [ROLES.ADMIN, ROLES.MANAGER],
  permissions: [PERMISSIONS.MODULE_VIEW],
  children: []
}

// 3. Import in routes.jsx and add to componentMap
import ModuleComponent from './pages/module-name/PageName';
// ...
const componentMap = {
  "/module-path": ModuleComponent,
};

// 4. Add API methods to moduleAPI.js
export const moduleAPI = {
  getItems: () => axiosClient.get('/api/v1/module'),
  // ...
};
```

### Add Permission Check
```javascript
// 1. Define in IAMContext.js
PERMISSIONS: {
  MODULE_ACTION: 'module.action',
}

// 2. In modules.config.js
permissions: [PERMISSIONS.MODULE_ACTION]

// 3. In component
<PermissionGate permission={PERMISSIONS.MODULE_ACTION}>
  <button>Action</button>
</PermissionGate>
```

### Display Role-Specific Content
```javascript
const { userRole } = useIAM();

if (userRole === ROLES.ADMIN) {
  return <AdminPanel />;
} else if (userRole === ROLES.MANAGER) {
  return <ManagerPanel />;
} else {
  return <AgentPanel />;
}

// Or use RoleGate
<RoleGate role={[ROLES.ADMIN, ROLES.MANAGER]}>
  <ReportingDashboard />
</RoleGate>
```

### Make API Call with Error Handling
```javascript
import { crmAPI } from '../api/moduleAPI';
import { useState } from 'react';

export default function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      const response = await crmAPI.createLead(data);
      console.log('Created:', response);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}
      <button onClick={() => handleCreate({ name: 'Test' })}>
        Create
      </button>
    </div>
  );
}
```

### Switch Theme
```javascript
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { isDark, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

### Switch Tenant
```javascript
import { useMultiTenant } from '../context/MultiTenantContext';

export default function TenantSwitcher() {
  const { tenants, switchTenant } = useMultiTenant();

  return (
    <select onChange={(e) => switchTenant(e.target.value)}>
      {tenants.map(t => (
        <option key={t.id} value={t.id}>{t.name}</option>
      ))}
    </select>
  );
}
```

---

## 🔑 Key Constants

### Roles
```javascript
ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager', 
  AGENT: 'agent',
  ACCOUNTANT: 'accountant',
  INVENTORY_STAFF: 'inventory_staff',
  HR_STAFF: 'hr_staff'
}
```

### Permissions (24 total)
```javascript
PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'dashboard.view',

  // CRM
  CRM_LEADS_VIEW: 'crm.leads.view',
  CRM_LEADS_CREATE: 'crm.leads.create',
  CRM_LEADS_EDIT: 'crm.leads.edit',
  CRM_LEADS_DELETE: 'crm.leads.delete',
  CRM_LEADS_ASSIGN: 'crm.leads.assign',
  CRM_PIPELINE_VIEW: 'crm.pipeline.view',
  CRM_ANALYTICS: 'crm.analytics',

  // Calls (similar structure)
  CALLS_VIEW, CALLS_INBOUND, CALLS_OUTBOUND, CALLS_RECORDING, CALLS_DELETE,

  // WhatsApp
  WHATSAPP_CHATS, WHATSAPP_CAMPAIGNS, WHATSAPP_FLOWS, WHATSAPP_BULK,

  // Invoicing
  INVOICING_CREATE, INVOICING_VIEW, INVOICING_EDIT, INVOICING_DELETE, INVOICING_PAY,

  // Inventory
  INVENTORY_PRODUCTS, INVENTORY_STOCK, INVENTORY_PO, INVENTORY_GRN,

  // Branches
  BRANCHES_VIEW, BRANCHES_CREATE, BRANCHES_EDIT,

  // HRMS
  HRMS_EMPLOYEES, HRMS_ATTENDANCE, HRMS_LEAVE,

  // IAM
  IAM_USERS, IAM_ROLES, IAM_PERMISSIONS, IAM_AUDIT
}
```

### Lead Stages
```
1. New
2. Contacted
3. Interested
4. Converted
5. Closed
```

### Call Status
```
1. Answered
2. Missed
3. Busy
4. Rejected
5. No Answer
```

### Invoice Status
```
1. Draft
2. Sent
3. Viewed
4. Paid
5. Overdue
6. Cancelled
```

---

## 🐛 Debugging Tips

### Check Current User
```javascript
import { useIAM } from '../context/IAMContext';
const { currentUser } = useIAM();
console.log(currentUser);
```

### Check Current Company
```javascript
import { useMultiTenant } from '../context/MultiTenantContext';
const { currentTenant } = useMultiTenant();
console.log(currentTenant);
```

### Check Permission
```javascript
import { useIAM } from '../context/IAMContext';
const { hasPermission } = useIAM();
console.log(hasPermission('crm.leads.view'));
```

### Check API Call
```javascript
// In moduleAPI.js, all calls go through axiosClient
// Check browser Network tab for actual requests
// Check X-Company-ID header being sent
```

---

## 📚 Documentation Files to Read

1. **BUILD_SUMMARY.md** - What was built
2. **IMPLEMENTATION_GUIDE.md** - How to use everything
3. **This file** - Quick reference for daily development

---

## 🚀 Most Common Operations

### Getting Data
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetch = async () => {
    setLoading(true);
    try {
      const result = await crmAPI.getLeads();
      setData(result);
    } finally {
      setLoading(false);
    }
  };
  fetch();
}, []);
```

### Creating Data
```javascript
const handleCreate = async (formData) => {
  try {
    const result = await crmAPI.createLead(formData);
    // Refresh list
    const updated = await crmAPI.getLeads();
    setLeads(updated);
  } catch (err) {
    console.error(err);
  }
};
```

### Updating Data
```javascript
const handleUpdate = async (id, updates) => {
  try {
    await crmAPI.updateLead(id, updates);
    // Refresh list
    const updated = await crmAPI.getLeads();
    setLeads(updated);
  } catch (err) {
    console.error(err);
  }
};
```

### Deleting Data
```javascript
const handleDelete = async (id) => {
  if (confirm('Are you sure?')) {
    try {
      await crmAPI.deleteLead(id);
      // Refresh list
      const updated = await crmAPI.getLeads();
      setLeads(updated);
    } catch (err) {
      console.error(err);
    }
  }
};
```

---

**Remember**: All API calls already include the X-Company-ID header automatically!

Happy coding! 🎉
