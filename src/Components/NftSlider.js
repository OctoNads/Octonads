import React, { useEffect, useRef } from 'react';
import './NftSlider.css';

const NftSlider = () => {
  const carouselRef = useRef(null);
  const resumeTimeout = useRef(null);

  useEffect(() => {
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const carousel = carouselRef.current;
    const listHTML = carousel.querySelector('.list');

    let autoSlideInterval;

    const showSlider = (type) => {
      nextButton.style.pointerEvents = 'none';
      prevButton.style.pointerEvents = 'none';

      carousel.classList.remove('next', 'prev');
      let items = listHTML.querySelectorAll('.item');

      if (type === 'next') {
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
      } else {
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
      }

      clearTimeout(resumeTimeout.current);
      resumeTimeout.current = setTimeout(startAutoSlide, 5000);

      setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
      }, 1000);
    };

    const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => showSlider('next'), 2000);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };

    nextButton.onclick = () => {
      stopAutoSlide();
      showSlider('next');
    };

    prevButton.onclick = () => {
      stopAutoSlide();
      showSlider('prev');
    };

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();

    return () => {
      stopAutoSlide();
      if (resumeTimeout.current) {
        clearTimeout(resumeTimeout.current);
      }
      carousel.removeEventListener('mouseenter', stopAutoSlide);
      carousel.removeEventListener('mouseleave', startAutoSlide);
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="horizontal-roadmap-title-container">
          <h1>Our NFTS ARTS</h1>
        </div>
      <div className="list">
        <div className="item active">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeifvsnifsfvv5yertz2xanhvrntt3b4fewhnemqnjv6qv7cm7gkm6e"
            alt="NFT artwork 1"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeicgle26d3zqctamgwk2oxidqkpgr5wx35ufaedx4dy5u5pvnf2nh4"
            alt="NFT artwork 2"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeigfcbqx4cm3oonegj2jcaewcxgfo2qr5k23gqwraoykrvsqmjnt6i"
            alt="NFT artwork 3"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeib5npxhytmj64lmgxwivvyjxbjuntg7zh5y4ph6fk6w2tzdcibrem"
            alt="NFT artwork 4"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeielxmveppc5p5fs4fxo3gnfdjsoaq2uvaeighdrbjb742gntwtkji"
            alt="NFT artwork 5"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeihiqh2xbmzmjk3wry75ulq3y7pgsxvbw7ffwvgbdsjbhpvtjhnusa"
            alt="NFT artwork 6"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeidv5fm6c56w7nk3mj5un2ajh37npxjzdeinmn4lkrpba2od7lln5a"
            alt="NFT artwork 7"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeidenjrail4u2dqj4lm5ymgxlme55lbw3q6j2jt5ws4hgfsd5davnq"
            alt="NFT artwork 8"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeie3mkjlc4fdhjw5cfyikeii6s7ttv7w2xnfpqrttq3is3psvt4zp4"
            alt="NFT artwork 9"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeih3u7hfqcftrx3k34tx266nlg26jdztihcd65dbzqtvby527xuep4"
            alt="NFT artwork 10"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeibxnh3b7fynoh46kxsobadecl543xhezwkosfapqgb3gzwrrmcjcq"
            alt="NFT artwork 11"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeia4n5wtxkybfpx6ulf4azvzfux5j2iguzuyufggbm75lua4ut6dxe"
            alt="NFT artwork 12"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeihamqi3s4ck5mjyq6n3w53o3htb2v46ccx7zeragtixwvskrez534"
            alt="NFT artwork 13"
          />
        </div>
        <div className="item">
          <img
            src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeiha24qj57jphrly6mgplikdehyvu3a7b4dxx4kap724gfgss7ydfi"
            alt="NFT artwork 14"
          />
        </div>
       
      </div>
      <div className="arrows">
        <button id="prev" className="carousel-control"> &lt; </button>
        <button id="next" className="carousel-control"> &gt; </button>
      </div>
    </div>
  );
};

export default NftSlider;