import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Error404 from './Error404'

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
