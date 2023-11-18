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
    const teamNumberValue = Number(teamNumber);
    const nextTeamNumber = teamNumberValue + 1;
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/1b0NqaJ6RybLYZu1y8UO84b1hQJUJzywlTJzHxKJ49Oc/values/B${nextTeamNumber}:E${nextTeamNumber}`;
      const accessToken = 'ya29.a0AfB_byBMDzNup_zmJxlkbGqhNWQrN4s_8YbOMycczoDf-UWC7B-CaWRCXg5qKlzoLjwtpeBNz51Ka3F0MNDReu7dsaaNcLD1Gno59TmJlVPyWg6jq7agi1mBIEqQjvh5II-knEDBprF-F3lnCOd1RHzjmMbPi5ZsuUp4aCgYKAXoSARMSFQHGX2MiIPE-hulMAHBN9GY5Cdiu-w0171';

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
      <h3 className='subheading'>Enter your team number</h3>
          <div className="input-container">

            <br/>
            <br/>

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

<p className='progflag'>Flags = {Number(responseData.values[0][index])}</p>
            <div className='progress'>
            <ProgressBar
  variant={getProgressBarVariant(index)}
  now={Math.min(Number(responseData.values[0][index]) * 20, 95)}
  label={`\u00a0`} // Multiply the label data value by 20
/>
</div>
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
