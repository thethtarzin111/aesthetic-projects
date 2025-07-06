// Sakura petals animation component
import React, { useEffect } from 'react';

const Sakura = () => {
  useEffect(() => {
    const createPetal = () => {
      const petal = document.createElement("div");
      petal.className = "sakura-petal";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = 2 + Math.random() * 3 + "s";
      petal.style.opacity = Math.random();
      petal.style.fontSize = Math.random() * 10 + 10 + "px";
      petal.innerText = "🌸";
      document.getElementById("sakura-container").appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, 5000);
    };

    const petalInterval = setInterval(createPetal, 300);
    return () => clearInterval(petalInterval);
  }, []);

  return <div id="sakura-container" className="pointer-events-none absolute inset-0 z-10"></div>;
};

export default Sakura;
