import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Components/HomePage/Home';
import Profile from './Components/HomePage/Profile/Profile';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Register from './Components/Register/Register';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Main></Main>,
      children:[
        {
          path:'/',
          element:<PrivateRoute><Home></Home></PrivateRoute>
        },
        {
          path:'/profile',
          element:<PrivateRoute><Profile></Profile></PrivateRoute>
        }
      ]
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/register',
      element:<Register></Register>
    }
  ])
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
