import './App.css'
import HomePage from './pages/HomePage'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <HomePage />
      </AuthProvider>
    </>
  )
}

export default App
