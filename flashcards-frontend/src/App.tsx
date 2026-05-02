import './App.css'
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
        <Navbar />
        <AppContent />
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
      <CardsPage />
    </Layout>
  );
}

export default App
