import { api, axiosClient } from "./axiosClient";

// ✅ Complete Authentication API
export const authApi = {
  // ✅ Register New User
  register: (data) =>
    axiosClient.postAuth("/register", data),

  // ✅ Verify OTP
  verifyOTP: (data) =>
    axiosClient.postAuth("/verify-otp", data),

  // ✅ Login
  login: (email, password, tenantId) =>
    axiosClient.postAuth("/login", { email, password, tenantId }),

  // ✅ Refresh Token
  refreshToken: (refreshToken) =>
    axiosClient.postAuth("/refresh", { refreshToken }),

  // ✅ Get Current User Profile
  getCurrentUser: () =>
    axiosClient.getAuth("/me"),

  // ✅ Forgot Password
  forgotPassword: (email) =>
    axiosClient.postAuth("/forgot-password", { email }),

  // ✅ Reset Password
  resetPassword: (data) =>
    axiosClient.postAuth("/reset-password", data),

  // ✅ Google OAuth
  googleLogin: (googleToken) =>
    axiosClient.postAuth("/google", { token: googleToken }),

  // ✅ Logout (Client-side)
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tenantId");
    localStorage.removeItem("user");
  },

  // ✅ Change Password
  changePassword: (currentPassword, newPassword) =>
    axiosClient.postAuth("/change-password", {
      currentPassword,
      newPassword,
    }),

  // ✅ Get Available Tenants for User
  getTenants: () =>
    axiosClient.getAuth("/tenants"),

  // ✅ Create Staff (Admin only)
  createStaff: (data) =>
    axiosClient.postAuth("/create-staff", data),
};
