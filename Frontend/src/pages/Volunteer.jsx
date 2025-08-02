import React from 'react';

const founders = [
  {
    name: 'Mukund Goyal',
    role: 'Front-end Team', 
  
    image: 'https://i.postimg.cc/mgKQYsSv/Whats-App-Image-2025-05-10-at-18-38-12.jpg', // Replace with actual image file
  },
  {
    name: 'Khanak Khandelwal',
    role: 'Back-end Team',
    image: 'https://i.postimg.cc/rFXYT9J5/Whats-App-Image-2025-05-10-at-17-54-10.jpg', // Replace with actual image file
  },

  
];

const Volunteer = () => {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <div className="founders">
        {founders.map((founder, index) => (
          <div key={index} className="founder">
            <div className="founder-image">
              <img src={founder.image} alt={founder.name} />
            </div>
            <div className="founder-details">
              <h3>{founder.name}</h3>
              <p>{founder.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Volunteer;

