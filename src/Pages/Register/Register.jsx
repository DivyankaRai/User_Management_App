import React from 'react'
import axios from 'axios'
import { TextField, Button, Box, Container, Typography, MenuItem, } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const {register,handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

    const onSubmit = async(data) => {
      try {
        console.log('Form data:', data);
        const res = await axios.post('https://jsonplaceholder.typicode.com/users', data);
        console.log("data successfully posted",res.data);
        navigate('/');
      } catch (error) {
        console.error('Error submitting form:', error);
      }

    };

  return (
    <>
         <Container maxWidth="sm" sx={{border: '1px solid #ccc',ml:6,pb:5,mt:13, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',backgroundColor: '#f0f0f0'}}>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
                noValidate
                autoComplete="off"
            >
                <Typography variant="h4" component="h1" gutterBottom> Add User</Typography>
                <TextField label="Name"
                    {...register("name", { required: 'Name is a required field.' })}
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
                    required
                />
                <TextField label="Email" type="email"
                    {...register("email", { 
                        required: 'Email is a required field',
                        pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: 'Enter a valid email address',
                        },
                    })}
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    required
                />
                <TextField label="Phone" type="number"
                    {...register("phone", { 
                        required: 'Phone Number is a required field'})}
                    fullWidth
                    margin="normal"
                    error={!!errors.phone}
                    helperText={errors.phone ? errors.phone.message : ''}
                    required
                />
                <TextField
                  select
                  label="Status"
                  {...register('status', { required: 'Status is required' })}
                  fullWidth
                  margin="normal"
                  error={!!errors.status}
                  helperText={errors.status ? errors.status.message : ''}
                  defaultValue="active"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Submit
                </Button>
            </Box>
        </Container>
    </>
  )
}

export default Register





