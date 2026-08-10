import {BrowserRouter , Routes , Route } from  'react-router-dom'
import Home from  './pages/Home'
import ProjectDetail from  './pages/ProjectDetail'
import AddProject from  './pages/AddProject'

export default function App(){
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/project/:id' element={ <ProjectDetail /> } />
        <Route path='/add-project' element={ <AddProject /> } />
      </Routes>
    </BrowserRouter>
  )
}