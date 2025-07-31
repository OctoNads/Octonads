import React, { useState, useEffect } from 'react';

// Main TestnetNft component
const TestnetNft = () => {
    // Video link provided for the NFT card preview
    const videoLink = "https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafybeibkouzjyfrbdty6ri5g6yfktvixgha4uv5wmjcb6f5cjx2pvqmtny";

    // Array of photo links for the supporters section
    const photos = [
        'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreie6flybql6vdxko642ek745v5eefpgyyzdzn7a4xnsjshjcu3yek4',
        'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreiahbzseascjjpk65mxabet4uajhpems3bek3iaxvk4us27lrmgfye',
        'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreifnjqbzduwnrjzwi2b6fz2shx5p46zqh54w4sry5ouarfgbgfviiy',
        'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreifeia3zulet2quvxhwlyyze4mlwzce65ul2quuad7apb7h5hjxuxa',
        'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreicgp5ucpeebqvcdtg62q4gambadpxo7k4valcvyayrkdm47noopa4',
        'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreieodm24tzxx4szfwwsw2prpx4vmqoirh4dylrzaoynhzysheynpny',
        'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreic5md2cobtysgxoyuy7umpqbkbqsg6yuqujuhrhx5pgt4d2bqwpnu',
        'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreicn27ufwt7gh4dfj3hdbyhs37fp4oy7udem6uftit26bcvsk26jre',
        'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreieqaxaucupwvpeeprnbuvgkcixo7y75blutlrs6ljosau3fauxrfa',
        'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreiadbtiyuh4a7ljkd2vmvg6iy6o3jdiqi5dqhc2jukagv3vf5viuoq', 'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreighdoeyibk7aj4n7zk4ex4vuds2wan6fve5nenh6vni73wpaqoafq', 'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreibcukmtjtcxj4wbb4qveticvomwmhby5nb2hp4r4q4e4nwknzoewq', 'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreibn6djjx3trdaarhsu2rdgxb3yclc2lzhdsljyzt3yxur2uryhmaq', 'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreiexnira2m6kp2i2jc3qhcxtp3jztd55mnyw7ecigeuyyh4wzs2vza', 'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreicbfkq5wm7lgyqyt75kpkclpnggo2emqfjxcmcpf3xkqbzmirg5tu', 'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreieh4qotmqx7z4rurc45h56xbv5xmkff767wsjb6klypnj3fhlijja', 'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreia5qebgz2aukeknxe6eltq47xhfukzg4qnowutupwmctky7muneua', 'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreigf6uyc4azra4px54t4ob3iaszz2zfeobxruc7ktzbo2wbd2rg37e', 'https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreigf6uyc4azra4px54t4ob3iaszz2zfeobxruc7ktzbo2wbd2rg37e',
    ];

    // State declarations
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [shuffledPhotos, setShuffledPhotos] = useState([]);
    const [loadingVideo, setLoadingVideo] = useState(true);
    const [videoError, setVideoError] = useState('');

    // useEffect to shuffle and style photos on mount
    useEffect(() => {
        const randomizedPhotos = photos.map(url => ({
            url,
            maxWidth: `${Math.floor(Math.random() * (45 - 25 + 1)) + 25}%`,
            maxHeight: `${Math.floor(Math.random() * (45 - 25 + 1)) + 25}%`,
            rotation: `rotate(${Math.floor(Math.random() * 31) - 15}deg)`,
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 70}%`,
            zIndex: Math.floor(Math.random() * 10),
        })).sort(() => Math.random() - 0.5);
        setShuffledPhotos(randomizedPhotos);
    }, []);

    // Modal control functions
    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage('');
    };

    // Video handlers
    const handleVideoLoaded = () => setLoadingVideo(false);
    const handleVideoError = () => {
        setLoadingVideo(false);
        setVideoError('Unable to load video. The link might be broken or unavailable.');
    };

    return (
        <div className="main-container">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');

                .main-container {
                    min-height: 100vh;
                    font-family: 'Inter', sans-serif;
                    color: #4b5563;
                    padding: 1.5rem;
                    position: relative;
                    overflow: hidden;
                }

                @media (min-width: 640px) {
                    .main-container { padding: 2.5rem; }
                }

                @keyframes pop-in {
                    from { opacity: 0; transform: scale(0.8) rotate(0deg); }
                    to { opacity: 1; transform: scale(1) rotate(var(--rotate, 0deg)); }
                }

                @keyframes scale-in {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .content-card {
                    position: relative;
                    z-index: 10;
                    max-width: 72rem;
                    margin-left: auto;
                    margin-right: auto;
                    border-radius: 1.5rem;
                    padding: 1.5rem;
                    transition: all 0.5s ease-in-out;
                }

                @media (min-width: 640px) {
                    .content-card { padding: 2.5rem; }
                }

                .content-card:hover { transform: scale(1.01); }

                .main-heading {
                    font-size: 2.25rem;
                    font-weight: 800;
                    text-align: center;
                    margin-bottom: 2.5rem;
                    color: #7c3aed;
                    filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.25));
                    text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
                    animation: fade-in-down 0.8s ease-out forwards;
                }

                @media (min-width: 640px) { .main-heading { font-size: 3rem; } }
                @media (min-width: 768px) { .main-heading { font-size: 3.75rem; } }

                .nft-section {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    margin-bottom: 2rem;
                    align-items: stretch;
                }

                @media (min-width: 768px) { .nft-section { flex-direction: row; } }

                .nft-details-card, .nft-video-card {
                    width: 100%;
                    padding: 2rem;
                    border-radius: 1rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    border: 4px solid;
                    transition: all 0.3s ease-in-out;
                }

                .nft-details-card {
                    background-color: #bfdbfe;
                    border-color: #60a5fa;
                    animation: fade-in-left 0.8s ease-out forwards;
                }

                .nft-video-card {
                    background-color: #fecaca;
                    border-color: #f472b6;
                    animation: fade-in-right 0.8s ease-out forwards;
                }

                .nft-details-card:hover, .nft-video-card:hover {
                    transform: scale(1.02);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }

                @media (min-width: 768px) {
                    .nft-details-card, .nft-video-card { width: 50%; }
                    .nft-video-card { padding: 1rem; }
                }

                .nft-details-heading {
                    font-size: 1.875rem;
                    font-weight: 700;
                    color: #1e40af;
                    margin-bottom: 1.5rem;
                    border-bottom: 2px solid #60a5fa;
                    padding-bottom: 0.5rem;
                }

                .nft-details-item {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    font-size: 1.125rem;
                    line-height: 1.75rem;
                }
                .nft-details-item + .nft-details-item { margin-top: 1rem; }

                @media (min-width: 640px) {
                    .nft-details-item { flex-direction: row; align-items: center; }
                }

                .nft-details-label {
                    font-weight: 600;
                    color: #1d4ed8;
                    width: 100%;
                    min-width: 90px;
                }

                @media (min-width: 640px) { .nft-details-label { width: 6rem; } }

                .nft-details-value { color: #1f2937; }

                .nft-video-heading {
                    font-size: 1.875rem;
                    font-weight: 700;
                    color: #9d174d;
                    margin-bottom: 1rem;
                    border-bottom: 2px solid #f472b6;
                    padding-bottom: 0.5rem;
                    text-align: center;
                }

                .video-container {
                    position: relative;
                    padding-top: 56.25%;
                    width: 100%;
                    border-radius: 0.75rem;
                    overflow: hidden;
                    background-color: #e5e7eb;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .video-player {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    border: 2px solid #ec4899;
                    transition: opacity 0.3s ease-in-out;
                }

                .video-loader, .video-error {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: rgba(55, 65, 81, 0.7);
                    color: #fff;
                    flex-direction: column;
                }

                .video-error {
                    background-color: rgba(220, 38, 38, 0.7);
                    padding: 1rem;
                    text-align: center;
                }

                .spinner {
                    border: 4px solid #e0e0e0;
                    border-top: 4px solid transparent;
                    border-radius: 50%;
                    width: 3rem;
                    height: 3rem;
                    animation: spin 1s linear infinite;
                }

                .buy-button {
                    display: block;
                    width: fit-content;
                    margin: 2rem auto 4rem auto;
                    background-color: #8b5cf6;
                    color: white;
                    font-weight: 700;
                    padding: 1rem 2rem;
                    border-radius: 0.75rem;
                    text-decoration: none;
                    transition: all 0.3s ease-in-out;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    border: 3px solid #6d28d9;
                    cursor: pointer;
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                .buy-button:hover {
                    background-color: #7c3aed;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }

                .separator {
                    margin-top: 4rem;
                    margin-bottom: 4rem;
                    border-top: 4px dashed #d1d5db;
                }

                .supporters-heading {
                    font-size: 2.25rem;
                    font-weight: 800;
                    text-align: center;
                    margin-bottom: 2.5rem;
                    color: #7c3aed;
                    filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.25));
                    text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                @media (min-width: 640px) { .supporters-heading { font-size: 3rem; } }

                .photo-grid {
                    position: relative;
                    width: 100%;
                    padding: 1rem;
                    background-color: #fef9c3;
                    border-radius: 1.5rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    border: 4px solid #fde047;
                    overflow: hidden;
                    min-height: 500px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                @media (min-width: 640px) { .photo-grid { min-height: 300px; } }
                @media (min-width: 768px) { .photo-grid { min-height: 350px; } }

                .photo-item {
                    position: absolute;
                    cursor: pointer;
                    border-radius: 0.75rem;
                    overflow: hidden;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    transition: all 0.3s ease-in-out;
                    animation: pop-in 0.5s ease-out forwards;
                    --rotate: 0deg;
                    max-width: var(--max-width);
                    max-height: var(--max-height);
                }

                .photo-item:hover {
                    transform: scale(1.1);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    z-index: 20;
                }

                .photo-item img {
                    width: auto;
                    height: auto;
                    max-width: 100%;
                    max-height: 100%;
                    display: block;
                    object-fit: contain;
                    transition: transform 0.3s ease-in-out;
                }

                .photo-item:hover img { transform: scale(1.05); }

                .photo-overlay {
                    position: absolute;
                    inset: 0;
                    background-color: rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                }

                .photo-item:hover .photo-overlay { opacity: 1; }

                .photo-overlay span {
                    color: #fff;
                    font-size: 1.125rem;
                    font-weight: 700;
                }

                .modal-overlay {
                    position: absolute; /* Changed from fixed to absolute */
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0; /* Stretches to fill the photo-grid */
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 50;
                    padding: 1rem;
                    animation: fade-in 0.3s ease-out forwards;
                }

                .modal-content {
                    position: relative;
                    background-color: #fff;
                    padding: 1.5rem;
                    border-radius: 1rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    max-width: 48rem;
                    max-height: 90vh;
                    overflow: auto;
                    transform: scale(0.95);
                    opacity: 0;
                    animation: scale-in 0.3s ease-out forwards;
                }

                .modal-close-button {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background-color: #ef4444;
                    color: #fff;
                    border-radius: 9999px;
                    padding: 0.5rem;
                    font-size: 1.25rem;
                    font-weight: 700;
                    cursor: pointer;
                    border: none;
                    transition: background-color 0.2s ease-in-out;
                    z-index: 10;
                }

                .modal-close-button:hover { background-color: #dc2626; }

                .modal-image {
                    max-width: 100%;
                    max-height: calc(90vh - 80px);
                    object-fit: contain;
                    border-radius: 0.75rem;
                    border: 4px solid #a78bfa;
                }
                `}
            </style>

            <div className="absolute top-0 left-0 w-full h-full pointer-events nutri-none">
                <div className="bg-element bg-element-yellow"></div>
                <div className="bg-element bg-element-green"></div>
                <div className="bg-element bg-element-blue"></div>
                <div className="bg-element bg-element-red"></div>
            </div>

            <div className="content-card">
                <h1 className="main-heading">Our Monad Testnet NFT Card</h1>

                <div className="nft-section">
                    <div className="nft-details-card">
                        <h2 className="nft-details-heading">NFT Details</h2>
                        <div>
                            <p className="nft-details-item">
                                <span className="nft-details-label">Name:</span>
                                <span className="nft-details-value">OCTONADS OCTOG PASS NFT</span>
                            </p>
                            <p className="nft-details-item">
                                <span className="nft-details-label">Supply:</span>
                                <span className="nft-details-value">999 Units </span>
                            </p>
                            <p className="nft-details-item">
                                <span className="nft-details-label">Purpose:</span>
                                <span className="nft-details-value"> Access to a First mint (PHASE) for our Mainnet NFT Mint (FCFS).</span>
                            </p>
                        </div>
                    </div>

                    <div className="nft-video-card">
                        <h2 className="nft-video-heading">Our OCTOG PASS</h2>
                        <div className="video-container">
                            {loadingVideo && !videoError && (
                                <div className="video-loader">
                                    <div className="spinner"></div>
                                    <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Loading video...</p>
                                </div>
                            )}
                            {videoError && (
                                <div className="video-error">
                                    <p>{videoError}</p>
                                </div>
                            )}
                            {!videoError && (
                                <video
                                    src={videoLink}
                                    controls
                                    loop
                                    muted
                                    autoPlay
                                    className="video-player"
                                    style={{ opacity: loadingVideo ? '0' : '1' }}
                                    onLoadedData={handleVideoLoaded}
                                    onError={handleVideoError}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    </div>
                </div>

                <a href="https://magiceden.io/collections/monad-testnet/0xce49fc8ad0618931265a7cc6d859649af92a9d03?activeTab=items" target="_blank" rel="noopener noreferrer" className="buy-button">
                    Buy OCTOG PASS Now!
                </a>

                <hr className="separator" />

                <h2 className="supporters-heading">Our Supporters and Feedbacks</h2>

                <div className="photo-grid">
                    {shuffledPhotos.map((photo, index) => (
                        <div
                            key={index}
                            className="photo-item"
                            style={{
                                top: photo.top,
                                left: photo.left,
                                transform: photo.rotation,
                                zIndex: photo.zIndex,
                                animationDelay: `${index * 0.05}s`,
                                '--rotate': photo.rotation,
                                '--max-width': photo.maxWidth,
                                '--max-height': photo.maxHeight,
                            }}
                            onClick={() => openModal(photo.url)}
                        >
                            <img
                                src={photo.url}
                                alt={`Supporter ${index + 1}`}
                                onError={(e) => {
                                    const parentWidth = parseInt(photo.maxWidth.replace('%', ''));
                                    const parentHeight = parseInt(photo.maxHeight.replace('%', ''));
                                    e.target.src = `https://placehold.co/${parentWidth * 4}x${parentHeight * 4}/888888/FFFFFF?text=Error`;
                                }}
                            />
                            <div className="photo-overlay">
                                <span>View</span>
                            </div>
                        </div>
                    ))}
                    {/* Modal moved inside photo-grid */}
                    {modalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <button
                                    className="modal-close-button"
                                    onClick={closeModal}
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                                <img
                                    src={selectedImage}
                                    alt="Full size"
                                    className="modal-image"
                                    onError={(e) => { e.target.src = 'https://placehold.co/800x600/FF0000/FFFFFF?text=Image+Load+Error'; }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestnetNft;