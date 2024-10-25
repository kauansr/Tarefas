import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar'
import Perfil from './pages/Perfil'
import TodoList from './pages/TodoList'

function App() {
  return (
    <div>
     <Router>
      <Routes>
        <Route exact path='/' element={<Login />}/>
        <Route exact path='/cadastrar' element={<Cadastrar />}/>
        <Route exact path='/perfil/:id' element={<Perfil />}/>
        <Route exact path='/todolist' element={<TodoList />}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
