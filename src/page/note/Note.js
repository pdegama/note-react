import { Route, Routes } from "react-router-dom";
import Header from './components/Header'
import NoteHome from './Home'
import New from './New'
import Edit from './Edit'
import Read from './Read'
import Settings from "./Settings";

const Note = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<NoteHome />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/new" element={<New />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/setting" element={<Settings />} />
      </Routes>
    </>
  )

}

export default Note;