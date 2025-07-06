/**
 * Menu.jsx - Drink Selection Interface
 * 
 * A charming menu for choosing your productivity companion:
 * - Displays all available drinks with animations
 * - Beautiful grid layout with color-coded backgrounds
 * - Animated drink icons that preview the timer experience
 * - Sound feedback on selection
 * - Back navigation to timer

 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ButtonSound from './ButtonSound';
import AnimatedDrinks from './AnimatedDrinks';

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
                        <AnimatedDrinks
                            drinkName={drink.name}
                            drinks={drinks}
                            size="w-22 h-22"
                            className="object-contain"
                            useAnimation={true}
                        />
                        <span className="font-pixelify font-bold text-outline-purple text-center text-xl">{drink.name}</span>
                    </ButtonSound>
                ))}
            </div>
        </div>
    );
};

export default Menu;