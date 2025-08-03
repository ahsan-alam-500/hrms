"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function PayrollList() {
    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:8000/api/v1/payrolls", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setPayrolls(res.data))
            .catch(err => console.error("Error fetching payrolls:", err));
    }, []);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this payroll?")) return;

        axios.delete(`http://localhost:8000/api/v1/payrolls/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                // Remove deleted payroll from local state
                setPayrolls(prev => prev.filter(p => p.id !== id));
                alert("Payroll deleted successfully.");
            })
            .catch(err => {
                console.error(err);
                alert("Failed to delete payroll.");
            });
    };

    const handleEdit = (payroll) => {
        // Simple prompt example - edit bonus
        const newBonus = prompt("Enter new bonus amount:", payroll.bonus);
        if (newBonus === null) return; // Cancelled

        // Validate input (optional)
        const bonusNum = parseFloat(newBonus);
        if (isNaN(bonusNum)) {
            alert("Invalid bonus amount.");
            return;
        }

        // Prepare update payload
        const updatedPayroll = {
            ...payroll,
            bonus: bonusNum,
            net_salary: payroll.basic_salary + bonusNum - payroll.deductions,
        };

        axios.put(`http://localhost:8000/api/v1/payrolls/${payroll.id}`, updatedPayroll, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                // Update local state with new payroll data
                setPayrolls(prev =>
                    prev.map(p => (p.id === payroll.id ? res.data : p))
                );
                alert("Payroll updated successfully.");
            })
            .catch(err => {
                console.error(err);
                alert("Failed to update payroll.");
            });
    };

    return (
        <div className="py-6 container mx-auto">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-4">Payrolls</h2>
                <Link href="/payrolls/add" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
                    Add Payroll
                </Link>
            </div>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="text-gray-700 py-1">Employee</th>
                        <th className="text-gray-700 py-1">Month</th>
                        <th className="text-gray-700 py-1">Basic</th>
                        <th className="text-gray-700 py-1">Bonus</th>
                        <th className="text-gray-700 py-1">Deductions</th>
                        <th className="text-gray-700 py-1">Net</th>
                        <th className="text-gray-700 py-1">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payrolls.map((p) => (
                        <tr key={p.id} className="text-center">
                            <td className="text-white py-1">{p.employee?.name}</td>
                            <td className="text-white py-1">
                                {p.month ? format(parseISO(p.month), "MMM yyyy") : "—"}
                            </td>
                            <td className="text-white py-1">{p.basic_salary}</td>
                            <td className="text-white py-1">{p.bonus}</td>
                            <td className="text-white py-1">{p.deductions}</td>
                            <td className="text-white py-1">{p.net_salary}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(p)}
                                    className="text-blue-500"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="text-red-500 ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
