import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import 'font-awesome/css/font-awesome.min.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    
      try {
       const response = await fetch('http://localhost:5004/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Message submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Failed to submit message.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong.');
  }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <div className="address">
          <div className="icon">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-map-marker"></i>
            </a>
          </div>
          <p>JECRC University</p>
        </div>
        <div className="address">
          <div className="icon">
            <i className="fa fa-phone"></i>
          </div>
          <p>+91 xxxxxxxx67</p>
        </div>
        <div className="address">
          <div className="icon">
            <i className="fa fa-envelope"></i>
          </div>
          <p>sukoon@gmail.com</p>
        </div>
        <div className="social-icons">
          <a href="#" className="icon">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa fa-twitter"></i>
          </a>
           <a href="#" target="_blank" rel="noopener noreferrer" className="icon"> 
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="contact-form">
        <h3>Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
