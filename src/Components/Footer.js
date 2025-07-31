import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  const styleSheet = `
    /* Footer styles */
    .footer {
  
      color: #ffffff;
      padding: 1rem;
      border-top-left-radius: 0.75rem;
      border-top-right-radius: 0.75rem;
    }
    @media (min-width: 640px) {
      .footer {
        padding: 2rem 1.5rem;
      }
    }
    @media (min-width: 1024px) {
      .footer {
        padding: 2rem;
      }
    }

    /* Container styles */
    .footer-container {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    @media (min-width: 640px) {
      .footer-container {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    /* Logo section styles */
    .logo-section {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    @media (min-width: 640px) {
      .logo-section {
        margin-bottom: 0;
      }
    }
    .logo-image {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      transition: transform 0.3s ease-in-out;
    }
    .logo-image:hover {
      transform: scale(1.1);
    }

    /* Text section styles */
    .text-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 1.5rem;
    }
    @media (min-width: 640px) {
      .text-section {
        margin-bottom: 0;
      }
    }
    .powered-by {
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: #93C5FD;
      margin-bottom: 0.5rem;
      animation: subtle-pulse 3s infinite ease-in-out;
    }
    @media (min-width: 640px) {
      .powered-by {
        font-size: 1.125rem;
      }
    }
    .copyright {
      font-size: 0.75rem;
      color: #9CA3AF;
      transition: text-shadow 0.3s ease-in-out;
    }
    .copyright:hover {
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
    }

    /* Social section styles */
    .social-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .social-link {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: transform 0.3s ease-in-out;
    }
    .social-link:hover {
      transform: scale(1.1);
    }
    .social-logo {
      font-size: 1.5rem;
      color: #ffffff;
      filter: grayscale(100%);
      transition: filter 0.3s ease-in-out;
    }
    .social-link:hover .social-logo {
      filter: grayscale(0%);
    }

    /* Animation keyframes */
    @keyframes subtle-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
  `;

  return (
    <footer className="footer">
      <style>{styleSheet}</style>
      <div className="footer-container">
        {/* Logo Section */}
        <div className="logo-section">
          <a href="#">
            <img
              src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreiguhll5qwfac6x36v362nv2mhgl7so45dd262zpulwq7c4tfwbedq"
              alt="Company Logo"
              className="logo-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/48x48/555/FFF?text=ERR';
              }}
            />
          </a>
        </div>

        {/* Text Section */}
        <div className="text-section">
          <p className="powered-by">Powered by OctoNads</p>
          <p className="copyright">© {currentYear} Copyright All Rights Reserved.</p>
        </div>

        {/* Social Icons Section */}
        <div className="social-section">
          <a href="https://x.com/OctoNads" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} className="social-logo" />
          </a>
          <a href="https://discord.gg/C6EefTRpzd" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Discord">
            <FontAwesomeIcon icon={faDiscord} className="social-logo" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;