import React, { useState } from "react";
import { Building2, Save, ShieldCheck, ToggleLeft } from "lucide-react";

export default function CompanySettings() {
  // ✅ Company Info State
  const [company, setCompany] = useState({
    name: "GreenTech Solutions Pvt Ltd",
    email: "support@greentech.com",
    phone: "+91 98765 43210",
    address: "Bangalore, India",
  });

  // ✅ Security Settings State
  const [security, setSecurity] = useState({
    twoFactor: true,
    strongPassword: true,
    sessionTimeout: "30",
  });

  // ✅ Module Toggles State
  const [modules, setModules] = useState({
    CRM: true,
    Inventory: true,
    HRMS: false,
    Analytics: true,
    WhatsAppAutomation: false,
  });

  // ✅ Handle Save ()
  const handleSave = () => {
    console.log("Company Settings Saved:", {
      company,
      security,
      modules,
    });

    alert("Company Settings Saved Successfully ✅ ()");
  };

  return (
    <div className="space-y-8">
      {/* ✅ Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Company Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Manage company profile, security and module access
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow font-semibold transition"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>

      {/* ✅ Company Profile */}
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="text-green-600" size={20} />
          <h2 className="text-xl font-bold text-gray-800">
            Company Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Company Name"
            value={company.name}
            onChange={(v) => setCompany({ ...company, name: v })}
          />
          <InputField
            label="Company Email"
            value={company.email}
            onChange={(v) => setCompany({ ...company, email: v })}
          />
          <InputField
            label="Phone Number"
            value={company.phone}
            onChange={(v) => setCompany({ ...company, phone: v })}
          />
          <InputField
            label="Company Address"
            value={company.address}
            onChange={(v) => setCompany({ ...company, address: v })}
          />
        </div>
      </div>

      {/* ✅ Security Settings */}
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="text-green-600" size={20} />
          <h2 className="text-xl font-bold text-gray-800">
            Security Settings
          </h2>
        </div>

        <ToggleRow
          label="Enable Two Factor Authentication"
          value={security.twoFactor}
          onChange={() =>
            setSecurity({ ...security, twoFactor: !security.twoFactor })
          }
        />

        <ToggleRow
          label="Require Strong Password Policy"
          value={security.strongPassword}
          onChange={() =>
            setSecurity({
              ...security,
              strongPassword: !security.strongPassword,
            })
          }
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Session Timeout (Minutes)
          </label>
          <select
            value={security.sessionTimeout}
            onChange={(e) =>
              setSecurity({ ...security, sessionTimeout: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300 outline-none"
          >
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="60">1 Hour</option>
            <option value="120">2 Hours</option>
          </select>
        </div>
      </div>

      {/* ✅ Module Access */}
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-2 mb-4">
          <ToggleLeft className="text-green-600" size={20} />
          <h2 className="text-xl font-bold text-gray-800">
            Module Access Control
          </h2>
        </div>

        {Object.keys(modules).map((mod) => (
          <ToggleRow
            key={mod}
            label={mod.replace(/([A-Z])/g, " $1")}
            value={modules[mod]}
            onChange={() =>
              setModules({ ...modules, [mod]: !modules[mod] })
            }
          />
        ))}
      </div>

      {/* ✅ Preview */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-800 mb-2">
          Current Settings Preview
        </h3>
        <pre className="text-sm text-gray-700">
          {JSON.stringify({ company, security, modules }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

/* ✅ Reusable Components */

const InputField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300 outline-none"
    />
  </div>
);

const ToggleRow = ({ label, value, onChange }) => (
  <div className="flex justify-between items-center border rounded-lg px-4 py-3 hover:bg-green-50 transition">
    <span className="text-gray-700 font-medium">{label}</span>

    <button
      onClick={onChange}
      className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
        value ? "bg-green-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
          value ? "translate-x-7" : ""
        }`}
      />
    </button>
  </div>
);
