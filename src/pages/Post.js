import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-modal'; // นำเข้า react-modal

// ตั้งค่าให้ modal อยู่ใน root ของ DOM
Modal.setAppElement('#root');

function Post() {
  const [namePost, setNamePost] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // ใช้สำหรับจัดการ popup

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('namepost', namePost);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:4000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNamePost('');
      setDescription('');
      setImage(null);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('namepost', namePost);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:4000/posts/${currentPost.IDPOST}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire('Updated!', 'โพสต์ถูกอัปเดตเรียบร้อยแล้ว.', 'success');
      setIsEditing(false);
      setCurrentPost(null);
      setIsModalOpen(false); // ปิด modal
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      Swal.fire('Error!', 'ไม่สามารถอัปเดตโพสต์ได้.', 'error');
    }
  };

  const startEditing = (post) => {
    setCurrentPost(post);
    setNamePost(post.namepost);
    setDescription(post.description);
    setImage(null);
    setIsEditing(true);
    setIsModalOpen(true); // เปิด modal เมื่อเริ่มแก้ไข
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณต้องการลบโพสต์นี้?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบโพสต์!',
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchPosts();
        Swal.fire('Deleted!', 'โพสต์ถูกลบเรียบร้อยแล้ว.', 'success');
      } catch (error) {
        console.error('Error deleting post:', error.response || error.message);
        Swal.fire('Error!', 'ไม่สามารถลบโพสต์ได้.', 'error');
      }
    }
  };

  return (
    <div className="flex p-8 bg-gray-100">
      {/* ส่วนสร้างโพสต์ */}
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/4 mr-4">
        <h2 className="text-2xl font-bold text-center mb-4">{'สร้างโพสต์'}</h2>
        <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Post Title:</label>
            <input
              type="text"
              value={namePost}
              onChange={(e) => setNamePost(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              rows="2"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {isEditing ? 'บันทึกการแก้ไข' : 'Submit'}
          </button>
        </form>
      </div>

      {/* ส่วนโพสต์ทั้งหมด */}
      <div className="bg-white p-4 rounded-lg shadow-lg w-3/4">
        <h2 className="text-2xl font-bold">โพสต์ทั้งหมด</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.IDPOST} className="relative p-4 border border-gray-300 rounded">
                <img 
                  src={`http://localhost:4000${post.image}`} 
                  alt="Post" 
                  className="w-40 h-40 object-cover mb-2 mx-auto"
                />
                <h3 className="text-lg font-semibold text-center">{post.namepost}</h3>
                <p className="text-sm text-center">{post.description}</p>
                <button 
                  onClick={() => handleDelete(post.IDPOST)} 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl"
                >
                  &times;
                </button>
                <button 
                  onClick={() => startEditing(post)} 
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  แก้ไข
                </button>
              </div>
            ))
          ) : (
            <p>ยังไม่มีโพสต์</p>
          )}
        </div>
      </div>

      {/* Modal สำหรับแก้ไขโพสต์ */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Post"
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      >
        <h2 className="text-2xl font-bold mb-4">แก้ไขโพสต์</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700">Post Title:</label>
            <input
              type="text"
              value={namePost}
              onChange={(e) => setNamePost(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              rows="2"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            บันทึกการแก้ไข
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Post;
