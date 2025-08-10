import React, { useEffect, useState, useRef, useCallback } from 'react';

// --- Info Component (Refactored & Enhanced) ---
const Info = () => {
    const [activeItem, setActiveItem] = useState('1');
    const [isExpanded, setIsExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);

    const autoPlayIntervalRef = useRef(null);
    const userInteractedRef = useRef(false);
    const textRef = useRef(null); // Ref for the text paragraph

    const timelineItems = [
        { id: '1', type: 'a', title: 'The INTRO' },
        { id: '2', type: 'b', title: 'Why MONAD?' },
        { id: '3', type: 'c', title: 'Why OCTONADS?' },
    ];

    const contentData = {
        '1': {
            title: 'The Origin of OCTONADS',
            text: "He was a simple man—gentle, in love, but powerless. Life took everything: his money, his pride, his girl. “You’re too weak,” she said—and left. Broken, he sailed into the ocean, ready to disappear forever. But as he sank into the depths, something ancient found him—an octopus from the abyss, wise and powerful. Touched by his pain, the creature merged with him, fusing its strength and mind into his soul. When he returned to the surface, he wasn’t a man anymore. He was OctoNad—a reborn being of will and wisdom, wearing the octopus like a living mask. Now, he walks the world, awakening others who’ve lost it all—giving them the same gift. Not just NFTs",
            image: "https://coffee-impossible-bee-798.mypinata.cloud/ipfs/bafybeihcprz45pkgii7zfouepfmwreltdaxmeywi7dixmy4q3fgyp6sy4e",
            type: 'a'
        },
        '2': {
            title: 'WHY on MONAD ?',
            text: '• Low Fees: Monad’s sub-cent transaction fees make NFT minting and trading affordable.\n• High Speed: Supports 10,000 TPS with 1-second block times for fast NFT drops.\n• EVM Compatibility: Seamlessly integrates with Ethereum tools for easy NFT development.\n• Growing Community: Active NFT projects and events like Monad NFT Week boost visibility.\n• Early Adopter Perks: Potential whitelist spots and airdrops for early Monad NFT launches.',
            image: "https://coffee-impossible-bee-798.mypinata.cloud/ipfs/bafybeifpxtqi7nyy24mofog7p3v7pevyhqvkre3ducmxtx4s6dpk66g6ge",
            type: 'b'
        },
        '3': {
            title: 'WHY CHOOSE OCTONADS?',
            text: 'Our Vision : To create a globally recognized brand Web2 and Web3, delivering innovative products beyond a PFP collection. Our Mission is to Build a Vibrant Community, Reward Supporters & Believers throughout Time , and drive creativity in the digital landscape. Our Aim to Create an Innovative and Inspired profucts in Web2-Web3 just like Pudgy Penguins on Web2 and MadLads on Web3. We do have an expert team which can build & Manage things . So we are on a Mission to Make OctoLabs as a Brand (TBA). Join Us and Be part of a revolutionary brand shaping the future of digital ecosystems.',
            image: "https://coffee-impossible-bee-798.mypinata.cloud/ipfs/bafybeif52ofeabvdfjktzinpqi4sjp5jw653aungb7hxq5tzzrvjmi7ohi",
            type: 'c'
        },
    };

    // --- Core Functions ---
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
    
    const toggleReadMore = () => {
        stopAutoPlay();
        setIsExpanded(prev => !prev);
    };

    // --- Autoplay Effect ---
    useEffect(() => {
        const startAutoPlay = () => {
            stopAutoPlay(); 
            userInteractedRef.current = false;
            autoPlayIntervalRef.current = setInterval(() => {
                if (!userInteractedRef.current) {
                    setActiveItem(prev => {
                        const currentId = parseInt(prev, 10);
                        const nextId = (currentId % timelineItems.length) + 1;
                        return String(nextId);
                    });
                }
            }, 5000);
        };

        startAutoPlay();
        return () => clearInterval(autoPlayIntervalRef.current);
    }, [stopAutoPlay, timelineItems.length]);

    // --- Overflow Check Effect ---
    useEffect(() => {
        setIsExpanded(false);
        setShowReadMore(false);

        const timer = setTimeout(() => {
            if (textRef.current) {
                if (textRef.current.scrollHeight > textRef.current.clientHeight) {
                    setShowReadMore(true);
                }
            }
        }, 600); // Wait for content fade-in animation to complete

        return () => clearTimeout(timer);
    }, [activeItem]);


    return (
        <>
            <style>
                {`
                /* --- Base and Color Variables --- */
                :root {
                    --octonads-purple: #270c52ff;
                    --octonads-blue: #210d4fff;
                    --octonads-accent: #24044aff;
                    --text-primary: #EAE0FF;
                    --text-secondary: #2a105eff;
                    --bg-dark: #1f0a36;
                    --card-bg: rgba(255, 255, 255, 0.05);
                    --border-color: rgba(216, 116, 255, 1);
                    --btn-read-more-bg: rgba(234, 224, 255, 0.1);
                    --btn-read-more-hover-bg: rgba(234, 224, 255, 0.2);
                }
                .info-container * {
                    box-sizing: border-box;
                    font-family: 'Inter', sans-serif;
                }
                .info-wrap {
                    color: var(--text-primary);
                    max-width: 1200px;
                    padding: 80px 40px;
                    margin: 0 auto;
                }
                /* --- Timeline Navigation --- */
                .timeline-nav {
                    display: flex;
                    justify-content: center;
                    gap: 150px;
                    list-style: none;
                    margin: 0;
                    padding: 50px 0;
                }
                .timeline-item {
                    cursor: pointer;
                    text-align: center;
                    transition: transform 0.3s ease, filter 0.3s ease;
                    min-width: 150px;
                }
                .timeline-item:hover:not(.i-is-active) {
                    transform: translateY(-5px);
                }
                .timeline-item.i-is-active {
                    transform: scale(1.1);
                }
            
                .timeline-item.i-is-active .timeline-date { color: #d8b4fe; }
                .timeline-block {
                    width: 55px; height: 55px;
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
                    background-color: var(--octonads-purple);
                }
                /* --- Timeline Content Area --- */
                .timeline-content-container {
                    position: relative;
                    min-height: 550px;
                    margin-top: 40px;
                }
                .timeline-content {
                    width: 100%;
                    position: absolute;
                    top: 0; left: 0;
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
                }
                .timeline-content-image {
                    flex: 1.2;
                    /* FIX: Constrain the image container's width */
                    max-width: 500px; 
                    margin: 0 auto; /* Center the container */
                }
                .timeline-content-image img {
                    width: 100%; 
                    height: auto;
                    border-radius: 12px;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                }
                /* --- Card Content & Read More Logic --- */
                .timeline-content-card {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-self: stretch;
                }
                .timeline-content-title {
                    font-size: clamp(1.8rem, 4vw, 2.5rem);
                    font-weight: 800;
                    margin-bottom: 20px;
                    line-height: 1.2;
                    color: #d8b4fe;
                }
                .timeline-content-text {
                    max-height: 180px; /* FIXED HEIGHT for text block */
                    overflow: hidden; /* Hide overflow */
                    font-size: 1.1em;
                    line-height: 1.7;
                    font-weight: 300;
                    flex-grow: 1;
                    padding-right: 5px; /* Space for scrollbar */
                    white-space: pre-wrap; /* Respect newlines in text */
                    margin: 0 0 20px 0;
                }
                .timeline-content-text.expanded {
                    overflow-y: auto; /* Enable scrolling on expand */
                }
                /* Custom scrollbar for expanded text */
                .timeline-content-text.expanded::-webkit-scrollbar {
                    width: 6px;
                }
                .timeline-content-text.expanded::-webkit-scrollbar-thumb {
                    background: var(--octonads-purple);
                    border-radius: 3px;
                }
                .timeline-content-text.expanded::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.2);
                }
                /* --- Action Buttons --- */
                .card-actions {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                    margin-top: auto; /* Pushes buttons to the bottom */
                }
                .read-more-btn {
                    padding: 10px 20px;
                    background: var(--btn-read-more-bg);
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.9em;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }
                .read-more-btn:hover {
                    background: var(--btn-read-more-hover-bg);
                    transform: translateY(-2px);
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
                    .content-inner { flex-direction: column; }
                    .timeline-content-container { min-height: 700px; }
                    .timeline-content-text { max-height: 150px; }
                    .card-actions { justify-content: center; }
                }
                @media screen and (max-width: 768px) {
                    .info-wrap { padding: 40px 15px; }
                    .timeline-nav { gap: 40px; }
                    .timeline-content-text { max-height: 120px; font-size: 1em; }
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
                                    className={`timeline-item ${activeItem === item.id ? 'i-is-active' : ''}`}
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
                                const isCurrent = activeItem === item.id;
                                return (
                                    <div key={item.id} className={`timeline-content ${isCurrent ? 'i-is-active' : ''}`}>
                                        <div className="content-inner">
                                            <div className="timeline-content-image">
                                                <img src={content.image} alt={content.title} />
                                            </div>
                                            <div className="timeline-content-card">
                                                <h3 className="timeline-content-title">{content.title}</h3>
                                                
                                                <p 
                                                    ref={isCurrent ? textRef : null}
                                                    className={`timeline-content-text ${isExpanded ? 'expanded' : ''}`}
                                                >
                                                    {content.text}
                                                </p>

                                                <div className="card-actions">
                                                    {isCurrent && showReadMore && (
                                                        <button className="read-more-btn" onClick={toggleReadMore}>
                                                            {isExpanded ? 'Read Less' : 'Read More'}
                                                        </button>
                                                    )}
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