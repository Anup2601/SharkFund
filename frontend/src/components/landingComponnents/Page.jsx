import React from 'react';
import './Page.css';

const Page = ({ content, rotateY, visible }) => {
  return (
    <div
      className={`page ${visible ? 'visible' : 'hidden'}`}
      style={{
        transform: `rotateX(${rotateY}deg)`,
        zIndex: visible ? 1 : 0,
      }}
    >
      {content}
    </div>
  );
};

export default Page;
