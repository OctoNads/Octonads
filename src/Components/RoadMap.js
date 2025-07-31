import React, { useEffect, useRef } from 'react';

import './RoadMap.css'; // Import the corresponding CSS file 

const RoadMap = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        root: timeline,
        rootMargin: '0px -100px 0px -100px',
        threshold: 0.1,
      }
    );

    const items = timeline.querySelectorAll('.horizontal-roadmap-item');
    items.forEach((item) => observer.observe(item));

    return () => items.forEach((item) => observer.unobserve(item));
  }, []);

  const roadmapData = [
    { quarter: "INTRODUCING", status: "Done!", statusClass: "status-completed", tasks: ["Socials Launch", "OCTONADS TESTNET NFT", "BETA TOOLS INTRODUCE"], isLocked: false },
    { quarter: "MAINNET PREPATIONS", status: "Doing It!", statusClass: "status-in-progress", tasks: ["Building Community","Dicord Events", "Projects COLLABS", "OctoNads Web Launch"], isLocked: false },
    { quarter: "THE UTILITY BEGAN", status: "Next Up!", statusClass: "status-planned", tasks: ["Staking Platform", "Intoduce Token!", "Game Time!"], isLocked: false },
    { quarter: "THE REWARD", status: "The Future!", statusClass: "status-planned", tasks: ["You're The Boss!", "Metaverse Land", "New Octonads!?"], isLocked: true },
   { quarter: "THE REWARD", status: "The Future!", statusClass: "status-planned", tasks: ["You're The Boss!", "Metaverse Land", "New Octonads!?"], isLocked: true },
  ];

  return (
    <>

      <section className="horizontal-roadmap-section" id="roadmap">
        <div className="horizontal-roadmap-title-container">
          <h1>Our Roadmap</h1>
        </div>
        <div className="horizontal-timeline-container" ref={timelineRef}>
          <div className="horizontal-timeline-items">
            <div className="timeline-line"></div>
            {roadmapData.map((item, index) => (
              <div key={index} className="horizontal-roadmap-item">
                <div className="horizontal-roadmap-card">
                  {item.isLocked && <div className="horizontal-lock-overlay">?</div>}
                  <div className={item.isLocked ? 'horizontal-locked-content' : ''}>
                    <div className="horizontal-card-header">
                      <h3 className="horizontal-card-title">{item.quarter}</h3>
                      <span className={`horizontal-status-badge ${item.statusClass}`}>{item.status}</span>
                    </div>
                    <div className="horizontal-card-content">
                      <ul>{item.tasks.map((task, i) => <li key={i}>{task}</li>)}</ul>
                    </div>
                  </div>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RoadMap;