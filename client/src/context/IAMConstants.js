// IAM Constants - Separated for Fast Refresh compatibility

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  AGENT: 'agent',
  ACCOUNTANT: 'accountant',
  INVENTORY_STAFF: 'inventory_staff',
  HR_STAFF: 'hr_staff',
};

export const PERMISSIONS = {
  // CRM
  CRM_LEADS_VIEW: 'crm.leads.view',
  CRM_LEADS_CREATE: 'crm.leads.create',
  CRM_LEADS_EDIT: 'crm.leads.edit',
  CRM_LEADS_DELETE: 'crm.leads.delete',
  CRM_LEADS_ASSIGN: 'crm.leads.assign',
  CRM_PIPELINE_VIEW: 'crm.pipeline.view',

  // CALLS
  CALLS_VIEW: 'calls.view',
  CALLS_RECORD: 'calls.record',
  CALLS_PLAYBACK: 'calls.playback',
  CALLS_TRANSCRIPT: 'calls.transcript',

  // WHATSAPP
  WHATSAPP_VIEW: 'whatsapp.view',
  WHATSAPP_SEND: 'whatsapp.send',
  WHATSAPP_CAMPAIGNS: 'whatsapp.campaigns',

  // INVOICING
  INVOICING_VIEW: 'invoicing.view',
  INVOICING_CREATE: 'invoicing.create',
  INVOICING_EDIT: 'invoicing.edit',
  INVOICING_DELETE: 'invoicing.delete',

  // INVENTORY
  INVENTORY_VIEW: 'inventory.view',
  INVENTORY_EDIT: 'inventory.edit',
  INVENTORY_STOCK: 'inventory.stock',

  // IAM
  IAM_USERS_VIEW: 'iam.users.view',
  IAM_USERS_CREATE: 'iam.users.create',
  IAM_USERS_EDIT: 'iam.users.edit',
  IAM_USERS_DELETE: 'iam.users.delete',
  IAM_PERMISSIONS_MANAGE: 'iam.permissions.manage',

  // HRMS
  HRMS_EMPLOYEES_VIEW: 'hrms.employees.view',
  HRMS_ATTENDANCE: 'hrms.attendance',
  HRMS_LEAVE_MANAGE: 'hrms.leave.manage',

  // BRANCH
  BRANCH_VIEW: 'branch.view',
  BRANCH_EDIT: 'branch.edit',
};

export const ROLE_PERMISSIONS_MAP = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.MANAGER]: [
    PERMISSIONS.CRM_LEADS_VIEW,
    PERMISSIONS.CRM_LEADS_ASSIGN,
    PERMISSIONS.CRM_PIPELINE_VIEW,
    PERMISSIONS.CALLS_VIEW,
    PERMISSIONS.CALLS_PLAYBACK,
    PERMISSIONS.WHATSAPP_VIEW,
    PERMISSIONS.INVOICING_VIEW,
    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.HRMS_EMPLOYEES_VIEW,
    PERMISSIONS.BRANCH_VIEW,
  ],
  [ROLES.AGENT]: [
    PERMISSIONS.CRM_LEADS_VIEW,
    PERMISSIONS.CRM_LEADS_EDIT,
    PERMISSIONS.CALLS_VIEW,
    PERMISSIONS.CALLS_RECORD,
    PERMISSIONS.WHATSAPP_VIEW,
    PERMISSIONS.WHATSAPP_SEND,
  ],
  [ROLES.ACCOUNTANT]: [
    PERMISSIONS.INVOICING_VIEW,
    PERMISSIONS.INVOICING_CREATE,
    PERMISSIONS.INVOICING_EDIT,
  ],
  [ROLES.INVENTORY_STAFF]: [
    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.INVENTORY_EDIT,
    PERMISSIONS.INVENTORY_STOCK,
  ],
  [ROLES.HR_STAFF]: [
    PERMISSIONS.HRMS_EMPLOYEES_VIEW,
    PERMISSIONS.HRMS_ATTENDANCE,
    PERMISSIONS.HRMS_LEAVE_MANAGE,
  ],
};
