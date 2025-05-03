import React, { useState, useEffect, useRef} from 'react';
import Navbar from '../components/landingComponnents/Navbar';
import Footer from '../components/landingComponnents/Footer';
import Page from '../components/landingComponnents/Page';
import Home from '../components/landingComponnents/pages/Home';
import Company from '../components/landingComponnents/pages/Company';
import Services from '../components/landingComponnents/pages/Services';
import Found from '../components/landingComponnents/pages/Found';
import Values from '../components/landingComponnents/pages/Value';
import Features from '../components/landingComponnents/Pages/Features';
import Features2 from '../components/landingComponnents/Pages/Features2';
import Money from '../components/landingComponnents/pages/Money';
import Future from '../components/landingComponnents/pages/Future';
import Promise from '../components/landingComponnents/pages/Promise';
import Contact from '../components/landingComponnents/pages/Contact';
import '../components/landingComponnents/Page.css';
import './xlanding.css';

const pageComponents = [<Home />, <Company />, <Services />, <Found />, <Values />, <Features />, <Features2 />, <Money />, <Future />, <Promise />, <Contact />,];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);

  const touchStartY = useRef(null);


  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, pageComponents.length - 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const debounce = () => {
    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 800); // Adjust animation delay as needed
  };

  const handleScroll = (event) => {
    if (isScrolling.current) return;

    if (event.deltaY > 0) goToNext();
    else if (event.deltaY < 0) goToPrev();

    debounce();
  };

  const handleKeyDown = (event) => {
    if (isScrolling.current) return;

    const { key } = event;
    if (key === 'ArrowDown' || key === 'PageDown') goToNext();
    else if (key === 'ArrowUp' || key === 'PageUp') goToPrev();

    debounce();
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (isScrolling.current || touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    const threshold = 100; // Minimum swipe distance
    if (deltaY > threshold) {
      goToNext();
      debounce();
    } else if (deltaY < -threshold) {
      goToPrev();
      debounce();
    }

    touchStartY.current = null;
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#f0f0f0',
        backgroundImage: 'url(/platform.jpg)',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />
      {pageComponents.map((Component, index) => {
        const delta = index - currentIndex;
        const isVisible = Math.abs(delta) <= 1;

        return (
          <Page
            key={index}
            content={Component}
            rotateY={delta * 90}
            visible={isVisible}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;