import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReviewCard from './ReviewCard.js';

const ReviewCarousel = ({ reviews }) => (
  <Carousel 
    showThumbs={false} 
    showStatus={false} 
    autoPlay 
    infiniteLoop 
    interval={6000} 
    
    centerMode
    centerSlidePercentage={33}
  >
    {reviews.map((review, index) => (
      <div key={index}>
        <ReviewCard {...review} />
      </div>
    ))}
  </Carousel>


);

export default ReviewCarousel;
