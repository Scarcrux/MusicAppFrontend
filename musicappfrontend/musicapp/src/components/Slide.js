import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import background from '../assets/img/zebra.jpg';

const slideImages = [
  'assets/img/zebra.jpg',
  'assets/img/zebra.jpg',
  'assets/img/zebra.jpg'
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
          <div className="each-slide" id="share">
            <div>
              <span>Share Music</span>
            </div>
          </div>
          <div className="each-slide" id="meetup">
            <div>
              <span>Meet Friends</span>
            </div>
          </div>
          <div className="each-slide" id="explore">
            <div>
              <span>Explore Music</span>
            </div>
          </div>
        </Slide>
      </div>
    )
}

export default Slideshow;