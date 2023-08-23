import React from 'react';
import ReviewCarousel from './ReviewCarousel.js';
import './Reviews.css';

const Reviews = () => {
  const reviews = [
    {
      "author_name": "John Doe",
      "profile_photo_url": "https://randomuser.me/api/portraits/men/1.jpg",
      "rating": 4,
      "text": "Great place! The staff was very friendly and helpful. I will definitely be back."
    },
    {
      "author_name": "Jane Smith",
      "profile_photo_url": "https://randomuser.me/api/portraits/women/1.jpg",
      "rating": 5,
      "text": "This is hands down my favorite place in town. The atmosphere is great and the food is even better!"
    },
    {
      "author_name": "Bob Johnson",
      "profile_photo_url": "https://randomuser.me/api/portraits/men/2.jpg",
      "rating": 3,
      "text": "The place is good, but I've seen better. It might be worth a visit if you're in the area."
    },
    {
      "author_name": "Alice Williams",
      "profile_photo_url": "https://randomuser.me/api/portraits/women/2.jpg",
      "rating": 2,
      "text": "I didn't enjoy my visit here. The service was slow and the prices were high for what you get."
    },
    {
      "author_name": "Charlie Brown",
      "profile_photo_url": "https://randomuser.me/api/portraits/men/3.jpg",
      "rating": 4,
      "text": "A solid place with a good selection. I'll be coming back to try more!"
    }
  ].map(review => ({
    name: review.author_name,
    rating: review.rating,
    text: review.text,
    src: review.profile_photo_url,
    reviewUrl: 'https://www.google.com/' // replace with the actual review URL
  }));;
 
    return <ReviewCarousel reviews={reviews} />;
};


export default Reviews;
