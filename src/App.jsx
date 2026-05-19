import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './features/user/components/Register';
import PersonalArea from './features/user/components/PersonalArea'; // וודאי ששורה זו קיימת!
import AllTrips from './features/trips/components/AllTrips';
import SingleTrip from './features/trips/components/SingleTrip';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/personal-area" element={<PersonalArea />} />
      </Routes>
    </Router>
  );
}

export default App;