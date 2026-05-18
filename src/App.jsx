import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom'; // ייבוא ה-BrowserRouter כדי לפתור את השגיאה הקודמת
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

import SingleTrip from './features/trips/components/SingleTrip';
import AllTrips from './features/trips/components/AllTrips';
import Register from './features/user/components/Register';
import PersonalArea from './features/user/components/PersonalArea';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div style={{ direction: 'rtl', padding: '20px' }}>
        <h1>ברוכים הבאים למתכנן הטיולים שלנו!</h1>
        
        {/* הקומפוננטות של הפרויקט שלך */}
        <PersonalArea />
        <Register />
        <AllTrips />
        <SingleTrip />
      </div>
    </BrowserRouter>
  );
}

export default App;