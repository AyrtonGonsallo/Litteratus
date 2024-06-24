const { app,Menu,  BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
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