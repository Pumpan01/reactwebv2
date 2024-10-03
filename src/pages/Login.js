import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ส่งคำขอล็อกอินไปที่ API
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });

      // เมื่อสำเร็จ ให้เรียก handleLogin และเก็บ token
      handleLogin(response.data.token);
      navigate('/home'); // นำผู้ใช้ไปที่หน้า Home

    } catch (error) {
      // แสดง error หากการล็อกอินไม่สำเร็จ
      setError(error.response?.data?.message || 'เกิดข้อผิดพลาดในการล็อกอิน');
    }
  };

  const navigateToRegister = () => {
    navigate('/register'); // นำผู้ใช้ไปที่หน้าสมัครสมาชิก
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">⚽ Football Fun Zone!</h2>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Username
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกอีเมลของคุณ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกรหัสผ่านของคุณ"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Not a member?{' '}
            <button
              onClick={navigateToRegister}
              className="text-blue-500 hover:underline"
            >
              Signup
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
