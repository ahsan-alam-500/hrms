"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Page() {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        employee_id: "",
        month: "",
        basic_salary: "",
        bonus: "",
        deductions: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/v1/employees", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setEmployees(res.data))
            .catch(() => setEmployees([]));
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const calculateNetSalary = () => {
        const basic = parseFloat(form.basic_salary) || 0;
        const bonus = parseFloat(form.bonus) || 0;
        const deductions = parseFloat(form.deductions) || 0;
        return (basic + bonus - deductions).toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!form.employee_id || !form.month || !form.basic_salary) {
            setMessage({ type: "error", text: "Please fill required fields." });
            setLoading(false);
            return;
        }

        const payload = {
            employee_id: form.employee_id,
            month: form.month,
            basic_salary: parseFloat(form.basic_salary),
            bonus: parseFloat(form.bonus) || 0,
            deductions: parseFloat(form.deductions) || 0,
            net_salary: parseFloat(calculateNetSalary()),
        };

        try {
            await axios.post("http://localhost:8000/api/v1/payrolls", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage({ type: "success", text: "Payroll added successfully." });
            setForm({
                employee_id: "",
                month: "",
                basic_salary: "",
                bonus: "",
                deductions: "",
            });
        } catch {
            setMessage({ type: "error", text: "Failed to add payroll." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-gray-900 rounded-md shadow-lg my-12 md:my-16 lg:my-24 font-sans text-gray-100">
            <div className="flex justify-between items-center">
            <h1 className="text-3xl mb-8 font-semibold border-b border-gray-700 pb-3">Add Payroll</h1>
            <Link href="/payrolls" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">Back to Payrolls</Link>
            </div>

            {message && (
                <div
                    className={`mb-6 px-4 py-3 rounded ${message.type === "error"
                            ? "bg-red-800 text-red-300 border border-red-600"
                            : "bg-green-800 text-green-300 border border-green-600"
                        }`}
                    role="alert"
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                    <label htmlFor="employee_id" className="mb-2 font-medium">
                        Employee <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="employee_id"
                        name="employee_id"
                        value={form.employee_id}
                        onChange={handleChange}
                        className="rounded border border-gray-700 bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="" className="bg-gray-900 text-gray-100">
                            Select employee
                        </option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id} className="bg-gray-900 text-gray-100">
                                {emp.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="month" className="mb-2 font-medium">
                        Month (YYYY-MM) <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="month"
                        type="month"
                        name="month"
                        value={form.month}
                        onChange={handleChange}
                        className="rounded border border-gray-700 bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="basic_salary" className="mb-2 font-medium">
                        Basic Salary <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="basic_salary"
                        type="number"
                        name="basic_salary"
                        value={form.basic_salary}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="rounded border border-gray-700 bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="bonus" className="mb-2 font-medium">
                        Bonus
                    </label>
                    <input
                        id="bonus"
                        type="number"
                        name="bonus"
                        value={form.bonus}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="rounded border border-gray-700 bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="deductions" className="mb-2 font-medium">
                        Deductions
                    </label>
                    <input
                        id="deductions"
                        type="number"
                        name="deductions"
                        value={form.deductions}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="rounded border border-gray-700 bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="net_salary" className="mb-2 font-medium">
                        Net Salary
                    </label>
                    <input
                        id="net_salary"
                        type="text"
                        value={calculateNetSalary()}
                        readOnly
                        className="rounded border border-gray-700 bg-gray-700 p-3 text-gray-300 cursor-not-allowed"
                    />
                </div>

                {/* Button spans all 3 columns */}
                <div className="md:col-span-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-blue-400 transition"
                    >
                        {loading ? "Saving..." : "Add Payroll"}
                    </button>
                </div>
            </form>
        </div>
    );
}
