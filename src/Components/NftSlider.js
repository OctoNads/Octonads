import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function App() {
  return <NftSlider />;
}


const imageUrls = [
  "https://chocolate-just-flea-552.mypinata.cloud/ipfs/bafybeifvsnifsfvv5yertz2xanhvrntt3b4fewhnemqnjv6qv7cm7gkm6e",
  "https://chocolate-just-flea-552.mypinata.cloud/ipfs/bafybeicgle26d3zqctamgwk2oxidqkpgr5wx35ufaedx4dy5u5pvnf2nh4",
  "https://chocolate-just-flea-552.mypinata.cloud/ipfs/bafybeigfcbqx4cm3oonegj2jcaewcxgfo2qr5k23gqwraoykrvsqmjnt6i",
  "https://chocolate-just-flea-552.mypinata.cloud/ipfs/bafkreiaohxtskmsmjoypgmrzsuiqw5lq26py5oxx54mi4xsdvzxnnsekji",
  "https://chocolate-just-flea-552.mypinata.cloud/ipfs/bafybeib5npxhytmj64lmgxwivvyjxbjuntg7zh5y4ph6fk6w2tzdcibrem",
  "https://jade-defensive-platypus-709.mypinata.cloud/ipfs/bafybeielxmveppc5p5fs4fxo3gnfdjsoaq2uvaeighdrbjb742gntwtkji",
  "https://jade-defensive-platypus-709.mypinata.cloud/ipfs/bafybeihiqh2xbmzmjk3wry75ulq3y7pgsxvbw7ffwvgbdsjbhpvtjhnusa",
  "https://jade-defensive-platypus-709.mypinata.cloud/ipfs/bafybeidv5fm6c56w7nk3mj5un2ajh37npxjzdeinmn4lkrpba2od7lln5a",
  "https://jade-defensive-platypus-709.mypinata.cloud/ipfs/bafybeidenjrail4u2dqj4lm5ymgxlme55lbw3q6j2jt5ws4hgfsd5davnq",
  "https://jade-defensive-platypus-709.mypinata.cloud/ipfs/bafybeie3mkjlc4fdhjw5cfyikeii6s7ttv7w2xnfpqrttq3is3psvt4zp4",
  "https://chocolate-negative-toad-428.mypinata.cloud/ipfs/bafybeih3u7hfqcftrx3k34tx266nlg26jdztihcd65dbzqtvby527xuep4",
  "https://chocolate-negative-toad-428.mypinata.cloud/ipfs/bafybeibxnh3b7fynoh46kxsobadecl543xhezwkosfapqgb3gzwrrmcjcq",
  "https://chocolate-negative-toad-428.mypinata.cloud/ipfs/bafybeihamqi3s4ck5mjyq6n3w53o3htb2v46ccx7zeragtixwvskrez534",
  "https://chocolate-negative-toad-428.mypinata.cloud/ipfs/bafybeia4n5wtxkybfpx6ulf4azvzfux5j2iguzuyufggbm75lua4ut6dxe",
  "https://chocolate-negative-toad-428.mypinata.cloud/ipfs/bafybeiha24qj57jphrly6mgplikdehyvu3a7b4dxx4kap724gfgss7ydfi"

];

const NftSlider = () => {

  const [items, setItems] = useState(imageUrls);

  const [direction, setDirection] = useState('');


  const autoSlideIntervalRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const carouselRef = useRef(null);


  const stopAutoSlide = useCallback(() => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  }, []);


  const handleNextClick = useCallback(() => {
    setDirection('next');

    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems.push(newItems.shift());
      return newItems;
    });
  }, []);


  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    autoSlideIntervalRef.current = setInterval(() => {
      handleNextClick();
    }, 5000);
  }, [stopAutoSlide, handleNextClick]);


  const handlePrevClick = () => {
    setDirection('prev');

    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems.unshift(newItems.pop());
      return newItems;
    });
  };

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) return;


    startAutoSlide();

    const handleMouseEnter = () => stopAutoSlide();
    const handleMouseLeave = () => startAutoSlide();

    carouselElement.addEventListener('mouseenter', handleMouseEnter);
    carouselElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      stopAutoSlide();
      carouselElement.removeEventListener('mouseenter', handleMouseEnter);
      carouselElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [startAutoSlide, stopAutoSlide]);

  useEffect(() => {
    if (direction) {

      const timer = setTimeout(() => {
        setDirection('');
      }, 1100);
      return () => clearTimeout(timer);
    }
  }, [items, direction]);


  return (
    <>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        :root {
          --item1-transform: translateX(-100%) translateY(-5%) scale(1.5);
          --item1-filter: blur(30px);
          --item1-zIndex: 11;
          --item1-opacity: 0;

          --item2-transform: translateX(0);
          --item2-filter: blur(0px);
          --item2-zIndex: 10;
          --item2-opacity: 1;

          --item3-transform: translate(50%, 10%) scale(0.8);
          --item3-filter: blur(10px);
          --item3-zIndex: 9;
          --item3-opacity: 0.8;

          --item4-transform: translate(90%, 20%) scale(0.5);
          --item4-filter: blur(30px);
          --item4-zIndex: 8;
          --item4-opacity: 0.5;

          --item5-transform: translate(120%, 30%) scale(0.3);
          --item5-filter: blur(40px);
          --item5-zIndex: 7;
          --item5-opacity: 0;

          --bg-gradient-light: linear-gradient(70deg, #8871ed, #ffffff);
          --bg-gradient-dark: linear-gradient(70deg, #5636e5, #000000);
        }
        
        .nft-slider-container {
            font-family: 'Poppins', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            box-sizing: border-box;
        }

        .horizontal-roadmap-title-container {
            text-align: center;
            margin-bottom: 2rem;
        }

        .carousel {
          position: relative;
          height: 500px; /* Adjusted height */
          overflow: hidden;
          width: 100%;
          max-width: 1600px;
        }

        .carousel .list {
          position: absolute;
          width: 100%;
          height: 100%; 
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .carousel .list .item {
          position: absolute;
          height: 100%;
          aspect-ratio: 1 / 1; /* CHANGED: Enforces a square card, matching the image */
          transition: all 0.7s ease-in-out;
        }

        .carousel .list .item img {
          width: 100%;
          height: 100%;
          object-fit: contain; 
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .carousel .list .item:nth-child(1) {
          transform: var(--item1-transform);
          filter: var(--item1-filter);
          z-index: var(--item1-zIndex);
          opacity: var(--item1-opacity);
          pointer-events: none;
        }

        .carousel .list .item:nth-child(2) {
          transform: var(--item2-transform);
          filter: var(--item2-filter);
          z-index: var(--item2-zIndex);
          opacity: var(--item2-opacity);
        }

        .carousel .list .item:nth-child(3) {
          transform: var(--item3-transform);
          filter: var(--item3-filter);
          z-index: var(--item3-zIndex);
          opacity: var(--item3-opacity);
        }

        .carousel .list .item:nth-child(4) {
          transform: var(--item4-transform);
          filter: var(--item4-filter);
          z-index: var(--item4-zIndex);
          opacity: var(--item4-opacity);
        }

        .carousel .list .item:nth-child(5) {
          transform: var(--item5-transform);
          filter: var(--item5-filter);
          opacity: var(--item5-opacity);
          pointer-events: none;
        }
        
        .carousel .list .item:nth-child(n + 6) {
            opacity: 0;
            pointer-events: none;
            transform: translate(150%, 40%) scale(0);
        }

        .carousel.next .list .item:nth-child(1) { animation: transformFromPosition2 0.5s ease-in-out 1 forwards; }
        .carousel.next .list .item:nth-child(2) { animation: transformFromPosition3 0.7s ease-in-out 1 forwards; }
        .carousel.next .list .item:nth-child(3) { animation: transformFromPosition4 0.9s ease-in-out 1 forwards; }
        .carousel.next .list .item:nth-child(4) { animation: transformFromPosition5 1.1s ease-in-out 1 forwards; }

        .carousel.prev .list .item:nth-child(2) { animation: transformFromPosition1 1.1s ease-in-out 1 forwards; }
        .carousel.prev .list .item:nth-child(3) { animation: transformFromPosition2 0.9s ease-in-out 1 forwards; }
        .carousel.prev .list .item:nth-child(4) { animation: transformFromPosition3 0.7s ease-in-out 1 forwards; }
        .carousel.prev .list .item:nth-child(5) { animation: transformFromPosition4 0.5s ease-in-out 1 forwards; }

        @keyframes transformFromPosition1 { from { transform: var(--item1-transform); filter: var(--item1-filter); opacity: var(--item1-opacity); } }
        @keyframes transformFromPosition2 { from { transform: var(--item2-transform); filter: var(--item2-filter); opacity: var(--item2-opacity); } }
        @keyframes transformFromPosition3 { from { transform: var(--item3-transform); filter: var(--item3-filter); opacity: var(--item3-opacity); } }
        @keyframes transformFromPosition4 { from { transform: var(--item4-transform); filter: var(--item4-filter); opacity: var(--item4-opacity); } }
        @keyframes transformFromPosition5 { from { transform: var(--item5-transform); filter: var(--item5-filter); opacity: var(--item5-opacity); } }

        .arrows {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          box-sizing: border-box;
          z-index: 20;
        }

        .arrows button {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-family: monospace;
          border: 2px solid rgba(255, 255, 255, 0.7);
          font-size: 24px;
          font-weight: bold;
          color: #fff;
          background: rgba(0, 0, 0, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .arrows button:hover {
            background: rgba(0, 0, 0, 0.7);
            transform: scale(1.1);
        }

        .carousel::before {
          width: 1000px;
          height: 300px;
          content: '';
          background-image: var(--bg-gradient-light);
          position: absolute;
          z-index: -1;
          border-radius: 20% 30% 80% 10%;
          filter: blur(200px);
          top: 50%;
          left: 50%;
          transform: translate(-30%, 10%);
          transition: background-image 1s;
        }
        
        @media (prefers-color-scheme: dark) {
          body { background-color: #121212; color: #eee; }
          .horizontal-roadmap-title-container h1 { color: #eee; }
          .carousel::before { background-image: var(--bg-gradient-dark); }
        }

        @media screen and (max-width: 1024px) {
          .carousel { height: 400px; /* Adjusted height */ }
        }

        @media screen and (max-width: 768px) {
          .horizontal-roadmap-title-container h1 { font-size: 2rem; }
          .carousel { height: 320px; /* Adjusted height */ }
          .arrows button { width: 40px; height: 40px; font-size: 20px; }
        }

        @media screen and (max-width: 480px) {
          :root {
            --item3-transform: translate(40%, 10%) scale(0.7);
            --item4-transform: translate(70%, 20%) scale(0.4);
          }
          .horizontal-roadmap-title-container h1 { font-size: 1.5rem; }
          .carousel { height: 250px; /* Adjusted height */ }
        }
      `}</style>
      <div className="nft-slider-container">
        <div className="horizontal-roadmap-title-container">
          <h1>Our NFTS ARTS</h1>
        </div>
        <div className={`carousel ${direction}`} ref={carouselRef}>
          <div className="list">
            {items.map((src, index) => (
              <div className="item" key={src + index}> {/* Using a more robust key */}
                <img
                  src={src}
                  alt={`NFT artwork ${index + 1}`}
                  onError={(e) => {
                    // Fallback in case an image fails to load
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400/EEE/31343C?text=Image+Not+Found";
                  }}
                />
              </div>
            ))}
          </div>
          <div className="arrows">
            <button id="prev" onClick={handlePrevClick}>&lt;</button>
            <button id="next" onClick={handleNextClick}>&gt;</button>
          </div>
        </div>
      </div>
    </>
  );
};
