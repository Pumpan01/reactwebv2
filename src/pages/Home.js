import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">⚽ ยินดีต้อนรับสู่ Football Shirt Store!</h1>
        <p className="text-gray-700 text-lg leading-relaxed text-center mb-8">
          ซื้อเสื้อฟุตบอลทีมโปรดของคุณ พร้อมส่วนลดพิเศษและสินค้าคุณภาพสูง
        </p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/search-shirts" className="bg-blue-500 text-white p-6 rounded-lg shadow hover:bg-blue-600 transition text-center">
            <h2 className="text-2xl font-semibold mb-2">ค้นหาเสื้อทีมโปรด</h2>
            <p className="text-lg">เลือกเสื้อจากทีมฟุตบอลที่คุณชื่นชอบ</p>
          </Link>
          <Link to="/cart" className="bg-green-500 text-white p-6 rounded-lg shadow hover:bg-green-600 transition text-center">
            <h2 className="text-2xl font-semibold mb-2">ตะกร้าสินค้า</h2>
            <p className="text-lg">ดูและจัดการรายการสินค้าที่คุณเลือกซื้อ</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
