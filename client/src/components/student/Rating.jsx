import React from 'react'
import {useState,useEffect} from 'react'

const Rating = ({initialRating,onRate}) => {

  const [ratingValue,setRatingValue]=useState(initialRating||0);

  const handleRating=(value)=>{
    setRatingValue(value)
    if(onRate){
      onRate(value)
    }
  }
  useEffect(()=>{
    if(initialRating){
      setRatingValue(initialRating)
    }
  },[initialRating])


  return (
    <div>
      {Array.from({length:5},(_,index)=>{
        const starValue=index + 1;
        return(
          <span key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= ratingValue ? 'text-yellow-500':'text-gray-300'}`} 
          onClick={()=>handleRating(starValue)}>&#9733;</span>
        )
      })}
    </div>
  )
}

export default Rating