import './App.css';
import Allprod from './component/Allprod';
import Navbar from './component/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import View from './component/View';
import Addprod from './component/Addprod';
import Edit from './component/Edit';
import Home from './component/Home';
function App() {
  return (
  <BrowserRouter>
      <Navbar />
      <Routes >
      <Route  path='/' element={<Allprod/>} />
          <Route  path='/allprod' element={<Allprod />} />
          <Route  path='/addprod' element={<Addprod />} />
          <Route  path="/view/:id" element={<View />} />
          <Route  path="/edit/:id" element={<Edit />} />


      </Routes>
   
  </BrowserRouter>
  );
}

export default App;
