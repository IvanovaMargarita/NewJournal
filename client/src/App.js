import './App.css';
import {BrowserRouter, Routes, Router, Route} from 'react-router-dom';
import LoginRegistration from './views/LoginRegistration';
import PostForm from './components/PostForm';
import Nav from './components/Nav';
import FormandList from './views/FormandList';
import PostList from './components/PostList';
import 'bootstrap/dist/css/bootstrap.min.css';
import OnePost from './components/OnePost';
import './index.css'
import Logout from './components/Logout';
import EditPost from './components/EditPost';
import PostsByUser from './components/PostsByUser';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Nav></Nav>
      <Routes>
        <Route element={<EditPost/>} path="/post/edit/:id"></Route>
        <Route element={<OnePost/>} path="/post/details/:id"></Route>
        <Route element={<Logout/>} path="/logout"></Route>
        <Route element={<PostsByUser/>} path="/postsby/:username"></Route>
        <Route element={<Register/>} path ="/register"></Route>

        <Route element={<PostForm/>} path="/createPost"></Route>
        <Route element ={<PostList/>}path="/displayall"></Route> 
        <Route element={<Login/>} path ="/"></Route>
      </Routes>
    
    </BrowserRouter>

    </div>
  );
}

export default App;
