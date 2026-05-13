import React from 'react';
import SingleTrip from './SingleTrip'; // וודאי שהנתיב נכון

const AllTrips = () => {
  // הנה נתוני הדמה שמדמים את מה שראינו בתמונה image_e979e3.png
  const dummyTrips = [
    {
      id: 1,
      title: "טיול כיתות ו-ח",
      date: "13.5.2026",
      location: "ירושלים",
      tags: ["כיתות ו-ח", "ירושלים", "מעורב", "3 אטרקציות"],
      schedule: [
        { time: "07:30", activity: "יציאה ממוסד הלימוד" },
        { time: "07:30–08:18", activity: "נסיעה למוזיאון המדע ירושלים" },
        { time: "08:18–10:48", activity: "מוזיאון המדע ירושלים", sub: "מוזיאון" },
        { time: "10:48–10:58", activity: "נסיעה לפארק עין יעל - פיקניק" },
        { time: "15:54–16:14", activity: "תפילת מנחה בבית כנסת אשדוד", sub: "אתר דתי" },
        { time: "17:20–16:48", activity: "חזרה למוסד הלימוד" }
      ]
    }
  ];

  return (
    <div className="all-trips-container">
      <h1 style={{ textAlign: 'right', marginRight: '5%' }}>הטיולים שלי</h1>
      
      {/* כאן אנחנו עוברים על המערך ומציגים כל טיול */}
      {dummyTrips.map((singleTrip) => (
        <SingleTrip key={singleTrip.id} trip={singleTrip} />
      ))}
    </div>
  );
};

export default AllTrips;