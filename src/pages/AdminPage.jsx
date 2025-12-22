import React, { useState, useEffect } from 'react';
import './AdminPage.css';

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('reservations');
  
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const ADMIN_PIN = "1234"; // Hardcoded PIN

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      setError('');
      fetchData();
    } else {
      setError('Incorrect PIN');
      setPin('');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Reservations
      const resResponse = await fetch('http://localhost:3001/api/reservations');
      const resData = await resResponse.json();
      setReservations(resData);

      // Fetch Orders
      const ordResponse = await fetch('http://localhost:3001/api/orders');
      const ordData = await ordResponse.json();
      setOrders(ordData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reservation Actions
  const updateReservationStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:3001/api/reservations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData(); // Refresh data
    } catch (err) {
      console.error("Error updating reservation:", err);
    }
  };

  const deleteReservation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;
    try {
      await fetch(`http://localhost:3001/api/reservations/${id}`, {
        method: 'DELETE'
      });
      fetchData();
    } catch (err) {
      console.error("Error deleting reservation:", err);
    }
  };

  // Order Actions
  const updateOrderStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:3001/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData();
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder(prev => ({ ...prev, status }));
      }
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="admin-login-container">
          <h1 className="admin-title">ADMIN ACCESS</h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              className="admin-login-input"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
            />
            <button type="submit" className="admin-login-button">ENTER</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1 className="admin-title">DASHBOARD</h1>
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            Reservations
          </button>
          <button 
            className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="action-btn btn-delete">Logout</button>
      </header>

      <div className="admin-content">
        {loading && <p>Loading data...</p>}
        
        {!loading && activeTab === 'reservations' && (
          <div className="reservations-table-container">
            <table className="reservations-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Guests</th>
                  <th>Tables</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(res => (
                  <tr key={res._id}>
                    <td>{new Date(res.date).toLocaleDateString()}</td>
                    <td>{new Date(res.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td>{res.name}</td>
                    <td>{res.contactNumber}</td>
                    <td>{res.maxGuests}</td>
                    <td>{res.tableNumbers.join(', ')}</td>
                    <td>
                      <span className={`status-badge status-${res.status}`}>
                        {res.status}
                      </span>
                    </td>
                    <td>
                      {res.status === 'active' && (
                        <button 
                          className="action-btn btn-complete"
                          onClick={() => updateReservationStatus(res._id, 'completed')}
                        >
                          Complete
                        </button>
                      )}
                      <button 
                        className="action-btn btn-delete"
                        onClick={() => deleteReservation(res._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center' }}>No reservations found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && activeTab === 'orders' && (
          <div className="orders-layout">
            {/* Left: Orders List */}
            <div className="orders-list">
              {orders.map(order => (
                <div 
                  key={order._id} 
                  className={`order-list-item ${selectedOrder?._id === order._id ? 'active' : ''}`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <strong>Order #{order._id.slice(-6)}</strong>
                    <span className={`status-badge status-${order.status}`}>{order.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                    <span>{order.customerName}</span>
                    <span>Rs. {order.totalAmount}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '5px' }}>
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
              {orders.length === 0 && <p className="empty-state">No orders found</p>}
            </div>

            {/* Right: Receipt View */}
            <div className="receipt-view-container">
              {selectedOrder ? (
                <div className="receipt-view">
                  <div className="receipt-header">
                    {/* Assuming first item image or a generic logo */}
                    {selectedOrder.items[0]?.src && (
                      <img src={selectedOrder.items[0].src} alt="Item" className="receipt-image" />
                    )}
                    <h2>Order Receipt</h2>
                    <p>#{selectedOrder._id}</p>
                    <p>{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                    <p>Customer: {selectedOrder.customerName}</p>
                  </div>

                  <div className="receipt-items">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="receipt-row">
                        <span>{item.quantity}x {item.name}</span>
                        <span>Rs. {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="receipt-total">
                    <span>TOTAL</span>
                    <span>Rs. {selectedOrder.totalAmount}</span>
                  </div>

                  <div className="receipt-actions">
                    {selectedOrder.status === 'pending' && (
                      <>
                        <button 
                          className="receipt-btn receipt-btn-complete"
                          onClick={() => updateOrderStatus(selectedOrder._id, 'completed')}
                        >
                          Complete
                        </button>
                        <button 
                          className="receipt-btn receipt-btn-cancel"
                          onClick={() => updateOrderStatus(selectedOrder._id, 'cancelled')}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {selectedOrder.status !== 'pending' && (
                      <div style={{ width: '100%', textAlign: 'center', padding: '10px', backgroundColor: '#eee', borderRadius: '8px' }}>
                        Order is {selectedOrder.status}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="empty-state">Select an order to view details</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
