import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import OctonadsImage from './Octonads_Web.png';
import Navbar from './Components/Navbar';
import Info from './Components/Info';
import NftSlider from './Components/NftSlider';
import RoadMap from './Components/RoadMap';
import Team from './Components/Team';
import TestnetNft from './Components/TestnetNft';
import Footer from './Components/Footer';

function App() {
  const triangleRef = useRef(null);
  const sceneRef = useRef(null);
  const [triangleTop, setTriangleTop] = useState(0);
  const [whalePositions, setWhalePositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading screen

  // Handler for the "Home" button click
  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading(false);
    }, 5000);
  };

  // Reusable Cloud component
  const Cloud = ({ id }) => (
    <div className="bigCloud" id={id}>
      <div className="largeCircle circ1">
        <div className="largeCircle circ1shadow"></div>
      </div>
      <div className="middleCircle circ2">
        <div className="middleCircle circ2shadow"></div>
      </div>
      <div className="middleCircle circ3">
        <div className="middleCircle circ3shadow"></div>
      </div>
      <div className="smallCircle circ4"></div>
      <div className="smallCircle circ5">
        <div className="smallCircle circ5shadow"></div>
      </div>
      <div className="smallCircle circ6">
        <div className="smallCircle circ6shadow"></div>
      </div>
    </div>
  );

  // Update triangle and whale positions
  useEffect(() => {
    function updatePositions() {
      if (triangleRef.current && sceneRef.current) {
        const triangleRect = triangleRef.current.getBoundingClientRect();
        const sceneRect = sceneRef.current.getBoundingClientRect();
        const triangleTopPx = triangleRect.top - sceneRect.top;
        setTriangleTop(triangleTopPx);
        document.documentElement.style.setProperty('--triangle-top', triangleTopPx + 'px');
        const sceneHeight = sceneRect.height;
        const whaleCount = Math.max(10, Math.floor((sceneHeight - triangleTopPx) / 100));
        const whales = Array.from({ length: whaleCount }, (_, i) => {
          const top = triangleTopPx + ((sceneHeight - triangleTopPx - 110) * (i / (whaleCount - 1)));
          return { i, top };
        });
        setWhalePositions(whales);
      }
    }
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [setTriangleTop, setWhalePositions]);

  // Initial loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5-second initial load
    return () => clearTimeout(timer);
  }, []);

  // Constants for rendering
  const rays = Array.from({ length: 52 }, (_, i) => i + 1);
  const bubbles = Array.from({ length: 100 }, (_, i) => i + 1);
  const wavePath =
    'M0,50 C12.5,40 37.5,40 50,50 ' +
    Array.from({ length: 79 }, (_, i) =>
      `S${50 * (i + 1) + 25},${(i + 1) % 2 === 0 ? 40 : 60} ${50 * (i + 2)},50`
    ).join(' ') +
    ' V100 H0 Z';
  const rainDrops = Array.from({ length: 150 }, (_, i) => i + 1);

  // LoadingScreen component
  const LoadingScreen = ({ isLoading }) => (
    <div className={`loading-overlay ${!isLoading ? 'hidden' : ''}`}>
      <div className="loader-content">
        <img
          src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreiguhll5qwfac6x36v362nv2mhgl7so45dd262zpulwq7c4tfwbedq"
          alt="Loading Logo"
          className="loader-logo"
        />
        <div className="loader-text">LOADING...</div>
      </div>
    </div>
  );

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Navbar onHomeClick={handleHomeClick} />
      <div className="scene" ref={sceneRef}>
        <div className="lightning-overlay"></div>
        <div className="cloudPane">
          <Cloud id="cloud1" />
          <Cloud id="cloud2" />
          <Cloud id="cloud3" />
          <Cloud id="cloud4" />
          <Cloud id="cloud5" />
          <Cloud id="cloud6" />
          <Cloud id="cloud7" />
        </div>
        <div className="rain-container">
          {rainDrops.map(i => (
            <div
              key={i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        <div className="birds">
          <div className="bird bird1">
            <div className="wing Rana wing-left"></div>
            <div className="wing wing-right"></div>
          </div>
          <div className="bird bird2">
            <div className="wing wing-left"></div>
            <div className="wing wing-right"></div>
          </div>
          <div className="bird bird3">
            <div className="wing wing-left"></div>
            <div className="wing wing-right"></div>
          </div>
        </div>
        <img src={OctonadsImage} alt="Octonads_Web" className="main-image" />
        <div className="triangleContainer" ref={triangleRef}>
          <svg width="200%" height="100%" viewBox="0 0 3000 100" preserveAspectRatio="none">
            <path d={wavePath} fill="rgb(88, 50, 159)" />
          </svg>
        </div>
        <div className="gradientContainer">
          <div className="overlay one"></div>
          <div className="gradient">
            {rays.map((i) => (
              <span key={`ray-a-${i}`} className={`ray${i}`}></span>
            ))}
          </div>
        </div>
        <div className="content-wrapper">
          <Info />
          <NftSlider />
          <RoadMap />
          <Team />
          <TestnetNft />
          <Footer />
        </div>
        <div className="whaleContainer">
          {whalePositions.map(({ i, top }) => (
            <div key={i} className={`whalePos size${(i % 7) + 1}`} style={{ top: top + 'px' }}>
              <div className={`whaleRotate size${(i % 7) + 1}`}>
                <div className="whale"></div>
                <div className="fin"></div>
              </div>
            </div>
          ))}
        </div>
        <svg className="rocks" width="100%" height="25vh" viewBox="0 0 100 25" preserveAspectRatio="none">
          <path
            d="M0,25 L0,10 C10,5 20,10 30,5 S40,10 50,5 S60,10 70,5 S80,10 90,5 S100,10 100,25 Z"
            fill="rgb(45, 6, 81)"
          />
          <path
            d="M0,25 L0,15 C15,10 25,15 35,10 S45,15 55,10 S65,15 75,10 S85,15 95,10 S100,15 100,25 Z"
            fill="rgb(33, 0, 68)"
          />
          <path
            d="M0,25 L0,20 C5,15 15,20 25,15 S35,20 45,15 S55,20 65,15 S75,20 85,15 S95,20 100,25 Z"
            fill="rgb(37, 1, 76)"
          />
        </svg>
        <div className="bubbleContainer">
          {bubbles.map((i) => {
            const bubbleType = (i % 10) + 1;
            const size = Math.floor(Math.random() * 4) + 2;
            const isHiddenOnSmall = i > 50;
            return (
              <span
                key={i}
                className={`bubbleY${i} ${isHiddenOnSmall ? 'hidden-on-small' : ''}`}
                style={{
                  left: `${Math.random() * 100}vw`,
                  animationDelay: `${Math.random() * 12}s`,
                  animationDuration: `${15 + Math.random() * 10}s`,
                }}
              >
                <span
                  className={`bubbleX${bubbleType}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    animationName: `bubbleX${bubbleType}`,
                    animationDuration: `${5 + Math.random() * 5}s`,
                  }}
                ></span>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;