import fs from 'fs'
import { cssTemplate } from '../../const/cssFramework'
import { AppTemplate, Dependencies } from '../interface'
export const replace = (text: string, dir: string, textreplace: string) => {
    const index = fs.readFileSync(dir, 'utf-8')
    const replace = index.replace(text, textreplace)
    fs.writeFileSync(dir, replace)
}

export const writeFile = (dir: string, data: Buffer) => {
    try {
        fs.writeFileSync(`${dir}/src/index.scss`, data)

    } catch (error) {
        console.log(error)
    }
}


export const jsonCreate = (app: any, dir: string, appDB: AppTemplate) => {

    const json = JSON.parse(fs.readFileSync(`${dir}/package.json`).toString())

    json.name = app.name



    if (app.css !== '' || app.css !== 'CSS') {

        Object.assign(json, addCSSDepencies(app, json))

    }
    else {


        Object.assign(json, addDepencies(appDB, json))


    }



    fs.writeFileSync(`${dir}/package.json`, JSON.stringify(json))


}



const addCSSDepencies = (app: any, json: any) => {

    const css = cssTemplate.find(e => e.name === app.css) as Dependencies


    if (Object.keys(css.dependencies).length > 0) Object.assign(json.dependencies, css.dependencies) as object
    if (Object.keys(css.devDependencies).length > 0) Object.assign(json.devDependencies, css.devDependencies) as object


    return json
}

const addDepencies = (appDB: AppTemplate, json: any): any => {
    if (Object.keys(appDB.dependencies).length > 0) Object.assign(json, appDB.dependencies)
    if (Object.keys(appDB.scripts).length > 0) Object.assign(json, appDB.scripts)
    if (Object.keys(appDB.devDependencies).length > 0) Object.assign(json, appDB.devDependencies)
    return json
}