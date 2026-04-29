import './App.css'
import HomePage from './pages/HomePage'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/navbar/Navbar'
import Layout from './components/layout/Layout'

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Layout>
          <HomePage />
        </Layout>
      </AuthProvider>
    </>
  )
}

export default App
