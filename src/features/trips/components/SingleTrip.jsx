import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete'; 
import IconButton from '@mui/material/IconButton'; 
import Chip from '@mui/material/Chip'; // הוספתי Chip של MUI למסננים
import './SingleTrip.css';

export default function SingleTrip({ trip }) {
  if (!trip) 
    return <div className="trip-card">אין טיולים שמורים במערכת</div>;

  return (
    <div className="trip-card">
      <div className="trip-header">
        {/* פרטי הטיול - דינמיים לחלוטין */}
        <div className="header-info">
          <h2 className="trip-title">{trip.title} • {trip.date}</h2>
          
          {/* תגים (מסננים) עם מסגרת כמו שביקשת */}
          <div className="tags-container">
            {trip.tags && trip.tags.map((tag, index) => (
              <Chip 
                key={index} 
                label={tag} 
                variant="outlined" 
                size="small" 
                className="custom-chip" 
              />
            ))}
          </div>
        </div>

        {/* כפתורי פעולה */}
        <div className="action-buttons">
          <IconButton aria-label="delete" onClick={() => console.log('מחיקה:', trip.id)}>
            <DeleteIcon sx={{ color: '#888', '&:hover': { color: 'red' } }} />
          </IconButton>
          <button className="btn-close">סגור</button>
        </div>
      </div>

      <hr className="divider" />

      {/* לו"ז דינמי - מציג כל שעה ופעילות שהגדרת */}
      <div className="schedule-container">
        {trip.schedule && trip.schedule.map((item, index) => (
          <div key={index} className="schedule-row">
            <div className="activity-col">
              <div className="activity-name">{item.activity}</div>
              {item.subText && <div className="sub-text">{item.subText}</div>}
            </div>
            <span className="time-col">{item.time}</span>
          </div>
        ))}
      </div>
      
      <div className="trip-footer">
<span>נוצר: {trip.createdAt}</span>      </div>

    </div>
  );
}