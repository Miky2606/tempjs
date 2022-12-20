import { cssTemplate } from "../../const/cssFramework"
import { tailwindconfig, tailwindCss } from "../../package/package"
import { Dependencies } from "../interface"
import { replace, writeFile } from "./functions.fs"
import fs from 'fs'

export const cssCreateFramework = (app: any, dir: string) => {
    if (app.css !== '') {
        const css = cssTemplate.find(e => e.name === app.css) as Dependencies
        if (css.name === 'Tailwind') {
            fs.writeFileSync(`${dir}/tailwind.config.js`, tailwindconfig)
            fs.appendFileSync(`${dir}/src/index.css`, tailwindCss)
        }
        if (css.name === 'Sass') {
            const style = fs.readFileSync(`${dir}/src/index.css`)
            replace('import "./index.css";', `${dir}/src/index.jsx`, 'import "./index.scss";')
            replace('import "./App.css";', `${dir}/src/App.jsx`, 'import "./App.scss";')

            writeFile(`${dir}/src/index.scss`, style)
            fs.unlinkSync(`${dir}/src/index.css`)
        }
    }

}

