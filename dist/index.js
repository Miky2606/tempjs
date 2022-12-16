#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const controller_1 = require("./controller/controller");
const interface_1 = require("./controller/interface");
const prompt = async () => {
    // Find All Templates
    const template = await inquirer_1.default.prompt({
        type: 'list',
        name: 'template',
        message: "Choice Template",
        choices: interface_1.templatesDB,
    });
    //Choice Select Template filter
    const temp = (0, controller_1.selectTemplate)(template.template);
    //if template doesnt exist
    if (temp.length === 0)
        return console.log("error");
    //if template is a file create the file
    if (temp[0].typeTemplate === 'file')
        return (0, controller_1.createFile)(temp[0].url, temp[0].name);
    //else ask about the name project 
    const projectName = await inquirer_1.default.prompt({
        type: 'input',
        name: 'command',
        message: 'Name Folder (if the download is not a app thye file is download in the dir folder)',
    });
    //clone the template from github
    const validateName = await (0, controller_1.createProject)(projectName.command);
    if (!validateName)
        return console.log("false");
    const repoName = projectName.command;
    (0, controller_1.createApp)(temp[0], repoName);
};
prompt();
