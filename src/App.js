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
      const accessToken = 'ya29.a0AfB_byDSGd7Dw_4_hg7oUbUcRh-09ERh7sHIpuG_FBGIti_-jtJPqdicDFpuBOOrexJVQ3LTrPoi3LfiFjj0v42KBdY96BGfzjldXzaO66RSAnjLkge_c0-csUwejUGSiosSAJPdjvY8ypgBBVSIZpjm58dU1X7VeccxaCgYKAXcSARMSFQHGX2MimYaLMECVPCRNOmhBI4Qosw0171';

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
            <ProgressBar
  variant={getProgressBarVariant(index)}
  now={Number(responseData.values[0][index]) * 20}
  label={`${Number(responseData.values[0][index]) * 20}%`} // Multiply the label data value by 20
/>
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
