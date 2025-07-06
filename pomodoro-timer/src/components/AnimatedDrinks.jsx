// components/SmartDrink.jsx - Final clean version
import React from 'react';

const AnimatedDrinks = ({ 
  drinkName, 
  drinks, 
  size = "w-20 h-20", 
  className = "",
  useAnimation = true 
}) => {
  
  // Find the drink object from your drinks array
  const drink = drinks.find(d => d.name === drinkName);
  
  if (!drink) {
    return (
      <div className={`${size} ${className} bg-gray-200 rounded-lg flex items-center justify-center`}>
        <span className="text-xs text-gray-500">?</span>
      </div>
    );
  }

  // Use size from drinks.js if it exists, otherwise use the provided default size
  const finalSize = drink.size || size;

  // Choose animated or static icon
  const iconSrc = useAnimation && drink.animatedIcon ? drink.animatedIcon : drink.icon;

  return (
    <img 
      src={iconSrc}
      alt={drinkName}
      className={`${finalSize} object-contain ${className} transition-transform hover:scale-110`}
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
      }}
      loading="lazy"
      onError={(e) => {
        // Fallback to static icon if animated fails
        if (useAnimation && drink.animatedIcon && e.target.src === drink.animatedIcon) {
          e.target.src = drink.icon;
        }
      }}
    />
  );
};

export default AnimatedDrinks;