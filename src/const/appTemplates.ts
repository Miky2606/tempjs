import { AppTemplate, FileTemplate } from "../controller/interface"
import crypto from 'crypto'
export const FileConst: FileTemplate[] = [
    {
        id: crypto.randomUUID(),
        name: 'Reset CSS',
        creator: 'Eduardo Fierro',
        code: 'https://raw.githubusercontent.com/eduardofierropro/Reset-CSS/main/css/app.css',
        type: 'css'

    },
    {
        id: crypto.randomUUID(),
        name: 'Reset SASS',
        creator: 'Eduardo Fierro',
        code: 'https://raw.githubusercontent.com/eduardofierropro/Reset-CSS/main/scss/_reset.scss',
        type: 'sass'


    }
]




export const appDB: AppTemplate[] = [

    {
        id: crypto.randomUUID(),
        name: 'React JS',
        dependencies: {

        },
        devDependencies: {

        },
        scripts: {

        },
        extension: '',
        type: 'web',
        root: './src/templates/react'
    },
    {
        id: crypto.randomUUID(),
        name: 'Node App TS',
        dependencies: {
            "typescript": "^4.9.4"
        },
        devDependencies: {
            "tsc-watch": "^6.0.0"
        },
        scripts: {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "tsc",
            "dev": "tsc-watch --onSuccess \"node ./dist/index.js\""
        },
        extension: 'ts',
        type: 'api',
        root: './src/templates/ts'
    }
]
