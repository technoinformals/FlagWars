import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import background from './assets/bg.jpeg';

const App = () => {
  const [teamNumber, setTeamNumber] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.src = 'https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg';
    backgroundImage.onload = () => {
      setImageLoaded(true);
    };

    document.body.style.backgroundImage = `url(${background})`;

    return () => {
      document.body.style.backgroundImage = ''; // Clear background image on component unmount
    };
  }, []);
  const images = [
    {
      src: require("./assets/earth.png"),
    },
    {
      src: require("./assets/fire.png"),
    },
    {
      src: require("./assets/water.png"),
    },
    {
      src: require("./assets/wind.png"),
    },
  ];

  const getProgressBarVariant = (index) => {
    switch (index) {
      case 0:
        return "success";
      case 1:
        return "danger";
      case 2:
        return "info";
      case 3:
        return "warning";
      default:
        return "success"; // Default to success if index is out of range
    }
  };
  

  const handleInputChange = (event) => {
    setTeamNumber(event.target.value);
  };

  const handleSubmit = async () => {
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/1htzgArSyLu9kyl6Ed1SB4v_w5jiAn8oof7icfOzc1l8/values/B${teamNumber}:D${teamNumber}`;
    const accessToken = 'ya29.a0AfB_byBjH6pCJvVJeSPmxpQ33J4Edb5eXy_SuYE1xdNDvlzveE3LagGRw7q410Q1QRZeI1z6EU8P9DQ-1gCkrN1pAX3LwpjwlK46RT1s91uats_4hmMFbumcpMtoYwRSzsFnXqL__z3_M-36VoXobJWk0qMV8NYLznjsaCgYKAfgSAQ8SFQHGX2MiPGENkAZuDZQZ8JzF2CP99g0171';

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Unauthorized - Please check your access token');
      }

      const data = await response.json();
      setResponseData(data);


    } catch (error) {
      console.error('Error fetching data:', error);
      setResponseData({
        error: 'Error fetching data. Please visit the base.',
      });
    }
  };

  

  return (
    <div className="app-container">
      <h1 className="heading">Flag <br />Wars</h1>
          <div className="input-container">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        <label htmlFor="teamNumber">Enter Your Team Number:</label>
        <input
          type="text"
          id="teamNumber"
          value={teamNumber}
          onChange={handleInputChange}
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      {imageLoaded && (
        <div className='responses'>
        {responseData && (
          <div>
            {responseData.error ? (
              <p className="error-message">{responseData.error}</p>
            ) : (
              <>
                <div className="image-grid-container">
                <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img alt="" src={image.src} className="img-responsive" />
            <ProgressBar variant={getProgressBarVariant(index)} now={Number(responseData.values[0][index])} label={`${responseData.values[0][index]}%`} />
          </div>
        ))}
      </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default App;
