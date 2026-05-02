import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CardsPage from './pages/CardsPage'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/navbar/Navbar'
import Layout from './components/layout/Layout'
import { useAuth } from './hooks/useAuth'
import HeroCarousel from './components/guest/HeroCarousel'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <AppContent />
        </BrowserRouter>  
      </AuthProvider>
    </>
  )
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;

  if (!user) {
    return <HeroCarousel />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CardsPage />} />
        <Route path="/favorites" element={<CardsPage />} />
        <Route path="/learned" element={<CardsPage />} />
      </Routes>
    </Layout>
  );
}

export default App
