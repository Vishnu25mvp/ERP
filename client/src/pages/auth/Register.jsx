import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth";
import { User, Mail, Lock, Eye, EyeOff, Loader, CheckCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setLoading(true);
    try {
      await authApi.register(form);
      alert("Account Created Successfully!");
      navigate("/");
    } catch (err) {
      alert("Registration Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = form.password.length >= 8;

  return (
    <div
      className="min-h-screen flex justify-center items-center py-12"
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
            Create Account
          </h1>
          <p style={{ color: "var(--text-secondary)" }} className="text-sm mt-2">
            Join millions of professionals
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
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Full Name
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-lg border"
                style={{ borderColor: "var(--border-color)" }}
              >
                <User size={18} style={{ color: "var(--text-secondary)" }} />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="bg-transparent outline-none flex-1"
                  style={{ color: "var(--text-primary)" }}
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

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
              <div className="flex items-center gap-2 mt-2">
                <div
                  className={`h-1 flex-1 rounded-full ${
                    passwordStrength
                      ? "bg-accent-primary"
                      : "bg-border-color"
                  }`}
                  style={{
                    backgroundColor: passwordStrength
                      ? "var(--accent-primary)"
                      : "var(--border-color)",
                  }}
                />
                <span
                  className="text-xs font-medium"
                  style={{
                    color: passwordStrength
                      ? "var(--accent-primary)"
                      : "var(--text-secondary)",
                  }}
                >
                  {passwordStrength ? "Strong" : "Weak"}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Confirm Password
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-lg border"
                style={{ borderColor: "var(--border-color)" }}
              >
                <Lock size={18} style={{ color: "var(--text-secondary)" }} />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-transparent outline-none flex-1"
                  style={{ color: "var(--text-primary)" }}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-secondary hover:text-primary transition"
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-2 text-sm mt-4">
              <input
                type="checkbox"
                className="w-4 h-4 rounded mt-0.5"
                style={{
                  accentColor: "var(--accent-primary)",
                }}
                required
              />
              <span style={{ color: "var(--text-primary)" }}>
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium"
                  style={{ color: "var(--accent-primary)" }}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium"
                  style={{ color: "var(--accent-primary)" }}
                >
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition hover:opacity-90 mt-6"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p
            className="text-center text-sm mt-6"
            style={{ color: "var(--text-secondary)" }}
          >
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold"
              style={{ color: "var(--accent-primary)" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
