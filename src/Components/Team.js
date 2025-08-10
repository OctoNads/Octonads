import React, { useState } from 'react';
import './Team.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function Team() {
    const [showAlert, setShowAlert] = useState(false);
    const [discordID, setDiscordID] = useState('');

    const teamData = [
        {
            name: "Mike (Founder)",
            image: "https://chocolate-negative-toad-428.mypinata.cloud/ipfs/bafybeihamqi3s4ck5mjyq6n3w53o3htb2v46ccx7zeragtixwvskrez534",
            description: "Mike Is a Professional Software Devloper Working in MNCs",
            twitter: "https://x.com/Mike__Nad",
            discord: "octo_mike"
        },
        {
            name: "Flork (CTO)",
            image: "https://jade-defensive-platypus-709.mypinata.cloud/ipfs/bafybeihiqh2xbmzmjk3wry75ulq3y7pgsxvbw7ffwvgbdsjbhpvtjhnusa",
            description: "Flork is College dropout , been in crypto space from 2018. ",
            twitter: " https://x.com/Flork_Nad",
            discord: "flork_nad"
        },
        {
            name: "Cocrypt (Dev)",
            image: "https://jade-defensive-platypus-709.mypinata.cloud/ipfs/bafybeielxmveppc5p5fs4fxo3gnfdjsoaq2uvaeighdrbjb742gntwtkji",
            description: "Cocrypt is a full-stack developer with a strong background in backend technologies.",
            twitter: "https://x.com/cocrypt_",
            discord: "cocrypt"
        },
        {
            name: "Anina (Artist)",
            image: "https://jade-defensive-platypus-709.mypinata.cloud/ipfs/bafybeie3mkjlc4fdhjw5cfyikeii6s7ttv7w2xnfpqrttq3is3psvt4zp4",
            description: "Anina is Just an 13 year old girl Artist, His First art as NFt",
            twitter: "https://x.com/AninaNads",
            discord: "octo_anina"
        },
    ];

   const copyToClipboard = (discordID) => {
    navigator.clipboard.writeText(discordID).then(() => {
      setDiscordID(discordID);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <>
      <div className="container">
        {showAlert && (
          <div className="alert alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Copied Discord ID: {discordID}
            <span className="close" onClick={() => setShowAlert(false)}>×</span>
          </div>
        )}
        <div className="content">
          <h1>OUR TEAM</h1>
          <h1>OUR TEAM</h1>
        </div>
        <ul className="cards">
          {teamData.map((member, index) => (
            <li key={index} className="card-item" style={{ '--index': index }}>
              <div className="card">
                <div className="social-icons">
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter social-icon" aria-label="Twitter"></i>
                  </a>
                  <button
                    onClick={() => copyToClipboard(member.discord)}
                    className="social-icon-button"
                    aria-label="Copy Discord ID"
                  >
                    <i className="fab fa-discord social-icon"></i>
                  </button>
                </div>
                <img src={member.image} className="card__image img-fluid" alt={member.name} />
                <div className="card__overlay">
                  <div className="card__header">
                    <img className="card__thumb img-fluid" src={member.image} alt={member.name} />
                    <div className="card__header-text">
                      <h3 className="card__title">{member.name}</h3>
                    </div>
                  </div>
                  <p className="card__description">{member.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}