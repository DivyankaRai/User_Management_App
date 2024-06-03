import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Box, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
        setValue('name', response.data.name);
        setValue('email', response.data.email);
        setValue('phone', response.data.phone);
        setValue('status', response.data.status);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, data);
      console.log("data sucessfully posted",res.data);
      navigate('/');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{border: '1px solid #ccc',ml:6,pb:5,mt:13, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',backgroundColor: '#f0f0f0'}}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit User
        </Typography>
        <TextField
          label="Name"
          {...register('name', { required: 'Name is required' })}
          fullWidth
          disabled
          margin="normal"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Email"
          {...register('email', { 
            required: 'Email is required', 
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Enter a valid email address',
            },
          })}
          fullWidth
          disabled
          margin="normal"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Phone"
          {...register('phone', { required: 'Phone is required' })}
          fullWidth
          margin="normal"
          error={!!errors.phone}
          helperText={errors.phone ? errors.phone.message : ''}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Status"
          {...register('status', { required: 'Status is required' })}
          fullWidth
          margin="normal"
          error={!!errors.status}
          helperText={errors.status ? errors.status.message : ''}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default Edit;