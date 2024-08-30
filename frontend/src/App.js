import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Doctors from './components/Doctors/Doctors.jsx';
import Layout from './components/Layout/Layout.jsx';
import Patient from './components/Patient/Patient.jsx';
import Home from './components/Home/Home.jsx';



const routes =createBrowserRouter([{path:'/',element:<Layout/> ,children:[
  {path:'/',element:<Home/>} ,
  {path:'doctors',element:<Doctors/>},

  {path:'Patient',element:<Patient/>},




]


}])
function App() {
  return (
    <RouterProvider router={routes}></RouterProvider>    
  );
}

export default App;
