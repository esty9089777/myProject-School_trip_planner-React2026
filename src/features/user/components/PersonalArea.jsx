import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';

const PersonalArea = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [trips, setTrips] = useState([]);
  const [showTrips, setShowTrips] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. שליפת מזהה המשתמש מהטוקן בזמן טעינת הקומפוננטה
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // פיענוח בסיסי של ה-JWT (חלק ה-Payload שמכיל את הנתונים נמצא באינדקס 1)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );

        const decoded = JSON.parse(jsonPayload);
        
        // שליפת השדות מתוך הטוקן (התאימי את השמות לשדות שהשרת שלך מחזיר, למשל id, unique_name וכו')
        setUserId(decoded.id || decoded.nameid);
        setUserName(decoded.name || decoded.unique_name || 'משתמש');
      } catch (error) {
        console.error("שגיאה בפענוח הטוקן מה-LocalStorage:", error);
      }
    }
  }, []);

  // 2. פונקציה לשליפת הטיולים מהשרת באמצעות FETCH
  const fetchUserTrips = async () => {
    if (!userId) {
      alert("לא נמצא מזהה משתמש תקין, אנא התחבר מחדש.");
      return;
    }

    // אם הטיולים כבר מוצגים, לחיצה חוזרת תסגור את הרשימה
    if (showTrips) {
      setShowTrips(false);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/trips/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // שליחת הטוקן לאימות מול ה-Backend
        }
      });

      if (!response.ok) {
        throw new Error('תגובת השרת אינה תקינה');
      }

      const data = await response.json();
      setTrips(data);
      setShowTrips(true);
    } catch (error) {
      console.error("שגיאה בקבלת הטיולים:", error);
      alert("אירעה שגיאה בטעינת הטיולים מהשרת.");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="personal-area-container">
    <h2 className="personal-area-title">האזור האישי של {userName}</h2>
    
    <div className="button-group">
      {/* כפתור הצגת הטיולים */}
      <button onClick={fetchUserTrips} className="personal-button" disabled={loading}>
        {loading ? 'טוען נתונים...' : showTrips ? 'הסתר את הטיולים שלי' : 'הצג את הטיולים שלי'}
      </button>

      {/* כפתור יצירת טיול */}
      <button onClick={() => navigate('/create-trip')} className="personal-button create-btn">
        צור טיול חדש
      </button>
    </div>

    {/* אזור רשימת הטיולים */}
    {showTrips && (
      <div className="trips-list-section">
        <h3 className="trips-list-title">היסטוריית הטיולים שלך:</h3>
        {trips.length === 0 ? (
          <p>לא נמצאו טיולים קודמים במערכת.</p>
        ) : (
          <ul className="trips-list-wrapper">
            {trips.map((trip) => (
              <li key={trip.id} className="trip-card-item">
                <span className="trip-card-header">{trip.destination || trip.title}</span>
                {trip.date && <span className="trip-card-date"> ({new Date(trip.date).toLocaleDateString()})</span>}
                {trip.description && <p className="trip-card-desc">{trip.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>
);
};

export default PersonalArea;