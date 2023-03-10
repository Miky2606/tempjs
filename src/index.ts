#!/usr/bin/env node

import inquirer from "inquirer";
import { createReactApp } from "./controller/controller";
import { selectFile } from "./controller/controller.prompt";
import { AppTemplate } from "./controller/interface";
import { cssTemplate } from "./const/cssFramework";
import { appDB, FileConst } from "./const/appTemplates";


let app = {
    name: '',
    css: '',
    comunity: ''
};

let comunity: string = '';
let framework: string = '';




(async () => {

    try {


        const choice = await inquirer.prompt({

            type: 'list',
            name: 'choice',
            message: "Select Create App or Take File",
            choices: ['Create App', 'Select File']
        })


        if (choice.choice === 'Select File') return selectFile()



        const selectApp = await inquirer.prompt({
            type: 'list',
            name: 'app',
            message: 'Choice App',
            choices: appDB.map(e => e.name)
        })

        const find = appDB.find(e => selectApp.app === e.name) as AppTemplate

        if (find.type === 'web') {

            const selectCssFramework = await inquirer.prompt({
                type: 'list',
                name: 'css',
                message: 'Select Framework',
                choices: cssTemplate.map(e => e.name)

            })




            if (selectCssFramework.css === 'CSS' || selectCssFramework.css === 'Sass') {
                const style = FileConst.find(e => e.type === selectCssFramework.css.toLowerCase())
                const choiceComunnityCss = await inquirer.prompt({
                    type: 'list',
                    message: 'Community Style',
                    name: 'style',
                    choices: [style!.name, 'None']

                })


                comunity = choiceComunnityCss.style



            }

            framework = selectCssFramework.css

        }


        const template = await inquirer.prompt({
            type: 'input',
            name: 'nameApp',
            message: 'Name For The App',
        })

        if (template.nameApp === "") return console.error("Error:  I need a name for the app")




        app = {
            name: template.nameApp,
            css: framework,
            comunity
        }




        createReactApp(app, find)






    } catch (error) {
        console.log(`Error:${error}`)
    }

})()



