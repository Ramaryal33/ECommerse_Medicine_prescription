import React, { useEffect, useState } from 'react';
import { GetMedicines } from '../services/medicineService';
import UserNavbar from '../components/UserNavbar';
import { useNavigate } from 'react-router-dom';

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const navigate = useNavigate();

  const getCartFromStorage = () => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  };

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const data = await GetMedicines();
        const cartItems = getCartFromStorage();
        const cartIds = cartItems.map((item) => item.id);
        const filtered = data.filter((med) => !cartIds.includes(med.id));
        setMedicines(filtered);
      } catch (error) {
        console.error('Failed to fetch medicines:', error);
        setMessage('❌ Failed to load medicines.');
      } finally {
        setLoading(false);
      }
    };
    loadMedicines();
  }, []);

  const handleQuantityChange = (medicineId, quantity) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [medicineId]: Number(quantity),
    }));
  };

  const handleAddToCart = (med) => {
    const quantity = selectedQuantities[med.id] || 1;

    const cartItem = {
      id: med.id,
      medicine: med,
      quantity,
      unitPrice: med.price || 0,
    };

    const existing = getCartFromStorage();
    const updated = [...existing, cartItem];
    localStorage.setItem('cartItems', JSON.stringify(updated));

    alert(`✅ Added ${quantity} of ${med.name} to cart!`);
    navigate('/user/cart');
  };

  const getImageUrl = (path) => {
    return path ? `https://localhost:7235${path}` : null;
  };

  if (loading) {
    return (
      <>
        <UserNavbar />
        <div className="container text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p>Loading medicines...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <UserNavbar />
      <div className="container mt-4">
        <h2 className="mb-4">All Products</h2>
        {message && <div className="alert alert-danger">{message}</div>}

        <div className="row">
          {medicines.map((med) => (
            <div className="col-md-3 mb-4" key={med.id}>
              <div className="card h-100 text-center shadow-sm border-0">
                {med.imageURL && (
                  <img
                    src={getImageUrl(med.imageURL)}
                    alt={med.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'contain', padding: '20px' }}
                    onError={(e) => { e.target.src = '/fallback-image.png'; }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{med.name}</h5>
                  <select
                    className="form-select mb-3"
                    value={selectedQuantities[med.id] || ''}
                    onChange={(e) => handleQuantityChange(med.id, e.target.value)}
                  >
                    <option value="">Select Quantity</option>
                    {[...Array(Math.min(5, med.quantity)).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-primary w-100 mt-auto"
                    disabled={!selectedQuantities[med.id]}
                    onClick={() => handleAddToCart(med)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MedicinesPage;
