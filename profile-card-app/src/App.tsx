import './App.css'
import ProfileCard from './features/profileCards/profileCard'

function App() {
  return (
    <div className="container">
      <h1>Homework - My Profile Card</h1>
      <ProfileCard
        name="John Doe"
        jobTitle="Software Engineer"
        favoriteTech="React"
      />
    </div>  
  )
}

export default App
