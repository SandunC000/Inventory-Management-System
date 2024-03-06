import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard/dashboard'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element= {<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
