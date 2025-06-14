import React, { useEffect, useRef, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import {
  GetMedicines,
  CreateMedicine,
  UpdateMedicine,
  DeleteMedicine
} from '../services/medicineService';

const MedicineManagement = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    manufacturer: '',
    lightPixze: '',
    discount: '',
    quantity: '',
    expiryDate: '',
    disease: '',
    uses: '',
    status: 'Available',
    imageFile: null
  });

  const [medicineList, setMedicineList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const data = await GetMedicines();
      setMedicineList(data);
    } catch (error) {
      console.error('Failed to fetch medicines', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
    }
  };

  const handleSubmit = async () => {
    const {
      id,
      name,
      manufacturer,
      lightPixze,
      discount,
      quantity,
      expiryDate,
      disease,
      uses,
      status,
      imageFile
    } = formData;

    if (!name || !manufacturer || !lightPixze || !discount || !quantity || !expiryDate) {
      alert('Please fill all required fields.');
      return;
    }

    if (!editing && !imageFile) {
      alert('Image is required when adding a new medicine.');
      return;
    }

    try {
      const form = new FormData();
      form.append('name', name);
      form.append('manufacturer', manufacturer);
      form.append('lightPixze', lightPixze);
      form.append('discount', discount);
      form.append('quantity', quantity);
      form.append('expiryDate', expiryDate);
      form.append('disease', disease || '');
      form.append('uses', uses || '');
      form.append('status', status || 'Available');
      if (imageFile) form.append('image', imageFile);

      if (editing) {
        await UpdateMedicine(id, form);
        setMessage('Medicine updated successfully.');
      } else {
        await CreateMedicine(form);
        setMessage('Medicine added successfully.');
      }

      resetForm();
      loadMedicines();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Something went wrong!');
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      manufacturer: '',
      lightPixze: '',
      discount: '',
      quantity: '',
      expiryDate: '',
      disease: '',
      uses: '',
      status: 'Available',
      imageFile: null
    });
    setEditing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      manufacturer: item.manufacturer,
      lightPixze: item.lightPixze,
      discount: item.discount,
      quantity: item.quantity,
      expiryDate: item.expiryDate.split('T')[0],
      disease: item.disease,
      uses: item.uses,
      status: item.status,
      imageFile: null
    });
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medicine?')) return;
    try {
      await DeleteMedicine(id);
      loadMedicines();
    } catch (error) {
      console.error('Delete failed', error);
      alert('Failed to delete medicine');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toISOString().split('T')[0];
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h3>Medicine Management</h3>

        {message && <div className="alert alert-success">{message}</div>}

        <div className="bg-light p-4 rounded mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Light Pixze"
                name="lightPixze"
                value={formData.lightPixze}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            <div className="col-md-6 d-grid">
              <button className="btn btn-primary" onClick={handleSubmit}>
                {editing ? 'Update' : 'Add'} Medicine
              </button>
            </div>
            <div className="col-md-6 d-grid">
              <button className="btn btn-secondary" onClick={resetForm}>
                Reset
              </button>
            </div>
          </div>
        </div>

        <h4>Medicine List</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Light Pixze</th>
                <th>Discount</th>
                <th>Quantity</th>
                <th>Expiry Date</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicineList.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.manufacturer}</td>
                  <td>{item.lightPixze}</td>
                  <td>{item.discount}</td>
                  <td>{item.quantity}</td>
                  <td>{formatDate(item.expiryDate)}</td>
                  <td>
                    {item.imageURL ? (
                      <img
                        src={`https://localhost:7235${item.imageURL}`}
                        alt="medicine"
                        width="60"
                        height="40"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-dark btn-sm me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {medicineList.length === 0 && (
                <tr>
                  <td colSpan="9">No medicines found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MedicineManagement;
