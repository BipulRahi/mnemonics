// Arrow.jsx
import React from 'react';
 // Make sure to create this CSS file for styling
import { ArrowBigDown } from 'lucide-react';

const Scroll = ({ show }) => {
  console.log(show)
  return (


    <div className={`scroll-arrow  ${show ===true ? 'block' : 'hidden'}`}>
      <ArrowBigDown className='text-red-500'/>
    </div>
  );
};

export default Scroll;
