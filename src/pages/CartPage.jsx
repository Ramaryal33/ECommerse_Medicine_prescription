import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateOrder } from '../services/orderService';
import { GetUser } from '../services/customerServices';


const CartPage = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('User'));
    if (storedUser?.id) {
      GetUser(storedUser.id)
        .then((res) => setUser(res.data))
        .catch(() => alert('Failed to fetch user.'));
    }

    const storedItems = localStorage.getItem('cartItems');
    setItems(storedItems ? JSON.parse(storedItems) : []);
  }, []);

  const handleRemove = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const generateUniqueOrderNumber = () => {
    return 'ORD-' + crypto.randomUUID().slice(0, 8).toUpperCase();
  };

  const handlePlaceOrder = async () => {
    if (!user?.id) return alert('User not found.');
    if (items.length === 0) return alert('Your cart is empty.');

    const orderData = {
      userId: user.id,
      orderNumber: generateUniqueOrderNumber(),
      orderTotal: items.reduce((acc, item) => acc + item.quantity * (item.medicine.price || 0), 0),
      orderStatus: 'Pending',
      orderDate: new Date().toISOString()
    };

    try {
      await CreateOrder(orderData);

      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      localStorage.setItem('lastOrderItems', JSON.stringify(items));
      localStorage.removeItem('cartItems');
      setItems([]);
      navigate('/user/orders');
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order.');
    }
  };

  const getImageUrl = (path) => (path ? `https://localhost:7235${path}` : '/fallback-image.png');

  return (
    <>
      
      <div className="container mt-4">
        <h2 className="mb-4">Cart Items</h2>

        {items.length > 0 ? (
          <>
            <button className="btn btn-primary mb-4" onClick={handlePlaceOrder}>
              Place Order
            </button>
            <div className="row">
              {items.map((item) => (
                <div className="col-md-3 mb-4" key={item.id}>
                  <div className="card text-center shadow-sm border-0 h-100">
                    <img
                      src={getImageUrl(item.medicine?.imageURL)}
                      alt={item.medicine?.name}
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'contain', padding: '20px' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.medicine?.name}</h5>
                      <p>Quantity: {item.quantity}</p>
                      <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="alert alert-info">No item to display. Kindly add...</div>
        )}
      </div>
    </>
  );
};

export default CartPage;
