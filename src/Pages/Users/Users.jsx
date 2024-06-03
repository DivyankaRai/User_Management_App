import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { Link, NavLink } from 'react-router-dom';

import Paper from '@mui/material/Paper';

const Users = () => {

  const [users,setUsers]= useState([])

  const getData = async () =>{
    try {
      const data = await axios.get('https://jsonplaceholder.typicode.com/users')
      console.log(data)
      setUsers(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
    <Container sx={{mt:13}}>
    <Link to='/create'>
      <Button variant="contained" size="medium">Add User +</Button>
    </Link>
   <TableContainer component={Paper} sx={{border: '1px solid #ccc',pb:5,mt:3, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',backgroundColor: '#f0f0f0'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
            key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
              <NavLink to={`/edit/${row.id}`} className='btn btn-success'>
                <Button variant="contained" size="small">Edit</Button>
                </NavLink>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>
  )
}

export default Users
