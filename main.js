const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  createMenu();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createMenu() {
  const template = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator:
            process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools();
          }
        },
        {
            label: 'Toggle Full Screen',
            click: () => { toggleFullscreen();},
            accelerator: 'CmdOrCtrl+f'
        },
        {
          role: 'quit'
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}


function toggleFullscreen() {
    if (win.isFullScreen()) {
        win.setFullScreen(false);
    } else {
        win.setFullScreen(true);
    }
}