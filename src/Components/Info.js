import React, { useEffect, useState, useRef, useCallback } from 'react';

// --- Info Component (Refactored & Enhanced) ---
const Info = () => {
    const [activeItem, setActiveItem] = useState('1');
    const autoPlayIntervalRef = useRef(null);
    const userInteractedRef = useRef(false);

    const timelineItems = [
        { id: '1', type: 'a', title: 'The INTRO', carModel: '*' },
        { id: '2', type: 'b', title: 'The VISION', carModel: '*' },
        { id: '3', type: 'a', title: 'Why MONAD?', carModel: '*' },
        { id: '4', type: 'b', title: 'Why OCTONADS?', carModel: '*' },
    ];

    const contentData = {
        '1': {
            title: 'INTRODUCTION TO OCTONADS',
            date: 'Launch: January 1, 2024',
            text: "Welcome to OCTONADS, a revolutionary NFT project designed to push the boundaries of digital ownership and community engagement. We're building a unique ecosystem where art, technology, and community converge to create unparalleled value and experiences.",
            image: "https://placehold.co/600x400/360c52/FFFFFF?text=OCTONADS+Intro",
            type: 'a'
        },
        '2': {
            title: 'OUR VISION FOR THE FUTURE',
            date: 'Vision Unveiled: February 1, 2024',
            text: 'Our vision extends beyond typical NFTs. We aim to create a decentralized autonomous organization (DAO) that empowers holders with real governance over project development, future artistic endeavors, and community-driven initiatives.',
            image: "https://placehold.co/600x400/420d4f/FFFFFF?text=OCTONADS+Vision",
            type: 'b'
        },
        '3': {
            title: 'THE POWER OF MONAD',
            date: 'Monad Integration: March 1, 2024',
            text: 'Monad represents a core philosophical and technical principle within OCTONADS. It signifies unity, individuality, and the foundational elements from which complex systems emerge. This concept underpins our unique smart contract architecture.',
            image: "https://placehold.co/600x400/360c52/FFFFFF?text=Why+Monad%3F",
            type: 'a'
        },
        '4': {
            title: 'WHY CHOOSE OCTONADS?',
            date: 'Our Value Proposition: April 1, 2024',
            text: 'OCTONADS offers exclusive access to future collections, metaverse experiences, and a vibrant, engaged community. Beyond digital art, we are building a brand that provides long-term utility and a strong sense of belonging for our holders.',
            image: "https://placehold.co/600x400/420d4f/FFFFFF?text=Why+OCTONADS%3F",
            type: 'b'
        },
    };

    const stopAutoPlay = useCallback(() => {
        userInteractedRef.current = true;
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
        }
    }, []);

    const handleItemClick = (itemId) => {
        stopAutoPlay();
        setActiveItem(itemId);
    };

    const handleNext = useCallback(() => {
        stopAutoPlay();
        const currentId = parseInt(activeItem, 10);
        const nextId = (currentId % timelineItems.length) + 1;
        setActiveItem(String(nextId));
    }, [activeItem, stopAutoPlay, timelineItems.length]);

    useEffect(() => {
        const startAutoPlay = () => {
            stopAutoPlay(); // Clear any existing interval
            userInteractedRef.current = false;
            autoPlayIntervalRef.current = setInterval(() => {
                if (!userInteractedRef.current) {
                    setActiveItem(prev => {
                        const currentId = parseInt(prev, 10);
                        const nextId = (currentId % timelineItems.length) + 1;
                        return String(nextId);
                    });
                }
            }, 5000); // Change slide every 5 seconds
        };

        startAutoPlay();

        return () => {
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
            }
        };
    }, [stopAutoPlay, timelineItems.length]);


    return (
        <>
            <style>
                {`
                /* --- Base and Color Variables --- */
                :root {
                    --octonads-purple: #360c52;
                    --octonads-blue: #420d4f;
                    --octonads-accent: #e9b2ff;
                    --text-primary: #EAE0FF;
                    --text-secondary: #C5A8FF;
                    --bg-dark: #1f0a36;
                    --card-bg: rgba(255, 255, 255, 0.05);
                    --border-color: rgba(233, 178, 255, 0.2);
                }

                /* --- Global Styles --- */
                .info-container * {
                    box-sizing: border-box;
                    font-family: 'Inter', sans-serif;
                }

                /* --- Main Wrapper --- */
                .info-wrap {
                    color: var(--text-primary);
                    font-size: 16px;
                    line-height: 1.6;
                    max-width: 1200px;
                    padding: 80px 40px;
                    margin: 0 auto;
                    position: relative;
                }

                .content {
                    position: relative;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 20vh;
                    overflow: hidden;
                }

                /* --- Timeline Navigation --- */
                .timeline-wrap {
                    position: relative;
                    padding: 0 20px;
                }
                .timeline-nav {
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    background-image: linear-gradient(90deg, var(--border-color) 50%, transparent 0);
                    background-size: 20px 2px;
                    background-position: center;
                    background-repeat: repeat-x;
                    padding: 50px 0;
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    list-style: none;
                    margin: 0;
                }
                .timeline-nav::-webkit-scrollbar { display: none; } /* Hide scrollbar */
                
                .timeline-item {
                    cursor: pointer;
                    text-align: center;
                    transition: transform 0.3s ease, filter 0.3s ease;
                    min-width: 150px;
                }
                
                .timeline-item:hover:not(.i-is-active) {
                    transform: translateY(-5px);
                    filter: grayscale(0%) brightness(1);
                }
                .timeline-item.i-is-active {
                    transform: scale(1.1);
                }
                .timeline-date {
                    font-weight: 700;
                    font-size: 1.1em;
                    color: var(--text-primary);
                    margin-bottom: 10px;
                    transition: color 0.3s ease;
                }
                .timeline-item.type-a.i-is-active .timeline-date, .timeline-item.type-a:hover .timeline-date { color: #d8b4fe; }
                .timeline-item.type-b.i-is-active .timeline-date, .timeline-item.type-b:hover .timeline-date { color: #a5b4fc; }
                
                .timeline-block {
                    width: 55px;
                    height: 55px;
                    border: 2px solid var(--border-color);
                    border-radius: 50%;
                    background-color: var(--card-bg);
                    margin: 0 auto;
                    transition: all 0.4s ease;
                    box-shadow: 0 0 15px rgba(0,0,0,0.2);
                }
                .timeline-item.i-is-active .timeline-block {
                    transform: scale(1.2);
                    box-shadow: 0 0 25px var(--border-color);
                }
                .timeline-item.type-a.i-is-active .timeline-block, .timeline-item.type-a:hover .timeline-block { background-color: var(--octonads-purple); }
                .timeline-item.type-b.i-is-active .timeline-block, .timeline-item.type-b:hover .timeline-block { background-color: var(--octonads-blue); }

                /* --- Timeline Content Area --- */
                .timeline-content-container {
                    position: relative;
                    min-height: 550px; /* Allocate space to prevent layout shift */
                    margin-top: 40px;
                }
                .timeline-content {
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    visibility: hidden;
                    opacity: 0;
                    transform: translateY(20px) scale(0.98);
                    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .timeline-content.i-is-active {
                    visibility: visible;
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                .content-inner {
                    display: flex;
                    gap: 40px;
                    align-items: center;
                    padding: 20px;
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                
                .timeline-content-image { flex: 1.2; }
                .timeline-content-image img {
                    width: 100%;
                    height: auto;
                    border-radius: 12px;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                }

                .timeline-content-card { flex: 1; }
                .timeline-content-title {
                    font-size: clamp(1.8rem, 4vw, 2.5rem);
                    font-weight: 800;
                    margin-bottom: 10px;
                    line-height: 1.2;
                }
                .timeline-content-title.type-a { color: #d8b4fe; }
                .timeline-content-title.type-b { color: #a5b4fc; }

                .timeline-content-date {
                    font-size: 1em;
                    font-style: italic;
                    color: var(--text-secondary);
                    margin-bottom: 20px;
                    display: block;
                }
                .timeline-content-text {
                    font-size: 1.1em;
                    line-height: 1.7;
                    font-weight: 300;
                }

                .next-button-container {
                    margin-top: 30px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .next-page-btn {
                    padding: 12px 30px;
                    background-image: linear-gradient(to right, var(--octonads-purple), var(--octonads-blue));
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1em;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }
                .next-page-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
                    filter: brightness(1.1);
                }

                /* --- Responsive Design --- */
                @media screen and (max-width: 1024px) {
                    .info-wrap { padding: 60px 20px; }
                    .content-inner {
                        flex-direction: column;
                    }
                    .timeline-content-image { order: 1; }
                    .timeline-content-card { order: 2; text-align: center; }
                    .timeline-content-container { min-height: 700px; }
                }

                @media screen and (max-width: 768px) {
                    .info-wrap { padding: 40px 15px; }
                    .timeline-nav { gap: 20px; }
                    .timeline-item { min-width: 120px; }
                    .timeline-block { width: 45px; height: 45px; }
                    .timeline-date { font-size: 1em; }
                    .timeline-content-container { min-height: 650px; }
                    .timeline-content-title { font-size: 1.8rem; }
                    .timeline-content-text { font-size: 1em; }
                }
                `}
            </style>
            <div className="info-container" id="info-section">
                <div className="info-wrap">
                    <div className="horizontal-roadmap-title-container">
                        <h1>ABOUT US</h1>
                    </div>
                    <div className="timeline-wrap">
                        <ul className="timeline-nav">
                            {timelineItems.map(item => (
                                <li
                                    key={item.id}
                                    className={`timeline-item type-${item.type} ${activeItem === item.id ? 'i-is-active' : ''}`}
                                    onClick={() => handleItemClick(item.id)}
                                >
                                    <div className="timeline-date">{item.title}</div>
                                    <div className="timeline-block"></div>
                                </li>
                            ))}
                        </ul>

                        <div className="timeline-content-container">
                            {timelineItems.map(item => {
                                const content = contentData[item.id];
                                return (
                                    <div key={item.id} className={`timeline-content ${activeItem === item.id ? 'i-is-active' : ''}`}>
                                        <div className="content-inner">
                                            <div className="timeline-content-image">
                                                <img src={content.image} alt={content.title} />
                                            </div>
                                            <div className="timeline-content-card">
                                                <h3 className={`timeline-content-title type-${content.type}`}>{content.title}</h3>
                                                <time className="timeline-content-date">{content.date}</time>
                                                <p className="timeline-content-text">{content.text}</p>
                                                <div className="next-button-container">
                                                    <button className="next-page-btn" onClick={handleNext}>Next</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Info;