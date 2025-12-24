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
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
            <select name="category" id="" value={formData.category} onChange={handleChange}>
              <option value="">Choose Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Clothing">Clothing</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
              <option value="Beauty & Personal Care">Beauty & Personal Care</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Furniture">Furniture</option>
              <option value="Groceries">Groceries</option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Books">Books</option>
              <option value="Stationery">Stationery</option>
              <option value="Sports & Fitness">Sports & Fitness</option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Baby Products">Baby Products</option>
              <option value="Automobile">Automobile</option>
              <option value="Phones & Gadgets">Phones & Gadgets</option>
              <option value="Computers & Accessories">Computers & Accessories</option>
              <option value="Office Supplies">Office Supplies</option>

            </select>
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
            <button type="submit">Create Product</button>
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
