import fs from 'fs'
import { cssTemplate } from '../../const/cssFramework'
import { Dependencies } from '../interface'
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


export const jsonCreate = (app: any, dir: string) => {
    const json = JSON.parse(fs.readFileSync(`./src/templates/react/package.json`).toString())
    json.name = app.name
    if (app.css !== "Css") {

        const css = cssTemplate.find(e => e.name === app.css) as Dependencies
        const dependencies = css.dependencies

        if (Object.keys(css.dependencies).length > 0) Object.assign(json.dependencies, dependencies)
        if (Object.keys(css.devDependencies).length > 0) json.devDependencies = css.devDependencies

    }


    fs.writeFileSync(`${dir}/package.json`, JSON.stringify(json))

    return json
}



