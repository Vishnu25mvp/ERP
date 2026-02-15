import axios from "axios";

// ✅ Multi-Tenant & Multi-Service API Client
export const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api/v1/", // API Gateway
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor - Add JWT Token & Company ID
api.interceptors.request.use(
  (config) => {
    // Get JWT token from localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Get Company ID (X-Company-ID) from localStorage
    const tenantId = localStorage.getItem("tenantId");
    if (tenantId) {
      config.headers["X-Company-ID"] = tenantId;
    }

    // Add timestamp for cache busting
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: new Date().getTime(),
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor - Handle Errors & Token Refresh
api.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response.data || response;
  },
  (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token Expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        return axios
          .post("http://127.0.0.1:3000/api/v1/auth/refresh", {
            refreshToken,
          })
          .then((response) => {
            const { accessToken, refreshToken: newRefreshToken } = response.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          })
          .catch(() => {
            // Refresh failed - redirect to login
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
            return Promise.reject(error);
          });
      } else {
        // No refresh token - redirect to login
        window.location.href = "/login";
      }
    }

    // Handle 403 Forbidden (Permission Denied)
    if (error.response?.status === 403) {
      console.warn("Access Forbidden:", error.response.data?.message);
      return Promise.reject(new Error("You don't have permission to access this resource"));
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.warn("Not Found:", error.response.data?.message);
      return Promise.reject(new Error("Resource not found"));
    }

    // Handle 500+ Server Error
    if (error.response?.status >= 500) {
      console.error("Server Error:", error.response.data?.message);
      return Promise.reject(new Error("Server error. Please try again later."));
    }

    return Promise.reject(error);
  }
);

// ✅ Export typed methods for different services
export const axiosClient = {
  // Generic request
  request: (config) => api(config),

  // Get Methods
  get: (url, config) => api.get(url, config),
  getAuth: (url, config) =>
    api.get(`/auth${url}`, config),
  getCRM: (url, config) =>
    api.get(`/crm${url}`, config),
  getCall: (url, config) =>
    api.get(`/calls${url}`, config),
  getWhatsApp: (url, config) =>
    api.get(`/whatsapp${url}`, config),
  getInvoicing: (url, config) =>
    api.get(`/invoicing${url}`, config),
  getInventory: (url, config) =>
    api.get(`/inventory${url}`, config),
  getBranch: (url, config) =>
    api.get(`/branches${url}`, config),
  getHRMS: (url, config) =>
    api.get(`/hrms${url}`, config),
  getIAM: (url, config) =>
    api.get(`/iam${url}`, config),

  // Post Methods
  post: (url, data, config) => api.post(url, data, config),
  postAuth: (url, data, config) =>
    api.post(`/auth${url}`, data, config),
  postCRM: (url, data, config) =>
    api.post(`/crm${url}`, data, config),
  postCall: (url, data, config) =>
    api.post(`/calls${url}`, data, config),
  postWhatsApp: (url, data, config) =>
    api.post(`/whatsapp${url}`, data, config),
  postInvoicing: (url, data, config) =>
    api.post(`/invoicing${url}`, data, config),
  postInventory: (url, data, config) =>
    api.post(`/inventory${url}`, data, config),
  postBranch: (url, data, config) =>
    api.post(`/branches${url}`, data, config),
  postHRMS: (url, data, config) =>
    api.post(`/hrms${url}`, data, config),
  postIAM: (url, data, config) =>
    api.post(`/iam${url}`, data, config),

  // Put Methods
  put: (url, data, config) => api.put(url, data, config),
  putCRM: (url, data, config) =>
    api.put(`/crm${url}`, data, config),
  putInvoicing: (url, data, config) =>
    api.put(`/invoicing${url}`, data, config),
  putInventory: (url, data, config) =>
    api.put(`/inventory${url}`, data, config),
  putHRMS: (url, data, config) =>
    api.put(`/hrms${url}`, data, config),

  // Delete Methods
  delete: (url, config) => api.delete(url, config),
  deleteCRM: (url, config) =>
    api.delete(`/crm${url}`, config),
  deleteCall: (url, config) =>
    api.delete(`/calls${url}`, config),
  deleteInvoicing: (url, config) =>
    api.delete(`/invoicing${url}`, config),
  deleteInventory: (url, config) =>
    api.delete(`/inventory${url}`, config),
  deleteIAM: (url, config) =>
    api.delete(`/iam${url}`, config),

  // File Upload
  uploadFile: (url, formData, config) =>
    api.post(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    }),

  // Download File
  downloadFile: (url, config) =>
    api.get(url, {
      ...config,
      responseType: "blob",
    }),
};

export default api;
