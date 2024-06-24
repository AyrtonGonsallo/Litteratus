const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectPdfFolder: () => ipcRenderer.invoke('select-pdf-folder'),
  getPdfFiles: (folderPath) => ipcRenderer.invoke('get-pdf-files', folderPath),
  getPdfInfo: (filePath) => ipcRenderer.invoke('get-pdf-info', filePath)
});
