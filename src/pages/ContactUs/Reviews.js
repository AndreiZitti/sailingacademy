import React from 'react';
import ReviewCarousel from './ReviewCarousel.js';
import './Reviews.css';

const Reviews = () => {
  const reviews =
  [
     {
        "author_name" : "Dan Popescu",
        "author_url" : "https://www.google.com/maps/contrib/105854175410235112310/reviews",
        "language" : "en",
        "original_language" : "en",
        "profile_photo_url" : "images/r1.png",
        "rating" : 5,
        "relative_time_description" : "2 months ago",
        "text" : "Maybe the best club for initiating children in the sport of sailing. In Bucharest.",
        "time" : 1686968191,
        "translated" : false
     },
     {
        "author_name" : "Cristian Firca",
        "author_url" : "https://www.google.com/maps/contrib/107974880733612962409/reviews",
        "language" : "en",
        "original_language" : "en",
        "profile_photo_url" : "images/r2.png",
        "rating" : 5,
        "relative_time_description" : "2 years ago",
        "text" : "Kids have lots of fun! Staff are friendly and well trained! Highly recomended!",
        "time" : 1625312528,
        "translated" : false
     },
     {
        "author_name" : "Daniela Meghea",
        "author_url" : "https://www.google.com/maps/contrib/115085197922097005208/reviews",
        "language" : "en",
        "original_language" : "en",
        "profile_photo_url" : "images/r4.png",
        "rating" : 5,
        "relative_time_description" : "2 years ago",
        "text" : "Wonderful place! A lot of joy and fun for kids!",
        "time" : 1623607508,
        "translated" : false
     },
     {
        "author_name" : "Mik P",
        "author_url" : "https://www.google.com/maps/contrib/113818538913961659286/reviews",
        "language" : "en",
        "original_language" : "en",
        "profile_photo_url" : "images/r3.png",
        "rating" : 5,
        "relative_time_description" : "8 months ago",
        "text" : "All people here are friendly",
        "time" : 1671357953,
        "translated" : false
     },
     {
        "author_name" : "Jorge Mota Pinto",
        "author_url" : "https://www.google.com/maps/contrib/112310973518070071593/reviews",
        "language" : "en",
        "original_language" : "en",
        "profile_photo_url" : "images/r5.png",
        "rating" : 5,
        "relative_time_description" : "a year ago",
        "text" : "Nice spot for SUP. Good SUP boards",
        "time" : 1658952712,
        "translated" : false
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
