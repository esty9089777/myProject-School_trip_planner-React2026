const BASE_URL = 'http://localhost:5017/api/auth';

const registerUserApi = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  // אם השרת החזיר שגיאה, נזרוק אותה כדי שה-Slice יתפוס אותה
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'אירעה שגיאה בתהליך הרישום');
  }

  return await response.json(); // מחזיר את תשובת ההצלחה מה-C#
};