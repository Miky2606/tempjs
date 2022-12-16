#!/usr/bin/env node

import inquirer from "inquirer";
import { createApp, createFile, createProject, runCommand, selectTemplate } from "./controller/controller";
import { templatesDB } from "./controller/interface";


const prompt = async () => {

    // Find All Templates
    const template = await inquirer.prompt({
        type: 'list',
        name: 'template',
        message: "Choice Template",
        choices: templatesDB,

    })

    //Choice Select Template filter

    const temp = selectTemplate(template.template)

    //if template doesnt exist
    if (temp.length === 0) return console.log("error")

    //if template is a file create the file
    if (temp[0].typeTemplate === 'file') return createFile(temp[0].url, temp[0].name)

    //else ask about the name project 
    const projectName = await inquirer.prompt({
        type: 'input',
        name: 'command',
        message: 'Name Folder (if the download is not a app thye file is download in the dir folder)',

    })

    //clone the template from github
    const validateName = await createProject(projectName.command)
    if (!validateName) return console.log("false")
    const repoName = projectName.command;

    createApp(temp[0], repoName)

}


prompt()

