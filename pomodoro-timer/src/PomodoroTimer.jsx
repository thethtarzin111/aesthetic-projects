/**
 * PomodoroTimer.jsx - Main Application Component
 * 
 * A cute, aesthetic Pomodoro timer featuring:
 * - Animated drink icons with original artwork
 * - Automatic transitions between focus and break sessions
 * - Built-in task management system
 * - Magical sakura petal effects
 * - Beautiful cozy background with custom window controls
 * 
 * The timer follows the Pomodoro Technique:
 * - 25 minutes of focused work
 * - 5 minutes of break time
 * - Customizable number of sessions
 */

import React, { useState, useEffect, useRef } from 'react';
import TimeDisplay from './components/TimeDisplay';
import Menu from './components/Menu';
import TasksDisplay from './components/TasksDisplay';
import { drinks } from './data/drinks';
import Sakura from './components/Sakura';
import ButtonSound from './components/ButtonSound';
import backgroundImage from './assets/background.png';
import countdownSound from './assets/sounds/countdown.wav';
import sessionStartSound from './assets/sounds/session-start.wav';

const PomodoroTimer = () => {

  // ═══════════════════════════════════════════════════════════════
  // STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════

  const [currentView, setCurrentView] = useState('timer');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(1);
  const [totalSessions, setTotalSessions] = useState(1);
  const [selectedDrink, setSelectedDrink] = useState('Moonlit Matcha');
  const [tasks, setTasks] = useState([]);
  const intervalRef = useRef(null);
  const countdownPlayedRef = useRef(false);


  // ═══════════════════════════════════════════════════════════════
  // TIMER LOGIC - Heart of the Pomodoro Technique
  // ═══════════════════════════════════════════════════════════════

  /**
 * Play countdown sound for session transition warning (3 seconds left)
 */
  const playCountdownSound = () => {
    try {
      const audio = new Audio(countdownSound);
      audio.volume = 0.4; // Noticeable but not jarring
      audio.play().catch(error => {
        console.log('Countdown sound failed to play:', error);
      });
    } catch (error) {
      console.log('Countdown sound error:', error);
    }
  };

  /**
   * Play session start sound when beginning a new focus session
   */
  const playSessionStartSound = () => {
    try {
      const audio = new Audio(sessionStartSound);
      audio.volume = 0.3; // Gentle and encouraging
      audio.play().catch(error => {
        console.log('Session start sound failed to play:', error);
      });
    } catch (error) {
      console.log('Session start sound error:', error);
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      if (timeLeft === 3 && !isBreak && !countdownPlayedRef.current) {
        playCountdownSound();
        countdownPlayedRef.current = true;
      }
      
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      countdownPlayedRef.current = false; // Reset countdown flag
      
      if (isBreak) {
        // Break finished - check if there are more sessions
        if (sessions < totalSessions) {
          // Start next work session automatically
          setIsBreak(false);
          setTimeLeft(25 * 60);
          setSessions(prev => prev + 1);
          setIsRunning(true); // Auto-start next session
          setTimeout(() => playSessionStartSound(), 100); // Small delay for better UX
        } else {
          // All sessions completed
          setIsRunning(false);
          setIsBreak(false);
          setSessions(1); // Reset sessions
          setTimeLeft(25 * 60);
        }
      } else {
        // Work session finished - start break automatically
        setIsBreak(true);
        setTimeLeft(5 * 60);
        setIsRunning(true); // Auto-start break
      }
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, isBreak, sessions, totalSessions]);

  // ═══════════════════════════════════════════════════════════════
  // UTILITY FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ═══════════════════════════════════════════════════════════════
  // TIMER CONTROL HANDLERS
  // ═══════════════════════════════════════════════════════════════

  const handlePlayPause = () => {
    const wasRunning = isRunning;
    setIsRunning(!isRunning);
    
    // Play session start sound when starting the very first session
    if (!wasRunning && !isBreak && sessions === 1 && timeLeft === 25 * 60) {
      setTimeout(() => playSessionStartSound(), 100);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
    setSessions(1);
    countdownPlayedRef.current = false; // Reset countdown flag
  };

  const addSession = () => {
    setTotalSessions(prev => prev + 1);
  };

  const removeSession = () => {
    setTotalSessions(prev => Math.max(1, prev - 1));
  };

  // ═══════════════════════════════════════════════════════════════
  // TASK MANAGEMENT FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  const addTask = (taskText) => {
    if (taskText.trim()) {
      setTasks(prev => [...prev, {
        id: Date.now(),
        text: taskText,
        completed: false
      }]);
    }
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // ═══════════════════════════════════════════════════════════════
  // COMPONENT PROPS CONFIGURATION
  // ═══════════════════════════════════════════════════════════════

  const timerProps = {
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
  };

  const menuProps = {
    drinks,
    selectedDrink,
    setSelectedDrink,
    setCurrentView
  };

  const tasksProps = {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    setCurrentView
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDERING UI
  // ═══════════════════════════════════════════════════════════════

  return (
    <div className="w-screen h-screen m-0 p-0 flex items-center justify-center bg-black">
      <div 
        className="w-[400px] h-[650px] relative overflow-hidden flex items-center justify-center m-0 p-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: 0,
          padding: 0,
        }}
      >

      {/* Draggable header area */}
      <div 
        className="absolute top-0 left-0 right-0 h-12 z-5"
        style={{ WebkitAppRegion: 'drag' }}
      ></div>

      {/* Custom Window Controls */}
      <div className="absolute top-2 right-2 flex space-x-2 z-20" style={{ WebkitAppRegion: 'no-drag' }}>
        <ButtonSound
          onClick={() => window.electronAPI?.minimize()}
          className="w-6 h-6 bg-white/70 hover:bg-purple-400 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          −
        </ButtonSound>
        <ButtonSound
          onClick={() => window.electronAPI?.close()}
          className="w-6 h-6 bg-white/70 hover:bg-pink-500 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-colors"
        >
          ×
        </ButtonSound>
      </div>

      {/* 65% White Overlay - centered */}
      <div className="absolute w-[80%] h-[80%] bg-white/50 rounded-2xl shadow-lg z-0"></div>

      {/* Sakura petals on top of overlay */}
      <Sakura />

      {/* Main content - stays on top */}
      <div className="w-[90%] h-[80%] z-10 relative p-2 flex flex-col overflow-hidden">
        {/* View rendering - takes up most space */}
        <div className="flex-1 overflow-hidden">
          {currentView === 'timer' && <TimeDisplay {...timerProps} />}
          {currentView === 'menu' && <Menu {...menuProps} />}
          {currentView === 'tasks' && <TasksDisplay {...tasksProps} />}
        </div>

        {/* Navigation Bar - moved to bottom */}
        <div className="flex justify-center gap-3 mt-4 pb-2">
          <ButtonSound
            onClick={() => setCurrentView('timer')}
            className={`px-4 py-3 rounded-full font-pixelify text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out ${
              currentView === 'timer'
                ? 'bg-purple-400 text-white'
                : 'bg-white/70 text-pink-500 hover:bg-white'
            }`}
          >
            TIMER
          </ButtonSound>

          <ButtonSound
            onClick={() => setCurrentView('tasks')}
            className={`px-4 py-3 rounded-full font-pixelify text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out ${
              currentView === 'tasks'
                ? 'bg-purple-400 text-white'
                : 'bg-white/70 text-pink-500 hover:bg-white'
            }`}
          >
            TASKS
          </ButtonSound>

          <ButtonSound
            onClick={() => setCurrentView('menu')}
            className={`px-4 py-3 rounded-full font-pixelify text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out ${
              currentView === 'menu'
                ? 'bg-purple-400 text-white'
                : 'bg-white/70 text-pink-500 hover:bg-white'
            }`}
          >
            MENU
          </ButtonSound>

        </div>
      </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;