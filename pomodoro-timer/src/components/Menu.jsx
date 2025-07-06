import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ButtonSound from './ButtonSound';

const Menu = ({
    drinks,
    selectedDrink,
    setSelectedDrink,
    setCurrentView
}) => {
    return (
        <div className="h-full p-8 overflow-hidden">
            <div className="flex items-center mb-4">
                <ButtonSound
                    onClick={() => setCurrentView('timer')}
                    className="mr-3 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-purple-600" />   
                </ButtonSound>
                <h2 className="text-xl font-pixelify font-bold text-outline-purple">Choose Your Drink</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 overflow-y-auto max-h-full">
                {drinks.map((drink) => (
                    <ButtonSound
                        key={drink.name}
                        onClick={() => {
                            setSelectedDrink(drink.name);
                            setCurrentView('timer');
                        }}
                        className={`p-4 rounded-2xl ${drink.color} hover:scale-110 transition-transform duration-200 flex flex-col items-center space-y-2`}
                    >
                        <img 
                            src={drink.icon} 
                            alt={drink.name}
                            className="w-22 h-22 object-contain"
                        />
                        <span className="font-pixelify font-bold text-outline-purple text-center text-xl">{drink.name}</span>
                    </ButtonSound>
                ))}
            </div>
        </div>
    );
};

export default Menu;