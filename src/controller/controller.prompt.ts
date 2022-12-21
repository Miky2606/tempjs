import inquirer from "inquirer"
import { FileConst } from "../const/appTemplates"
import fs from 'fs'
import path from 'path'
import Url from 'url'
import https from 'https'
import { FileTemplate } from "./interface"

export const selectFile = async () => {
    const file = await inquirer.prompt({
        type: 'list',
        name: 'file',
        message: 'Select Template',
        suffix: 'hola',

        choices: FileConst.map(e => e.name + ` (${e.creator})`),

    })

    const find = FileConst.find(e => e.name + ` (${e.creator})` === file.file) as FileTemplate

    fileApp(find, './styles')

}

const fileApp = async (object: FileTemplate, dir: string) => {
    try {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir)

        var result = path.extname(Url.parse(object.code).pathname!);
        const writer = fs.createWriteStream(`${dir}/reset${result}`);

        https.get(object.code, response => {
            response.pipe(writer);
        });
        console.log("✅ Created")
        console.log(`Import the style from '${dir}/styles/reset${result}'`)
    } catch (error) {
        console.error(`❗Error: ${error}`)


    }
}


export const createFileComunity = (name: string, dir: string) => {
    const root = `${dir}/styles/`

    if (!fs.existsSync(root)) fs.mkdirSync(root)
    const find = FileConst.find(e => e.name === name) as FileTemplate
    var result = path.extname(Url.parse(find.code).pathname!);
    fileApp(find, root)
    const text = `import  './styles/reset${result}' \n`

    const code = fs.readFileSync(`${dir}/src/index.jsx`)
    fs.writeFileSync(`${dir}/src/index.jsx`, text)
    fs.appendFileSync(`${dir}/src/index.jsx`, code)


}