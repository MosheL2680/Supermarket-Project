import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Categories from './components/Categories';
import Products from './components/Products';
import { ThemeProvider } from 'react-bootstrap';
import History from './components/History';
import Welcome from './components/Welcome';
import ResetPass from './components/ResetPass';
import Profile from './components/Profile';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ThemeProvider>
      {/* routing for the app */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='*' element={<h1>page not found</h1>}/>
            <Route path='**' element={<h1>page not found</h1>}/>
            <Route index element={<Welcome />} />
            <Route path='/categories' element={<Categories />}>
              <Route index element={<Products />} />
              <Route path='history' element={<History />} />
              <Route path=':catID' element={<Products />} />
              <Route path='allProducts' element={<Products />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/account' element={<Profile />} />
            <Route path='/resetpass' element={<ResetPass />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
