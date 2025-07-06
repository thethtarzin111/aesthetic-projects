// src/data/drinks.js - Updated with GIF support
import matchaLatteIcon from '../assets/icons/moonlit-matcha.png';
import lavenderDreamBrewIcon from '../assets/icons/lavender-dream-brew.png';
import sakuraSpiritSoda from '../assets/icons/sakura-kitsune-soda.png';

// Import animated GIF versions
import matchaLatteGif from '../assets/icons/moonlit-matcha.gif';
import lavenderDreamBrewGif from '../assets/icons/lavender-dream-brew.gif';
import sakuraSpiritSodaGif from '../assets/icons/sakura-kitsune-soda.gif';

export const drinks = [
    {
        name: 'Moonlit Matcha',
        icon: matchaLatteIcon,
        animatedIcon: matchaLatteGif,
        size: 'w-36 h-36'
    },
    {
        name: 'Lavender Dream Brew',
        icon: lavenderDreamBrewIcon,
        animatedIcon: lavenderDreamBrewGif,
        size: 'w-36 h-36'
    },
    {
        name: 'Sakura Kitsune Soda',
        icon: sakuraSpiritSoda,
        animatedIcon: sakuraSpiritSodaGif,
        size: 'w-36 h-36'
    }
]