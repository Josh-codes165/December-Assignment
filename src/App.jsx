import { useState } from 'react';
import './App.css';
import { cates } from './utils/categories';
import { useMutation } from '@tanstack/react-query';

const postProduct = async (ProductData) => {
  const response = await fetch("https://api.oluwasetemi.dev/products", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(ProductData)
  })
  if(!response.ok){
    const errorMessage = await response.json()
    throw new Error(errorMessage.message || "Something went wrong")
  }

  return response.json()
}

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

    mutation.mutate({
      ...formData,
      price: Number(formData.price)
    })
   };

  const mutation = useMutation({
    mutationFn : postProduct,
    onSuccess : (data) => {
      alert("Product Created Succesfully")
      setFormData({
        name: "",
        price:"",
        category: "",
        description: ""
      })
    },
    onError : (error) => {
      alert(error.message)
    }
  })
  
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
            <button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Saving...' : 'Create Product'}</button>
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default App;