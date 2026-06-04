import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaTrash, FaCheckCircle, FaUsers, FaCalendarDay, FaClipboardList, FaShoppingBag, FaEdit, FaPlus } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import axios from '../api/axios';
import useReservationStore from '../store/reservationStore';
import { io } from 'socket.io-client';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('reservations');
  
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', category: '', image: null
  });
  const [editId, setEditId] = useState(null);

  const [cancelModal, setCancelModal] = useState({ show: false, id: null, reason: '' });

  const { reservations, isLoading, fetchReservations, deleteReservation } = useReservationStore();

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const { data } = await axios.get('/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/orders/${orderId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      toast.success(`Order marked as ${newStatus}`);
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleReservationStatusChange = async (id, newStatus) => {
    if (newStatus === 'cancelled') {
      setCancelModal({ show: true, id, reason: '' });
    } else {
      updateReservationStatus(id, newStatus);
    }
  };

  const updateReservationStatus = async (id, status, reason = '') => {
    try {
      await axios.put(`/reservations/${id}/status`, { status, reason }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      toast.success(`Reservation marked as ${status}`);
      fetchReservations();
      if (status === 'cancelled') {
        setCancelModal({ show: false, id: null, reason: '' });
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const fetchMenu = async () => {
    setMenuLoading(true);
    try {
      const { data } = await axios.get('/menu');
      setMenuItems(data);
    } catch (err) {
      console.error('Failed to load menu', err);
    } finally {
      setMenuLoading(false);
    }
  };

  useEffect(() => {
    let socket;

    if (localStorage.getItem('adminToken')) {
      setIsAuthenticated(true);
      fetchReservations();
      fetchOrders();
      fetchMenu();

      // Initialize Socket.IO connection - explicit production fallback
      const envUrl = import.meta.env.VITE_API_URL;
      const socketUrl = envUrl ? envUrl.replace(/\/api\/?$/, '') : 'https://hotel-noir-backend-bvam.onrender.com';
      
      console.log('🔗 Attempting Socket connection to:', socketUrl);
      
      socket = io(socketUrl, {
        transports: ['websocket', 'polling'], // ensure websockets are used
        withCredentials: true
      });

      socket.on('connect', () => {
        console.log('✅ Socket connected! ID:', socket.id);
        toast.success('Live connection established 🟢', { id: 'socket-status', duration: 3000 });
        socket.emit('joinAdmin');
      });

      socket.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error);
        toast.error(`Connection error: ${error.message}`, { id: 'socket-error' });
      });

      socket.on('disconnect', (reason) => {
        console.warn('⚠️ Socket disconnected:', reason);
      });

      socket.on('newOrder', (data) => {
        toast.success(data.message, { duration: 5000, icon: '🍽️' });
        fetchOrders();
      });

      socket.on('newReservation', (data) => {
        toast.success(data.message, { duration: 5000, icon: '📅' });
        fetchReservations();
      });

      socket.on('orderStatusUpdate', (data) => {
        // Only show toast if it's not the admin making the change in this browser session
        // (toast is already shown in updateOrderStatus, but good for multiple admins)
        fetchOrders();
      });

      socket.on('newContact', (data) => {
        toast.success(data.message, { duration: 5000, icon: '✉️' });
      });
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, [fetchReservations]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const { data } = await axios.post('/admin/login', { password });
      localStorage.setItem('adminToken', data.token);
      setIsAuthenticated(true);
      fetchReservations();
      fetchOrders();
      fetchMenu();
      toast.success('Welcome, Admin');
    } catch (error) {
      toast.error('Invalid admin credentials');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      const success = await deleteReservation(id);
      if (success) toast.success('Reservation deleted');
      else toast.error('Failed to delete reservation');
    }
  };

  const handleDeleteMenu = async (id) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      try {
        await axios.delete(`/menu/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        toast.success('Dish deleted');
        fetchMenu();
      } catch (err) {
        toast.error('Failed to delete dish');
      }
    }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (isEditing) {
        await axios.put(`/menu/${editId}`, data, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Dish updated');
      } else {
        await axios.post('/menu', data, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Dish added');
      }
      setShowMenuModal(false);
      fetchMenu();
    } catch (err) {
      console.error('Save dish error:', err.response?.data || err);
      toast.error(err.response?.data?.message || 'Failed to save dish');
    }
  };

  const openMenuModal = (item = null) => {
    if (item) {
      setIsEditing(true);
      setEditId(item._id);
      setFormData({
        title: item.title, description: item.description, price: item.price, category: item.category, image: null, currentImage: item.image
      });
    } else {
      setIsEditing(false);
      setEditId(null);
      setFormData({ title: '', description: '', price: '', category: '', image: null, currentImage: null });
    }
    setShowMenuModal(true);
  };

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-primary px-4">
          <div className="bg-card p-8 rounded-lg border border-border-gold shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-heading text-center mb-6 text-accent-gold">Admin Portal</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-text-muted mb-2 font-bold">Admin Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                  className="w-full bg-secondary border border-border-gold rounded px-4 py-3 text-text-primary focus:outline-none focus:border-accent-gold"
                />
              </div>
              <button type="submit" disabled={authLoading} className="w-full btn-gold">
                {authLoading ? 'Verifying...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </PageTransition>
    );
  }

  const totalReservations = reservations.length;
  const totalGuests = reservations.reduce((acc, curr) => acc + curr.guests, 0);
  const today = new Date().toISOString().split('T')[0];
  const todayReservations = reservations.filter(r => r.date.startsWith(today)).length;
  
  const filteredReservations = reservations.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredMenu = menuItems.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="pt-8 pb-16 min-h-screen bg-primary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-heading">Admin Dashboard</h1>
            <button onClick={handleLogout} className="btn-outline px-4 py-2">Logout</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-card p-6 rounded-lg border border-border-gold flex items-center shadow-lg">
              <div className="p-4 bg-primary rounded-full text-accent-gold text-2xl mr-4"><FaClipboardList /></div>
              <div><p className="text-text-muted text-sm uppercase">Total Bookings</p><p className="text-3xl font-bold">{totalReservations}</p></div>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border-gold flex items-center shadow-lg">
              <div className="p-4 bg-primary rounded-full text-accent-gold text-2xl mr-4"><FaUsers /></div>
              <div><p className="text-text-muted text-sm uppercase">Total Guests</p><p className="text-3xl font-bold">{totalGuests}</p></div>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border-gold flex items-center shadow-lg">
              <div className="p-4 bg-primary rounded-full text-accent-gold text-2xl mr-4"><FaCalendarDay /></div>
              <div><p className="text-text-muted text-sm uppercase">Today's Bookings</p><p className="text-3xl font-bold">{todayReservations}</p></div>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border-gold flex items-center shadow-lg">
              <div className="p-4 bg-primary rounded-full text-accent-gold text-2xl mr-4"><FaCheckCircle /></div>
              <div><p className="text-text-muted text-sm uppercase">System Status</p><p className="text-xl font-bold text-green-500">Online</p></div>
            </div>
          </div>

          <div className="flex overflow-x-auto w-full gap-2 md:gap-4 mb-8 pb-2 no-scrollbar">
            <button 
              onClick={() => setActiveTab('reservations')}
              className={`px-6 py-3 rounded-full whitespace-nowrap font-bold transition-all duration-300 ${activeTab === 'reservations' ? 'bg-accent-gold text-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-card text-text-muted border border-border-gold hover:text-white hover:border-accent-gold'}`}
            >
              Table Reservations
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-full whitespace-nowrap font-bold transition-all duration-300 ${activeTab === 'orders' ? 'bg-accent-gold text-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-card text-text-muted border border-border-gold hover:text-white hover:border-accent-gold'}`}
            >
              Food Orders
            </button>
            <button 
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-3 rounded-full whitespace-nowrap font-bold transition-all duration-300 ${activeTab === 'menu' ? 'bg-accent-gold text-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-card text-text-muted border border-border-gold hover:text-white hover:border-accent-gold'}`}
            >
              Menu Management
            </button>
          </div>

          <div className="bg-card rounded-lg border border-border-gold overflow-hidden shadow-xl relative">
            <div className="p-6 border-b border-border-gold flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="text-2xl font-heading">
                {activeTab === 'reservations' ? 'Recent Reservations' : activeTab === 'orders' ? 'Recent Food Orders' : 'Menu Items'}
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-secondary border border-border-gold rounded-full px-6 py-2 text-text-primary focus:outline-none focus:border-accent-gold flex-grow md:w-64"
                />
                {activeTab === 'menu' && (
                  <button onClick={() => openMenuModal()} className="btn-gold flex items-center gap-2 whitespace-nowrap">
                    <FaPlus /> Add Dish
                  </button>
                )}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {activeTab === 'reservations' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary text-text-muted text-sm uppercase">
                    <th className="p-4 font-bold">Name</th>
                    <th className="p-4 font-bold">Contact</th>
                    <th className="p-4 font-bold">Date & Time</th>
                    <th className="p-4 font-bold">Guests</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan="6" className="text-center p-8 text-text-muted">Loading reservations...</td></tr>
                  ) : filteredReservations.length === 0 ? (
                    <tr><td colSpan="6" className="text-center p-8 text-text-muted">No reservations found.</td></tr>
                  ) : (
                    filteredReservations.map(res => (
                      <tr key={res._id} className="border-b border-border-gold/30 hover:bg-secondary/50 transition-colors">
                        <td className="p-4 font-bold">{res.name}</td>
                        <td className="p-4">
                          <div className="text-sm">{res.email}</div>
                          <div className="text-xs text-text-muted">{res.phone}</div>
                        </td>
                        <td className="p-4">
                          <div>{new Date(res.date).toLocaleDateString()}</div>
                          <div className="text-accent-gold">{res.time}</div>
                        </td>
                        <td className="p-4 text-center">{res.guests}</td>
                        <td className="p-4">
                          <select 
                            value={res.status} 
                            onChange={(e) => handleReservationStatusChange(res._id, e.target.value)}
                            className={`px-2 py-1 rounded text-xs font-bold uppercase border focus:outline-none cursor-pointer ${
                              res.status === 'completed' 
                                ? 'bg-green-500/20 text-green-500 border-green-500/30' 
                                : res.status === 'cancelled'
                                ? 'bg-red-500/20 text-red-500 border-red-500/30'
                                : res.status === 'seated'
                                ? 'bg-blue-500/20 text-blue-500 border-blue-500/30'
                                : 'bg-accent-gold/20 text-accent-gold border-accent-gold/30'
                            }`}
                          >
                            <option value="upcoming" className="bg-secondary text-text-primary">UPCOMING</option>
                            <option value="seated" className="bg-secondary text-text-primary">SEATED</option>
                            <option value="completed" className="bg-secondary text-text-primary">COMPLETED</option>
                            <option value="cancelled" className="bg-secondary text-text-primary">CANCELLED</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center">
                            <button onClick={() => handleDelete(res._id)} className="w-8 h-8 rounded bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              )}
              
              {activeTab === 'orders' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary text-text-muted text-sm uppercase">
                    <th className="p-4 font-bold">Customer</th>
                    <th className="p-4 font-bold">Contact / Table</th>
                    <th className="p-4 font-bold">Items</th>
                    <th className="p-4 font-bold">Total</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersLoading ? (
                    <tr><td colSpan="5" className="text-center p-8 text-text-muted">Loading orders...</td></tr>
                  ) : orders.filter(o => o.customerName.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                    <tr><td colSpan="5" className="text-center p-8 text-text-muted">No orders found.</td></tr>
                  ) : (
                    orders.filter(o => o.customerName.toLowerCase().includes(searchTerm.toLowerCase())).map(order => (
                      <tr key={order._id} className="border-b border-border-gold/30 hover:bg-secondary/50 transition-colors">
                        <td className="p-4 font-bold">{order.customerName}</td>
                        <td className="p-4">
                          <div className="text-sm">{order.email}</div>
                          <div className="text-xs text-text-muted">{order.phone}</div>
                          <div className="text-accent-gold text-xs mt-1">Table: {order.tableNumber}</div>
                        </td>
                        <td className="p-4">
                          <ul className="text-xs text-text-muted list-disc list-inside">
                            {order.items.map((i, idx) => (
                              <li key={idx}>{i.quantity}x {i.title}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-4 font-bold text-accent-gold">₹{(order.totalAmount).toFixed(2)}</td>
                        <td className="p-4">
                          <select 
                            value={order.status} 
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className={`px-2 py-1 rounded text-xs font-bold uppercase border focus:outline-none cursor-pointer ${
                              order.status === 'completed' 
                                ? 'bg-green-500/20 text-green-500 border-green-500/30' 
                                : order.status === 'preparing'
                                ? 'bg-blue-500/20 text-blue-500 border-blue-500/30'
                                : 'bg-accent-gold/20 text-accent-gold border-accent-gold/30'
                            }`}
                          >
                            <option value="pending" className="bg-secondary text-text-primary">PENDING</option>
                            <option value="preparing" className="bg-secondary text-text-primary">PREPARING</option>
                            <option value="completed" className="bg-secondary text-text-primary">COMPLETED</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              )}

              {activeTab === 'menu' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary text-text-muted text-sm uppercase">
                    <th className="p-4 font-bold w-16">Image</th>
                    <th className="p-4 font-bold">Dish Name</th>
                    <th className="p-4 font-bold">Category</th>
                    <th className="p-4 font-bold">Price</th>
                    <th className="p-4 font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuLoading ? (
                    <tr><td colSpan="5" className="text-center p-8 text-text-muted">Loading menu...</td></tr>
                  ) : filteredMenu.length === 0 ? (
                    <tr><td colSpan="5" className="text-center p-8 text-text-muted">No dishes found.</td></tr>
                  ) : (
                    filteredMenu.map(dish => (
                      <tr key={dish._id} className="border-b border-border-gold/30 hover:bg-secondary/50 transition-colors">
                        <td className="p-4">
                          <img src={dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} alt={dish.title} className="w-12 h-12 rounded object-cover border border-border-gold" />
                        </td>
                        <td className="p-4 font-bold">{dish.title}</td>
                        <td className="p-4"><span className="px-2 py-1 bg-secondary rounded text-xs">{dish.category}</span></td>
                        <td className="p-4 font-bold text-accent-gold">₹{dish.price.toFixed(2)}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => openMenuModal(dish)} className="w-8 h-8 rounded bg-accent-gold/10 text-accent-gold flex items-center justify-center hover:bg-accent-gold hover:text-primary transition-colors" title="Edit">
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDeleteMenu(dish._id)} className="w-8 h-8 rounded bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              )}
            </div>
          </div>

          {/* Menu Modal */}
          {showMenuModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-card border border-border-gold p-6 rounded-lg w-full max-w-lg shadow-2xl">
                <h3 className="text-2xl font-heading text-accent-gold mb-6">{isEditing ? 'Edit Dish' : 'Add New Dish'}</h3>
                <form onSubmit={handleMenuSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-1">Dish Name</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-secondary border border-border-gold rounded p-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1">Description</label>
                    <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-secondary border border-border-gold rounded p-2 text-white h-20"></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-text-muted mb-1">Price (₹)</label>
                      <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-secondary border border-border-gold rounded p-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-text-muted mb-1">Category</label>
                      <input type="text" placeholder="e.g. Breakfast, Specials" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-secondary border border-border-gold rounded p-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Image {isEditing ? '(Upload to change)' : '(Upload)'}</label>
                    {isEditing && formData.currentImage && (
                      <div className="mb-3">
                        <img src={formData.currentImage} alt="Current Dish" className="w-24 h-24 object-cover rounded border border-border-gold shadow-md" />
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="w-full bg-secondary border border-border-gold rounded p-2 text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accent-gold file:text-primary hover:file:bg-hover-gold cursor-pointer" />
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={() => setShowMenuModal(false)} className="px-4 py-2 border border-text-muted rounded text-text-muted hover:text-white">Cancel</button>
                    <button type="submit" className="btn-gold">{isEditing ? 'Save Changes' : 'Add Dish'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Cancel Reason Modal */}
          {cancelModal.show && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-card border border-border-gold p-6 rounded-lg w-full max-w-md shadow-2xl">
                <h3 className="text-2xl font-heading text-red-500 mb-4">Cancel Reservation</h3>
                <p className="text-sm text-text-muted mb-4">Please provide a reason for cancellation. This will be sent to the customer.</p>
                <textarea 
                  value={cancelModal.reason} 
                  onChange={(e) => setCancelModal({...cancelModal, reason: e.target.value})} 
                  placeholder="e.g. Fully booked, Table unavailable..."
                  className="w-full bg-secondary border border-border-gold rounded p-3 text-white h-24 mb-6 focus:outline-none focus:border-accent-gold"
                ></textarea>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setCancelModal({show: false, id: null, reason: ''})} className="px-4 py-2 border border-text-muted rounded text-text-muted hover:text-white transition-colors">Close</button>
                  <button onClick={() => updateReservationStatus(cancelModal.id, 'cancelled', cancelModal.reason)} className="px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition-colors">Confirm Cancel</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
};

export default Admin;