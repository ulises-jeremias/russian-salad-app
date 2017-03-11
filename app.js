const electron = require('electron')
// Defines app = electron.app and BrowserWindow = electron.BrowserWindow
const { app, BrowserWindow } = electron
const path = require('path')

let mainWindow

let file = (elem) => {
  return require('url').format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, `${elem}.html`)
  })
}

let createWindow = () => {
  // Create the browser window
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width,
    height,
    minWidth: 800,
    minHeight: 600,
    show: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  })
  // and load the index.html of the app.
  mainWindow.loadURL(file('index'))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Show the mainwindow when it is loaded and ready to show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
