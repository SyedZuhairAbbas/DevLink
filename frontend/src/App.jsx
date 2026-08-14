import {BrowserRouter , Routes , Route } from  'react-router-dom'
import Home from  './pages/Home'
import ProjectDetail from  './pages/ProjectDetail'
import AddProject from  './pages/AddProject'
import Navbar from './components/Navbar'

export default function App(){
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/project/:id' element={ <ProjectDetail /> } />
        <Route path='/add-project' element={ <AddProject /> } />
      </Routes>
    </BrowserRouter>
  )
}