const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

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

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add New TOdo",
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
}

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
