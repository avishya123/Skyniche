import {BrowserRouter,Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/style.css'
import MainNav from './components/MainNav';
import Home from './components/Home';
import Employee from './components/Employee';
import '@fortawesome/fontawesome-free/css/all.css';
import Update from './components/Update';


function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
     <Route path="/nav" element={<MainNav/>}/>
     <Route path="/" element={<Home/>}/>
     <Route path="/employee" element={<Employee/>}/>
     <Route path="/update/:id" element={<Update/>}/>
     </Routes>

    </div>
    </BrowserRouter>
  )
}

export default App
