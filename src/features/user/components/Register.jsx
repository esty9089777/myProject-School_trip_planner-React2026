import React, { useState } from 'react';
import './User.css';

const SchoolTypeEnum = {
  ElementarySchool: 0,
  MiddleSchool: 1,
  Secondary: 2
};

const UserRoleEnum = {
  Admin: 0,
  User: 1,
  BusinessOwner: 2
};

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhoneNumber: '',
    userPassword: '',
    schoolType: SchoolTypeEnum.ElementarySchool,
    userRole: UserRoleEnum.User
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const processedValue = (name === 'schoolType' || name === 'userRole') 
      ? parseInt(value, 10) 
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5017/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'הרישום בוצע בהצלחה!' });
        setFormData({
          userName: '',
          userEmail: '',
          userPhoneNumber: '',
          userPassword: '',
          schoolType: SchoolTypeEnum.ElementarySchool,
          userRole: UserRoleEnum.User
        });
      } else {
        setMessage({ type: 'error', text: data.message || 'אירעה שגיאה בתהליך הרישום.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'לא ניתן להתחבר לשרת. אנא נסה שנית מאוחר יותר.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">הרשמת משתמש חדש</h2>
      
      {message.text && (
        <div className={`status-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="form-label">שם משתמש:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">אימייל:</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">מספר טלפון:</label>
          <input
            type="tel"
            name="userPhoneNumber"
            value={formData.userPhoneNumber}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">סיסמה:</label>
          <input
            type="password"
            name="userPassword"
            value={formData.userPassword}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* בחירת סוג מוסד חינוכי */}
        <div className="form-group">
          <label className="form-label">סוג מוסד חינוכי:</label>
          <div className="custom-pill-group">
            <button
              type="button"
              className={`pill-option ${formData.schoolType === SchoolTypeEnum.ElementarySchool ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, schoolType: SchoolTypeEnum.ElementarySchool }))}
            >
              יסודי
            </button>
            <button
              type="button"
              className={`pill-option ${formData.schoolType === SchoolTypeEnum.MiddleSchool ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, schoolType: SchoolTypeEnum.MiddleSchool }))}
            >
              חטיבה
            </button>
            <button
              type="button"
              className={`pill-option ${formData.schoolType === SchoolTypeEnum.Secondary ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, schoolType: SchoolTypeEnum.Secondary }))}
            >
              תיכון
            </button>
          </div>
        </div>

        {/* בחירת תפקיד */}
        <div className="form-group">
          <label className="form-label">תפקיד במערכת:</label>
          <div className="custom-pill-group">
            <button
              type="button"
              className={`pill-option ${formData.userRole === UserRoleEnum.User ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, userRole: UserRoleEnum.User }))}
            >
              רכז / משתמש
            </button>
            <button
              type="button"
              className={`pill-option ${formData.userRole === UserRoleEnum.BusinessOwner ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, userRole: UserRoleEnum.BusinessOwner }))}
            >
              בעל עסק
            </button>
            <button
              type="button"
              className={`pill-option ${formData.userRole === UserRoleEnum.Admin ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, userRole: UserRoleEnum.Admin }))}
            >
              מנהל
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'רושם משתמש...' : 'להרשמה'}
        </button>
      </form>
    </div>
  );
};

export default Register;