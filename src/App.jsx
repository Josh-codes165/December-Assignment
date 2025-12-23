import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.price) {
      newErrors.price = 'Price is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch('https://api.oluwasetemi.dev/products', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to create product');
      setSuccess('Product created successfully!');
      setErrors({});
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className="container">
        <h2>Create Product</h2>
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
            />{' '}
            <br />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            <br />
            {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
            <br />
            {errors.category && (
              <p style={{ color: 'red' }}>{errors.category}</p>
            )}
            <input
              type="text"
              name="description"
              placeholder="Description (Optional)"
              value={formData.description}
              onChange={handleChange}
            />
            <br />
            <button type="submit">Create Product</button>
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
