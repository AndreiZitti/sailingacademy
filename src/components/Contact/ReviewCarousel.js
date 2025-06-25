import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReviewCard from './ReviewCard.js';

const ReviewCarousel = ({ reviews }) => {
  const isMobile = window.innerWidth <= 768;  // Check if screen width is less than or equal to 768px

  return (
      <Carousel 
          showThumbs={false} 
          showStatus={false} 
          autoPlay 
          infiniteLoop 
          renderDotsOutside
          interval={4000} 
          maxItems={isMobile ? 1 : 3}  // Show only 1 item on mobile
          centerMode
          centerSlidePercentage={isMobile ? 100 : 33} // Occupy full width on mobile
      >
          {reviews.map((review, index) => (
              <div key={index}>
                  <ReviewCard {...review} />
              </div>
          ))}
      </Carousel>
  );
};

export default ReviewCarousel;
