const { app,Menu, ipcMain, dialog, BrowserWindow } = require('electron')

const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');

let win;
const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
          }
    })

    win.loadFile('index.html')
    // Création du menu
    const mainMenu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Accueil',
                    click() {
                        win.loadFile('index.html');
                    }
                },
                {
                    label: 'Sports',
                    click() {
                        win.loadFile('sports.html');
                    }
                },
                {
                    label: 'Ajouter un exercice',
                    click() {
                        win.loadFile('ajouter-exercice.html');
                    }
                },
                // Ajoutez d'autres éléments de menu pour les autres routes si nécessaire
            ]
        }
    ]);

    // Définition du menu comme menu de l'application
    Menu.setApplicationMenu(mainMenu);
    // Activer les outils de développement (DevTools)
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()
})
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

ipcMain.handle('select-pdf-folder', async () => {
  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  });
  return result.filePaths[0];
});

ipcMain.handle('get-pdf-files', async (event, folderPath) => {
  return fs.promises.readdir(folderPath).then(files => 
    files.filter(file => path.extname(file).toLowerCase() === '.pdf')
  );
});

ipcMain.handle('get-pdf-info', async (event, filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return {
    title: data.info.Title,
    pages: data.numpages,
    text: data.text.slice(0, 200)
  };
});
  