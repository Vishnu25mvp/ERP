import { axiosClient } from './axiosClient';

// ✅ CRM Lead APIs
export const crmAPI = {
  // Leads
  getLeads: (filters = {}) =>
    axiosClient.getCRM('/leads', { params: filters }),

  getLeadById: (leadId) =>
    axiosClient.getCRM(`/leads/${leadId}`),

  createLead: (data) =>
    axiosClient.postCRM('/leads', data),

  updateLead: (leadId, data) =>
    axiosClient.putCRM(`/leads/${leadId}`, data),

  deleteLead: (leadId) =>
    axiosClient.deleteCRM(`/leads/${leadId}`),

  assignLead: (leadId, agentId) =>
    axiosClient.postCRM(`/leads/${leadId}/assign`, { agentId }),

  // Pipeline
  getPipeline: () =>
    axiosClient.getCRM('/pipeline'),

  moveDealInPipeline: (dealId, stage) =>
    axiosClient.putCRM(`/deals/${dealId}/stage`, { stage }),

  // Notes
  getLeadNotes: (leadId) =>
    axiosClient.getCRM(`/leads/${leadId}/notes`),

  addLeadNote: (leadId, data) =>
    axiosClient.postCRM(`/leads/${leadId}/notes`, data),

  // Follow-ups
  scheduleFollowUp: (leadId, data) =>
    axiosClient.postCRM(`/leads/${leadId}/follow-up`, data),

  // Analytics
  getLeadAnalytics: () =>
    axiosClient.getCRM('/analytics'),

  getLeadScoring: () =>
    axiosClient.getCRM('/leads/scoring/batch'),
};

// ✅ Call Tracking APIs
export const callAPI = {
  // Call Logs
  getCallLogs: (filters = {}) =>
    axiosClient.getCall('/logs', { params: filters }),

  logInboundCall: (data) =>
    axiosClient.postCall('/inbound', data),

  logOutboundCall: (data) =>
    axiosClient.postCall('/outbound', data),

  // Recordings
  uploadRecording: (callId, formData) =>
    axiosClient.uploadFile(`/api/v1/calls/${callId}/recording`, formData),

  getRecording: (callId) =>
    axiosClient.downloadFile(`/api/v1/calls/${callId}/recording`),

  deleteRecording: (callId) =>
    axiosClient.deleteCall(`/${callId}/recording`),

  // Transcription
  transcribeCall: (callId) =>
    axiosClient.postCall(`/${callId}/transcribe`),

  // Analytics
  getCallAnalytics: () =>
    axiosClient.getCall('/analytics'),

  getAgentPerformance: () =>
    axiosClient.getCall('/performance'),
};

// ✅ WhatsApp APIs
export const whatsappAPI = {
  // Chats
  getChats: (filters = {}) =>
    axiosClient.getWhatsApp('/chats', { params: filters }),

  getChatMessages: (chatId) =>
    axiosClient.getWhatsApp(`/chats/${chatId}/messages`),

  sendMessage: (chatId, message) =>
    axiosClient.postWhatsApp('/send', { chatId, message }),

  // Campaigns
  getCampaigns: () =>
    axiosClient.getWhatsApp('/campaigns'),

  createCampaign: (data) =>
    axiosClient.postWhatsApp('/campaigns', data),

  sendBulkMessage: (data) =>
    axiosClient.postWhatsApp('/bulk-send', data),

  // Flows
  getFlows: () =>
    axiosClient.getWhatsApp('/flows'),

  createFlow: (data) =>
    axiosClient.postWhatsApp('/flows', data),

  updateFlow: (flowId, data) =>
    axiosClient.put(`/api/v1/whatsapp/flows/${flowId}`, data),

  // Analytics
  getCampaignAnalytics: (campaignId) =>
    axiosClient.getWhatsApp(`/campaigns/${campaignId}/analytics`),
};

// ✅ Invoicing APIs
export const invoicingAPI = {
  getInvoices: (filters = {}) =>
    axiosClient.getInvoicing('', { params: filters }),

  getInvoiceById: (invoiceId) =>
    axiosClient.getInvoicing(`/${invoiceId}`),

  createInvoice: (data) =>
    axiosClient.postInvoicing('', data),

  updateInvoice: (invoiceId, data) =>
    axiosClient.putInvoicing(`/${invoiceId}`, data),

  deleteInvoice: (invoiceId) =>
    axiosClient.deleteInvoicing(`/${invoiceId}`),

  // Payments
  recordPayment: (invoiceId, data) =>
    axiosClient.postInvoicing(`/${invoiceId}/pay`, data),

  getReceipts: (invoiceId) =>
    axiosClient.getInvoicing(`/${invoiceId}/receipts`),

  // Quotations & Proforma
  createQuotation: (data) =>
    axiosClient.postInvoicing('/quotations', data),

  createProforma: (data) =>
    axiosClient.postInvoicing('/proforma', data),

  // Export
  downloadInvoice: (invoiceId) =>
    axiosClient.downloadFile(`/api/v1/invoicing/${invoiceId}/download`),
};

// ✅ Inventory APIs
export const inventoryAPI = {
  // Products
  getProducts: (filters = {}) =>
    axiosClient.getInventory('/products', { params: filters }),

  getProductById: (productId) =>
    axiosClient.getInventory(`/products/${productId}`),

  createProduct: (data) =>
    axiosClient.postInventory('/products', data),

  updateProduct: (productId, data) =>
    axiosClient.putInventory(`/products/${productId}`, data),

  // Stock
  getStockLevels: () =>
    axiosClient.getInventory('/stock'),

  transferStock: (data) =>
    axiosClient.postInventory('/transfer', data),

  // Purchase Orders
  getPurchaseOrders: () =>
    axiosClient.getInventory('/po'),

  createPO: (data) =>
    axiosClient.postInventory('/po', data),

  // Goods Receipt
  getGoodsReceipts: () =>
    axiosClient.getInventory('/grn'),

  createGRN: (data) =>
    axiosClient.postInventory('/grn', data),

  // Reorder
  getReorderPoints: () =>
    axiosClient.getInventory('/reorders'),

  updateReorderPoint: (productId, quantity) =>
    axiosClient.putInventory(`/products/${productId}/reorder`, { quantity }),
};

// ✅ Branch APIs
export const branchAPI = {
  getBranches: () =>
    axiosClient.getBranch(''),

  getBranchById: (branchId) =>
    axiosClient.getBranch(`/${branchId}`),

  createBranch: (data) =>
    axiosClient.postBranch('', data),

  updateBranch: (branchId, data) =>
    axiosClient.put(`/api/v1/branches/${branchId}`, data),

  deleteBranch: (branchId) =>
    axiosClient.delete(`/api/v1/branches/${branchId}`),

  // Branch specific data
  getBranchInventory: (branchId) =>
    axiosClient.getBranch(`/${branchId}/inventory`),

  getBranchStaff: (branchId) =>
    axiosClient.getBranch(`/${branchId}/staff`),

  getBranchReports: (branchId) =>
    axiosClient.getBranch(`/${branchId}/reports`),
};

// ✅ HRMS APIs
export const hrmsAPI = {
  // Employees
  getEmployees: (filters = {}) =>
    axiosClient.getHRMS('/employees', { params: filters }),

  getEmployeeById: (employeeId) =>
    axiosClient.getHRMS(`/employees/${employeeId}`),

  createEmployee: (data) =>
    axiosClient.postHRMS('/employees', data),

  updateEmployee: (employeeId, data) =>
    axiosClient.putHRMS(`/employees/${employeeId}`, data),

  // Attendance
  getAttendance: (filters = {}) =>
    axiosClient.getHRMS('/attendance', { params: filters }),

  markAttendance: (data) =>
    axiosClient.postHRMS('/attendance', data),

  // Leave
  getLeaveRequests: () =>
    axiosClient.getHRMS('/leave-requests'),

  createLeaveRequest: (data) =>
    axiosClient.postHRMS('/leave-requests', data),

  approveLeaveRequest: (requestId) =>
    axiosClient.putHRMS(`/leave-requests/${requestId}/approve`),

  rejectLeaveRequest: (requestId) =>
    axiosClient.putHRMS(`/leave-requests/${requestId}/reject`),

  // Payroll
  getPayrollData: (employeeId) =>
    axiosClient.getHRMS(`/payroll/${employeeId}`),
};

// ✅ IAM APIs
export const iamAPI = {
  // Users/Staff
  getStaffMembers: () =>
    axiosClient.getIAM('/staff'),

  createStaffMember: (data) =>
    axiosClient.postIAM('/staff', data),

  updateStaffMember: (staffId, data) =>
    axiosClient.putIAM(`/staff/${staffId}`, data),

  deleteStaffMember: (staffId) =>
    axiosClient.deleteIAM(`/staff/${staffId}`),

  // Roles
  getRoles: () =>
    axiosClient.getIAM('/roles'),

  createRole: (data) =>
    axiosClient.postIAM('/roles', data),

  // Permissions
  getPermissions: () =>
    axiosClient.getIAM('/permissions'),

  assignPermissions: (roleId, permissions) =>
    axiosClient.postIAM(`/roles/${roleId}/permissions`, { permissions }),

  // Audit
  getAuditLogs: (filters = {}) =>
    axiosClient.getIAM('/audit-logs', { params: filters }),

  // Company
  getCompanySettings: () =>
    axiosClient.getIAM('/company'),

  updateCompanySettings: (data) =>
    axiosClient.putIAM('/company', data),
};

export default {
  crmAPI,
  callAPI,
  whatsappAPI,
  invoicingAPI,
  inventoryAPI,
  branchAPI,
  hrmsAPI,
  iamAPI,
};
