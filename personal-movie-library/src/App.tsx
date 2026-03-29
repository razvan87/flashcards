import { Route, Routes } from 'react-router'
import MovieList  from './features/movies/MovieList'
import MovieCardDetails from './features/movies/MovieCardDetails'
import './App.css'

function App() {
  return(
    <>
      <Routes>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/movies" element={<MovieList/>} />
        <Route path="/movies/:id" element={<MovieCardDetails />} />
      </Routes>
    </>
  );
}
export default App
