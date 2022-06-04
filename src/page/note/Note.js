import { Route, Routes } from "react-router-dom";
import Header from './components/Header'
import NoteHome from './Home'
import New from './New'
import Edit from './Edit'

const Note = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<NoteHome />} />
        <Route path="/new" element={<New />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </>
  )

}

export default Note;