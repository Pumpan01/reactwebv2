import React, { useState, useEffect } from 'react';

function UsersTable() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);

    const listUser = user.map((u) => (
        <tr key={u.id}>
            <td className="px-5 py-5 text-sm">{u.id}</td>
            <td className="px-5 py-5 text-sm">{u.name}</td> {/* ชื่อผู้ใช้ */}
            <td className="px-5 py-5 text-sm">{u.email}</td> {/* อีเมล */}
            <td className="px-5 py-5 text-sm">{u.username}</td> {/* ชื่อผู้ใช้ */}
            <td className="px-5 py-5 text-sm">{u.address.street}</td> {/* ถนน */}
            <td className="px-5 py-5 text-sm">{u.address.city}</td> {/* เมือง */}
            <td className="px-5 py-5 text-sm">{u.address.zipcode}</td> {/* รหัสไปรษณีย์ */}
        </tr>
    ));

    return (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th className="px-5 py-3 bg-gray-200 text-gray-600 text-left">ไอดี</th>
                    <th className="px-5 py-3 bg-gray-200 text-gray-600 text-left">ชื่อ</th>
                    <th className="px-5 py-3 bg-gray-200 text-gray-600 text-left">อีเมล</th>
                    <th className="px-5 py-3 bg-gray-200 text-gray-600 text-left">ชื่อผู้ใช้</th>
                    <th className="px-5 py-3 bg-gray-200 text-gray-600 text-left">ถนน</th>
                    <th className="px-5 py-3 bg-gray-200 text-gray-600 text-left">เมือง</th>
                    <th className="px-5 py-3 bg-gray-200 text-gray-600 text-left">รหัสไปรษณีย์</th>
                </tr>
            </thead>
            <tbody>{listUser}</tbody>
        </table>
    );
}

export default UsersTable;
