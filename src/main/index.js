import { app, BrowserWindow, ipcMain } from 'electron'
// import { EFFECT, PARAMS, MicaBrowserWindow } from 'mica-electron'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// const EFFECT = {
//   BACKGROUND: {
//     AUTO: 0,
//     NONE: 1,
//     ACRYLIC: 3,         // Acrylic
//     MICA: 2,            // Mica
//     TABBED_MICA: 4      // Mica tabbed
//   },
//   CORNER: 5,
//   BORDER_COLOR: 6,
//   CAPTION_COLOR: 7,
//   TEXT_COLOR: 8
// }

// const PARAMS = {
//   THEME: {
//     AUTO: 'auto',	// select theme by the windows theme
//     DARK: 'dark',	// select the dark theme
//     LIGHT: 'light',	// select the white theme
//   },
//   CORNER: {
//     DEFAULT: 0,
//     DONOTROUND: 1,
//     ROUND: 2,
//     ROUNDSMALL: 3
//   },
//   COLOR: {
//     RED: 0x000000FF,
//     GREEN: 0x0000FF00,
//     BLUE: 0x00FF0000,
//     BLACK: 0x00000000,
//     WHITE: 0x00FFFFFF,
//     FROM_RGB: (r, g, b) => {
//       return r + (g << 8) + (b << 16);
//     }
//   }
// }

app.commandLine.appendSwitch("enable-transparent-visuals")

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  // mainWindow = new MicaBrowserWindow({
  mainWindow = new BrowserWindow({
    width: 1260,
    height: 700,
    useContentSize: true,
    // effect: EFFECT.BACKGROUND.MICA,
    // effect: EFFECT.BACKGROUND.MICA,
    // theme: PARAMS.THEME.LIGHT,
    autoHideMenuBar: true,
    frame:false,
    show:false
    // transparent:true
  })

  // mainWindow.setVisualEffect(EFFECT.CORNER, 10);
  // mainWindow.setVisualEffect(EFFECT.CORNER, PARAMS.CORNER.ROUNDSMALL);

  mainWindow.loadURL(winURL)

  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.show();
  });

  ipcMain.on('window-min',()=>{
    mainWindow.minimize();
  })
  ipcMain.on('window-max', () => {
    if(mainWindow.isMaximized()){
      mainWindow.restore();
    }else{
      mainWindow.maximize();
    }
  })
  ipcMain.on('window-close', () => {
    mainWindow.close();
  })
}
app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
