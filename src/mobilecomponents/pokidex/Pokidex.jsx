import React from 'react';
import './Pokidex.css';
import SeachBar from '../searchbar/SearchBar';
import ImageBox from '../imagebox/ImageBox';


const Pokidex = () => {
  return (
    <>
      <div className="pokedex-container">
          <div className="lighting-container">


          <div className="main-lighting">

          </div>
          <div className="lighting-one">

          </div>
          <div className="lighting-two">

          </div>
          <div className="lighting-three">

          </div>
        </div>
      </div>
      {//three dots
        //searchbar
        //photo
        //type info / weaknesses / strengths
      }
      <div className="seachbar-component">
        <SeachBar/>
      </div>

      <div className="imagebox-component">
        <ImageBox/>
      </div>

    </>
  );
};

export default Pokidex;
