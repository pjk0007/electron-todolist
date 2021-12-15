const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;

const OSKEY = {
  ctrl: process.platform === "win32" ? "Ctrl" : "Command",
  alt: process.platform === "win32" ? "Alt" : "Option",
  shift: "Shift",
};

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on("closed", () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    width: 300,
    height: 200,
    title: "Add New TOdo",
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
  addWindow.on("closed", () => (addWindow = null));
}

ipcMain.on("todo:add", (event, todo) => {
  mainWindow.webContents.send("todo:add", todo);
  addWindow.close();
});

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Clear Todos",
        click() {
          mainWindow.webContents.send("todo:clear");
        },
      },
      {
        label: "Quit",
        accelerator: `${OSKEY.ctrl}+Q`,
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform === "darwin") {
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "DEVELOPER!!!",
    submenu: [
      {
        role: "reload",
      },
      {
        label: "Toggle Developer Tools",
        accelerator: `${OSKEY.ctrl}+${OSKEY.alt}+I`,
        click(item, focuseWindow) {
          focuseWindow.toggleDevTools();
        },
      },
    ],
  });
}
// 'production'
// 'development'
// 'staging'
// 'test'
