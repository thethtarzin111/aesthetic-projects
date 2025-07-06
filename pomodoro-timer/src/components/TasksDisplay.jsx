import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import ButtonSound from './ButtonSound';

const TasksDisplay = ({ tasks, addTask, toggleTask, deleteTask, setCurrentView }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    addTask(newTask);
    setNewTask('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-start py-4 px-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-pixelify font-bold text-outline-purple tracking-wider">
          To-do List
        </h1>
      </div>

      {/* Add Task */}
      <div className="mb-4 flex-shrink-0 w-full max-w-sm p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add new task"
            className="flex-1 px-3 py-2 bg-violet-400 text-white placeholder-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
          />
          
        </div>
      </div>

      {/* Tasks Container - scrollable and centered */}
      <div className="flex-1 overflow-y-auto w-full max-w-sm space-y-4">
        {/* Current Tasks */}
        {tasks.filter(task => !task.completed).length > 0 && (
          <div className="bg-white/20 rounded-xl p-4">
            <h3 className="text-lg font-pixelify font-bold text-outline-purple mb-3 text-center">Current Tasks</h3>
            <div className="space-y-2">
              {tasks.filter(task => !task.completed).map((task, index) => (
                <div key={task.id} className="flex items-center space-x-2 bg-white bg-opacity-50 rounded-lg p-2">
                  <span className="text-purple-600 font-pixelify font-bold text-sm">{index + 1}.</span>
                  <span className="flex-1 text-purple-800 text-sm">{task.text}</span>
                  <ButtonSound
                    onClick={() => toggleTask(task.id)}
                    className="w-5 h-5 border-2 border-purple-400 rounded hover:bg-purple-400 transition-colors"
                  ></ButtonSound>
                  <ButtonSound
                    onClick={() => deleteTask(task.id)}
                    className="p-1 hover:bg-red-200 rounded transition-colors"
                  >
                    <X className="w-3 h-3 text-red-600" />
                  </ButtonSound>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {tasks.some(task => task.completed) && (
          <div className="bg-white/20 rounded-xl p-4">
            <h3 className="text-lg font-pixelify font-bold text-outline-purple mb-3 text-center">Completed Tasks</h3>
            <div className="space-y-2">
              {tasks.filter(task => task.completed).map((task, index) => (
                <div key={task.id} className="flex items-center space-x-2 bg-white bg-opacity-30 rounded-lg p-2 opacity-60">
                  <span className="text-purple-600 font-pixelify font-bold text-sm">{index + 1}.</span>
                  <span className="flex-1 text-purple-800 line-through text-sm">{task.text}</span>
                  <ButtonSound
                    onClick={() => toggleTask(task.id)}
                    className="w-5 h-5 bg-purple-400 rounded flex items-center justify-center"
                  >
                    <span className="text-white text-xs">✓</span>
                  </ButtonSound>
                  <ButtonSound
                    onClick={() => deleteTask(task.id)}
                    className="p-1 hover:bg-red-200 rounded transition-colors"
                  >
                    <X className="w-3 h-3 text-red-600" />
                  </ButtonSound>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksDisplay;