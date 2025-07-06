/**
 * TimeDisplay.jsx - Main Timer Interface
 * 
 * The heart of the Pomodoro experience featuring:
 * - Large, readable timer display with custom font
 * - Animated drink companion that changes based on selection
 * - Play/pause and stop controls with satisfying audio feedback
 * - Session management (add/remove total sessions)
 * - Dynamic "Focus!" or "Break!" headers
 
 */
import React from 'react';
import { Play, Pause, Square, Plus } from 'lucide-react';
import ButtonSound from './ButtonSound';
import AnimatedDrinks from './AnimatedDrinks';

const TimeDisplay = ({
  timeLeft,
  formatTime,
  isRunning,
  isBreak,
  sessions,
  totalSessions,
  selectedDrink,
  drinks,
  handlePlayPause,
  handleStop,
  addSession,
  removeSession,
  setCurrentView
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4 py-4">
      {/* Header - moved up and reduced margin */}
      <div className="flex items-center space-x-2">
        <h1 className="text-5xl font-pixelify font-bold text-outline-purple tracking-wider">
          {isBreak ? 'Break !' : 'Focus !'}
        </h1>
      </div>

      {/* Animated GIF Drink - Now with smooth animation! */}
      <div className="w-32 h-32 flex items-center justify-center">
        <AnimatedDrinks 
          drinkName={selectedDrink}
          drinks={drinks}
          size="w-20 h-20"  // Default size (overridden by customSizes in component)
          className="drop-shadow-lg"
          useAnimation={true}
        />
      </div>

      {/* Timer Display */}
      <div className="text-5xl font-pixelify font-bold text-outline-purple tracking-wider">
        {formatTime(timeLeft)}
      </div>

      {/* Session Progress */}
      <div className="text-2xl font-pixelify font-bold text-outline-purple">
        {isBreak ? 'Break Time' : `Session ${sessions} of ${totalSessions}`}
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <ButtonSound
          onClick={handlePlayPause}
          className="w-12 h-12 bg-purple-400 hover:bg-purple-500 hover:scale-110 active:scale-95 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
        >
          {isRunning ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
        </ButtonSound>
        <ButtonSound
          onClick={handleStop}
          className="w-12 h-12 bg-purple-400 hover:bg-purple-500 hover:scale-110 active:scale-95 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
        >
          <Square className="w-6 h-6 text-white" />
        </ButtonSound>
      </div>

      {/* Sessions */}
      <div className="flex items-center space-x-3">
        <span className="text-outline-purple font-pixelify font-bold text-2xl">Sessions:</span>
        <span className="text-outline-purple font-pixelify font-bold text-2xl">{totalSessions}</span>
        <ButtonSound
          onClick={addSession}
          className="w-6 h-6 bg-purple-400 hover:bg-purple-500 hover:scale-110 active:scale-95 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
        >
          <Plus className="w-3 h-3 text-white" />
        </ButtonSound>
        <ButtonSound
          onClick={removeSession}
          className="w-6 h-6 bg-purple-400 hover:bg-purple-500 hover:scale-110 active:scale-95 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
        >
          <span className="text-white font-pixelify font-bold text-sm">-</span>
        </ButtonSound>
      </div>
    </div>
  );
};

export default TimeDisplay;