import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Note from './note/Note'
import Login from './auth/Login'
import Logout from './auth/Logout'
import Register from './auth/Register'
import Error404 from './Error404'
import '../style/style.css'

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/note/*" element={<Note />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
