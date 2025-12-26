import { useState } from 'react';
import './App.css';
import { cates } from './utils/categories';

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
      alert('Product created successfully!');
      setFormData({
        name: "",
        price:"",
        category: "",
        description: ""
      })
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
          <select name="category" id="" value={formData.category} onChange={handleChange}>
              <option value="">Choose Category</option>
              {cates.map((cate) => (
                <option key={cate} value={cate}>{cate}</option>
              ))}
            </select>
            {errors.category && (
              <p style={{ color: 'red' }}>{errors.category}</p>
            )}
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
            
            <textarea name="description" id="" cols="30" rows="10" onChange={handleChange} placeholder="Enter Product Description"value={formData.description}></textarea>
            <button type="submit">Create Product</button>
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
