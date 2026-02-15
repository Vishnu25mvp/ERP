import React, { useState } from "react";
import {
  Save,
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateBranch = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    code: "",
    manager: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    status: "active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBranch = () => {
    // 🔌 API Hook: POST /branches
    console.log("Branch Data:", form);
    navigate("/branches/list");
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg border hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create Branch
          </h1>
          <p className="text-gray-500 mt-1">
            Add a new company location
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border rounded-xl p-6 space-y-6">
        {/* Basic Info */}
        <Section title="Basic Information" icon={<Building2 size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Branch Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Branch Code"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="e.g. BLR-HQ"
              required
            />
          </div>
        </Section>

        {/* Manager & Contact */}
        <Section title="Manager & Contact" icon={<User size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Branch Manager"
              name="manager"
              value={form.manager}
              onChange={handleChange}
              placeholder="Select / Enter manager name"
            />
            <Input
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              icon={<Phone size={14} />}
            />
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
            />
          </div>
        </Section>

        {/* Address */}
        <Section title="Address" icon={<MapPin size={18} />}>
          <div className="grid grid-cols-1 gap-4">
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street address"
              className="border rounded-lg px-4 py-2 h-24"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
              <Input
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
              />
            </div>
          </div>
        </Section>

        {/* Status */}
        <Section title="Status">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full md:w-1/3"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </Section>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border rounded-lg font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={submitBranch}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            <Save size={16} />
            Save Branch
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBranch;

/* ---------------- Reusable Components ---------------- */

const Section = ({ title, icon, children }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 font-semibold text-gray-800">
      {icon}
      {title}
    </div>
    {children}
  </div>
);

const Input = ({ label, icon, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-3 text-gray-400">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`border rounded-lg px-4 py-2 w-full ${
          icon ? "pl-9" : ""
        }`}
      />
    </div>
  </div>
);
