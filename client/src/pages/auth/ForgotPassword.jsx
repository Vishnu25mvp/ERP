import { useState } from "react";
import { Link } from "react-router-dom";
import { authApi } from "../../api/auth";
import { Mail, ArrowLeft, Send, Loader } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { isDark } = useTheme();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authApi.forgotPassword({ email });
      setSubmitted(true);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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
            Reset Password
          </h1>
          <p style={{ color: "var(--text-secondary)" }} className="text-sm mt-2">
            We'll send you a link to reset your password
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
          {!submitted ? (
            <form onSubmit={handleReset} className="space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Enter the email address associated with your account
                </p>
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
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                <Mail size={32} style={{ color: "var(--accent-primary)" }} />
              </div>
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Check your email
              </h2>
              <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p style={{ color: "var(--text-secondary)" }} className="text-xs">
                If you don't see it in your inbox, check your spam folder.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="w-full py-2 rounded-lg font-medium mt-4 transition"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--accent-primary)",
                }}
              >
                Try another email
              </button>
            </div>
          )}

          {/* Back to Login */}
          <p
            className="text-center text-sm mt-6"
            style={{ color: "var(--text-secondary)" }}
          >
            <Link to="/" className="flex items-center justify-center gap-1 font-medium"
              style={{ color: "var(--accent-primary)" }}>
              <ArrowLeft size={16} />
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
