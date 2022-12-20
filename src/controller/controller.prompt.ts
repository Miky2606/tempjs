import inquirer from "inquirer"
import { FileConst } from "../const/appTemplates"
import { fileApp } from "./controller"
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

    fileApp(find)

}