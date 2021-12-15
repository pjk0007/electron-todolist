const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
const osKeys = {
  ctrl: process.platform === "win32" ? "Ctrl" : "Command",
  alt: process.platform === "win32" ? "Alt" : "Option",
  shift: "Shift",
};

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

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
      },
      {
        label: "Quit",
        accelerator: `${osKeys.ctrl}+Q`,
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
