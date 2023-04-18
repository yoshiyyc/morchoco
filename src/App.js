import { Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";

function App () {

  return (
    <div>
      <Routes className="App">
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<Dashboard/>} >
          <Route path="products" element={<AdminProducts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

// import { Routes, Route} from 'react-router-dom';
// import Login from './pages/Login';
// import Dashboard from './pages/admin/Dashboard';
// import AdminProducts from './pages/admin/AdminProducts';

// function App() {

//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/login" element={<Login/>}></Route>
//         <Route path="/admin" element={<Dashboard/>}>
//           <Route path='products' element={<AdminProducts/>}></Route>
//         </Route>
//       </Routes>
//     </div>
//   );

// }

// export default App;