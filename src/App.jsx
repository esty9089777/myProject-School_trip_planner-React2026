import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SingleTrip from './features/trips/components/SingleTrip';
import AllTrips from './features/trips/components/AllTrips'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>ברוכים הבאים למתכנן הטיולים שלנו!</div>
      <SingleTrip />
      <AllTrips />
    </>
  )
}

export default App
