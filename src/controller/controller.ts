import fs from 'fs'

import { AppTemplate, FileTemplate } from './interface'
import { cssCreateFramework } from './functions/function.css.frameworl'
import { jsonCreate } from './functions/functions.fs'
import { runCommand } from './functions/command'
import { createFileComunity } from './controller.prompt'



export const createReactApp = async (app: any, appDB: AppTemplate) => {
    const dir = `./${app.name}`
    let existJson: boolean = false


    try {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir)
        fs.readdirSync(appDB.root, { withFileTypes: true })
            .filter(e => {
                if (!e.isDirectory()) {


                    const data = fs.readFileSync(`${appDB.root}/${e.name}`)

                    fs.writeFileSync(`${dir}/${e.name}`, data)
                    if (e.name === 'package.json') {
                        existJson = true
                        jsonCreate(app, dir, appDB)

                    }



                }

                else {

                    fs.readdirSync(`${appDB.root}/${e.name}`, { withFileTypes: true })
                        .filter(type => !type.isDirectory())
                        .forEach(files => {
                            if (e.name !== "node_modules") {
                                const data = fs.readFileSync(`${appDB.root}/${e.name}/${files.name}`)

                                if (!fs.existsSync(`${dir}/${e.name}/`)) fs.mkdirSync(`${dir}/${e.name}/`)
                                fs.writeFileSync(`${dir}/${e.name}/${files.name}`, data)



                            }

                        })
                }
            })

        if (appDB.type === 'web') cssCreateFramework(app, dir)
        if (app.comunity !== '') createFileComunity(app.comunity, dir)

        if (existJson) {


            const installDepsCommand = `cd ${app.name} && npm install`;

            runCommand(installDepsCommand)

            if (!runCommand) return console.log("Error in the installation")

            console.log(
                "%c Congratulations! You are ready. Follow the following commands to start", 'color: #1c87c9; font-size: 18px'
            );
            console.log(`cd ${app.name} && npm start`);




        }

    } catch (error) {
        console.log(error)

    }



}

