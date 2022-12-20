import fs from 'fs'
import path from 'path'
import Url from 'url'


import https from 'https'
import { jsonPack, tsconfig } from '../package/package'
import { AppTemplate, FileTemplate } from './interface'
import { cssCreateFramework } from './functions/function.css.frameworl'
import { jsonCreate } from './functions/functions.fs'
import { runCommand } from './functions/command'


export const createApp = (name: string, object: AppTemplate) => {
    const dir = `./${name}`
    jsonPack.name = name;

    try {


        if (object.extension === 'ts') {
            createTS(dir, object)
        }
        fs.mkdirSync(`${dir}/src`)
        fs.writeFileSync(`${dir}/package.json`, JSON.stringify(jsonPack))
        fs.writeFileSync(`${dir}/src/index.${object.extension}`, "console.log('yes')")


        console.log("Project Created")
    } catch (error) {
        console.error(`Error: ${error}`)
    }

}


export const createTS = (dir: string, object: AppTemplate) => {
    jsonPack.dependencies = object.dependencies;
    jsonPack.scripts = object.scripts;
    jsonPack.devDependencies = object.devDependencies

    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    if (!fs.existsSync(`${dir}/dist`)) fs.mkdirSync(`${dir}/dist`)


    fs.writeFileSync(`${dir}/dist/index.js`, '')
    fs.writeFileSync(`${dir}/tsconfig.json`, JSON.stringify(tsconfig))

    fs.mkdirSync(`${dir}/src`)
    fs.writeFileSync(`${dir}/package.json`, JSON.stringify(jsonPack))
    fs.writeFileSync(`${dir}/src/index.ts`, "console.log('yes')")
}



export const fileApp = async (object: FileTemplate) => {
    try {
        if (!fs.existsSync(`./styles`)) fs.mkdirSync('./styles')


        // fs.writeFileSync(`./styles/reset.${object.extension}`, object.code)

        var result = path.extname(Url.parse(object.code).pathname!);
        const writer = fs.createWriteStream(`./styles/reset${result}`);

        https.get(object.code, response => {
            response.pipe(writer);
        });
        console.log("✅ Created")
        console.log(`Import the style from './styles/reset${result}'`)
    } catch (error) {
        console.error(`❗Error: ${error}`)


    }
}


export const createAppNew = (dependencies: any, find: AppTemplate) => {
    console.log(dependencies, find);


}

export const createReactApp = async (app: any) => {
    const dir = `./${app.name}`



    try {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir)
        fs.readdirSync('./src/templates/react', { withFileTypes: true })
            .filter(e => {
                if (!e.isDirectory()) {


                    const data = fs.readFileSync(`./src/templates/react/${e.name}`)

                    fs.writeFileSync(`${dir}/${e.name}`, data)
                    if (e.name === 'package.json') {

                        jsonCreate(app, dir)

                    }



                }

                else {

                    fs.readdirSync(`./src/templates/react/${e.name}`, { withFileTypes: true })
                        .filter(type => !type.isDirectory())
                        .forEach(files => {
                            if (e.name !== "node_modules") {
                                const data = fs.readFileSync(`./src/templates/react/${e.name}/${files.name}`)

                                if (!fs.existsSync(`${dir}/${e.name}/`)) fs.mkdirSync(`${dir}/${e.name}/`)
                                fs.writeFileSync(`${dir}/${e.name}/${files.name}`, data)



                            }

                        })
                }
            })

        cssCreateFramework(app, dir)

        const installDepsCommand = `cd ${app.name} && npm install`;

        runCommand(installDepsCommand)

        if (!runCommand) return console.log("Error in the installation")

        console.log(
            "Congratulations! You are ready. Follow the following commands to start"
        );
        console.log(`cd ${app.name} && npm start`);



    } catch (error) {
        console.log(error)

    }



}

