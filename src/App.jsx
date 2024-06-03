import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Users from './Pages/Users/Users'
import Register from './Pages/Register/Register'
import Edit from './Pages/Edit/Edit'
import Navbar from './Component/Navbar/Navbar'

function App() {

  return (
    <div>
    <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users/>}></Route>
        <Route path="/create" element={<Register/>}></Route>
        <Route path='/edit/:id' element={<Edit/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
