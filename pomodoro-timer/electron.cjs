const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 650,
    frame: false,
    resizable: false,
    show: false,
    icon: path.join(__dirname, 'icon.ico'), // Your custom icon
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.setMenuBarVisibility(false);
 
  // Handle window controls
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });

  ipcMain.on('close-window', () => {
    mainWindow.close();
  });

  // 🎯 IMPORTANT: Load from dist folder (for Vite)
  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  
  // Optional: Add dev tools temporarily to debug
  //mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});