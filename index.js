'use strict'
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const ipc = electron.ipcMain;

app.on('ready', () => {
    let appWindow, infoWindow;
    appWindow = new BrowserWindow({
        show: false
    });
    appWindow.loadURL('http://ishantiw.github.io');

    infoWindow = new BrowserWindow({
        width: 400,
        height: 300,
        show: false,
        frame: false,
        transparent: true
    });
    infoWindow.loadURL('file://'+ __dirname + '/info.html');

    //This will happen just once and not continuously, ready-to-show event waits until this particular window has finished drawing
    appWindow.once('ready-to-show', () => {
        appWindow.show();
        setTimeout(() => {
            infoWindow.show();
            //setTimeout(() => {infoWindow.hide();}, 5000)
        }, 1000);
    });//ready-to-save

    ipc.on('closeInfoWindow', (event, arg) => {
        event.returnValue='';
        infoWindow.hide();
    })//close the info window
});//app is ready