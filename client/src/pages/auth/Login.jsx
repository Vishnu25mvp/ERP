import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth";
import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const res = await authApi.login(form);
  //     localStorage.setItem("tk", res.data.token);
  //     navigate("/dashboard");
  //   } catch (err) {
  //     alert("Login Failed: " + err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // ✅ MOCK LOGIN (Dummy Data)
    const dummyResponse = {
      token: "mock_token_123456789",
      user: {
        id: "u001",
        name: "Vishnu Prakash",
        email: form.email,
        role: "admin",
      },
    };

    // ✅ Store Dummy Token + User
    localStorage.setItem("tk", dummyResponse.token);
    localStorage.setItem("user", JSON.stringify(dummyResponse.user));

    alert("Mock Login Success ✅");

    // ✅ Redirect to Dashboard
    navigate("/dashboard");
  } catch (err) {
    alert("Login Failed: " + err.message);
  } finally {
    setLoading(false);
  }
};


  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            E
          </div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Enterprise Dashboard
          </h1>
          <p style={{ color: "var(--text-secondary)" }} className="text-sm mt-2">
            Sign in to access your workspace
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 border"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
            boxShadow: isDark
              ? "0 10px 40px rgba(0,0,0,0.5)"
              : "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-secondary transition font-medium"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            Continue with Google
          </button>

          <div
            className="my-6 text-center text-secondary text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            OR
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Email Address
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-lg border"
                style={{ borderColor: "var(--border-color)" }}
              >
                <Mail size={18} style={{ color: "var(--text-secondary)" }} />
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="bg-transparent outline-none flex-1"
                  style={{ color: "var(--text-primary)" }}
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Password
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-lg border"
                style={{ borderColor: "var(--border-color)" }}
              >
                <Lock size={18} style={{ color: "var(--text-secondary)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-transparent outline-none flex-1"
                  style={{ color: "var(--text-primary)" }}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-secondary hover:text-primary transition"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded"
                  style={{
                    accentColor: "var(--accent-primary)",
                  }}
                />
                <span style={{ color: "var(--text-primary)" }}>
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium"
                style={{ color: "var(--accent-primary)" }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition hover:opacity-90"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Signup Link */}
          <p
            className="text-center text-sm mt-6"
            style={{ color: "var(--text-secondary)" }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold"
              style={{ color: "var(--accent-primary)" }}
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Footer Text */}
        <p
          className="text-center text-xs mt-6"
          style={{ color: "var(--text-secondary)" }}
        >
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
