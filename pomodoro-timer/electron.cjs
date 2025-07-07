const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 650,
    frame: false,
    resizable: false,
    show: false,
    icon: path.join(__dirname, 'icon.ico'),
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

  // Determine if we're in development or production
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  
  if (isDev) {
    // Development: load from Vite dev server
    mainWindow.loadURL('http://localhost:5173')
      .then(() => console.log('Dev server loaded successfully'))
      .catch(err => console.error('Failed to load dev server:', err));
    
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    // Production: load from built files
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    console.log('Loading production build from:', indexPath);
    
    mainWindow.loadFile(indexPath)
      .then(() => console.log('Production build loaded successfully'))
      .catch(err => {
        console.error('Failed to load production build:', err);
        // Fallback: try loading from app.getAppPath()
        const fallbackPath = path.join(app.getAppPath(), 'dist', 'index.html');
        console.log('Trying fallback path:', fallbackPath);
        return mainWindow.loadFile(fallbackPath);
      });
  }
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