import React,{useEffect,useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost"
import Post from './store/PostContext'
import { AuthContext, FirebaseContext } from "./store/Context";

function App() {
const {setUser}= useContext(AuthContext)
const {firebaseApp} = useContext(FirebaseContext)
  useEffect((user)=>{
    firebaseApp.auth().onAuthStateChanged((user)=>{
      setUser(user) 
    })
  })

  return (
    <div className='App'>

      <Post>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />}  />
          <Route path="/login" element={<Login/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/view" element={<View/>} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
