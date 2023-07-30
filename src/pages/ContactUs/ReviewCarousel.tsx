import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReviewCard, { ReviewProps } from './ReviewCard.tsx';

const ReviewCarousel: React.FC<{ reviews: ReviewProps[] }> = ({ reviews }) => (
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
