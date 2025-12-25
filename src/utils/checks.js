export const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  export const validate = () => {
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

  export const handleSubmit = async (e) => {
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
      setErrors({});
    } catch (error) {
      alert(error.message);
    }
  };
  