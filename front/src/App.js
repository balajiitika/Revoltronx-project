import { useState } from 'react';
import DataProvider from './context/DataProvider';
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom'

// components 
import Login from './components/accounts/Login';
import Home from './components/Home/Home';
import Header from './components/header/header';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
const PrivateRoute = ({isAuthenticated, ...props}) =>{
  return isAuthenticated ?
  <>
  <Header/>
  <Outlet/>
  </>
    : <Navigate replace to = '/login'/>
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
      <DataProvider >
      <BrowserRouter>
      <div style={{marginTop: 64}}>
        <Routes>
      <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>
      <Route path='/' element={<PrivateRoute isUserAuthenticated={isAuthenticated} />}>
      <Route path='/' element={<Home/>} />
      </Route>

      <Route path='/create' element={<PrivateRoute isUserAuthenticated={isAuthenticated} />}>
      <Route path='/create' element={<CreatePost/>} />
      </Route>

      <Route path='/details/:id' element={<PrivateRoute isUserAuthenticated={isAuthenticated} />}>
      <Route path='/details/:id' element={<DetailView/>} />
      </Route>

      <Route path='/update/:id' element={<PrivateRoute isUserAuthenticated={isAuthenticated} />}>
      <Route path='/update/:id' element={<Update/>} />
      </Route>

      </Routes>
      </div>
      </BrowserRouter>
      </DataProvider>
  );
}

export default App;
