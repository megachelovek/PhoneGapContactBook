import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './AppComponent';


function Main(): void {
    writeToJson();
    var contacts = readJsonContacts();
}

function writeToJson() {
    var fs = require("fs");
    var contact1 = { Name: "1TestName1 TestSurname", Phone: 3213123, Email: "123qwe@rambler.ru" };
    var contact2 = { Name: "2TestName2 TestSurname", Phone: 3214123, Email: "asdase@rambler.ru" };
    var contact3 = { Name: "3TestName3 TestSurname", Phone: 36547653, Email: "2133@rambler.ru" };
    var contact4 = { Name: "4TestName4 TestSurname", Phone: 33453123, Email: "asdsade@rambler.ru" };
    var contact5 = { Name: "5TestName5 TestSurname", Phone: 9789723, Email: "xxxas@rambler.ru" };
    var list = [contact1, contact2, contact3, contact4, contact5,];
    fs.writeFile("./database.json", JSON.stringify(list), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });
}

function readJsonContacts() {
    const fs = require('fs')
    fs.readFile('./database.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            var contacts = JSON.parse(jsonString)
        } catch (err) {
            console.log('Error parsing JSON string:', err)
        }
        return contacts;
    })
}
