import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';

function Profile() {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // ฟังก์ชันดึงข้อมูลผู้ใช้เมื่อหน้าโหลด
    const fetchUserProfile = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:4000/account', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const { email, name, picture, number } = response.data;
            setUserName(name);
            setUserEmail(email);
            setProfilePicture(picture);
            setUserPhone(number);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            navigate('/login');
        }
    }, [navigate]); // ใส่ 'navigate' เป็น dependency

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]); // เพิ่ม 'fetchUserProfile' เป็น dependency

    if (isEditing) {
        return <EditProfile onProfileUpdate={() => { setIsEditing(false); fetchUserProfile(); }} />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>
                <div className="flex flex-col items-center">
                    <div className="relative mb-6">
                        {profilePicture ? (
                            <img
                                src={`http://localhost:4000${profilePicture}`}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover shadow-md"
                            />
                        ) : (
                            <div className="bg-gray-300 w-32 h-32 rounded-full flex items-center justify-center shadow-md">
                                <span className="text-gray-700">No Image</span>
                            </div>
                        )}
                    </div>
                    <div className="text-center text-gray-800 mb-6">
                        <p className="text-lg font-semibold">{userName}</p>
                        <p className="text-gray-600">{userEmail}</p>
                        <p className="text-gray-600">{userPhone || "No Phone Number"}</p>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-md"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
