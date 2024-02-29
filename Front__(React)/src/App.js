import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer';
import React, { useEffect, useState } from 'react';

function App() {
  const [user, setuser] = useState('user')
  const [is_admin, setis_admin] = useState(false)
  const [userEmail, setuserEmail] = useState('')
  const token = sessionStorage.getItem('token')
  const tokenData = { "Content-Type": "application/json", "Authorization": "Bearer " + token, }
  
  //  Get username, email, and if is admin from the token
  useEffect(() => {
    token && 'user' && setuser(JSON.parse(atob(token.split('.')[1])).username)
  }, [])
  useEffect(() => {
    token && 'user' && setuserEmail(JSON.parse(atob(token.split('.')[1])).email)
  }, [user])
  useEffect(() => {
    token && 'user' && setis_admin(JSON.parse(atob(token.split('.')[1])).isAdmin)
  }, [user])

  return (
    //  use context to provide token and info about user to all the components
    <Context.Provider value={{ uservalue: [user, setuser], isAdminvalue: [is_admin], userEmailValue: [userEmail], tokenvalue: [tokenData] }}>
      <div className='App'>
        <NavBar />
        <Outlet />
        <ToastContainer />{/* contain the all the tostifys the will apears */}
        <Footer />
      </div>
    </Context.Provider>
  );
}

export default App;

export const Context = React.createContext()