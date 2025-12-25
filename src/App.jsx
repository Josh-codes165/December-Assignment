import { useState } from 'react';
import './App.css';
import { cates } from './utils/categories';
import { handleChange } from './utils/checks';
import { handleSubmit } from './utils/checks';
import { validate } from './utils/checks';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
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
              {cates.map((cate) => (
                <option key={cate} value={cate}>{cate}</option>
              ))}
            </select>
            {errors.category && (
              <p style={{ color: 'red' }}>{errors.category}</p>
            )}
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
