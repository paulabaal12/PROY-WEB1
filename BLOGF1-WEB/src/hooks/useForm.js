import React, { useState } from 'react';
import useApi from './useApi';

const useForm = (initialState, onSubmit) => {
  const [formData, setFormData] = useState(initialState);
  const { sendRequest } = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest({
        method: 'POST',
        url: '/posts', 
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFormData(initialState);
      alert('Publicación creada exitosamente');
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      alert('Error al crear la publicación');
    }
    onSubmit(formData); // Llama a la función de envío proporcionada
  };

  return { formData, handleChange, handleSubmit };
};

export default useForm;