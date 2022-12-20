
import { Dependencies } from "../controller/interface";
import crypto from 'crypto'

export const cssTemplate: Dependencies[] = [{
    id: crypto.randomUUID(),
    name: 'Tailwind',
    dependencies: {

    },
    devDependencies: {
        "autoprefixer": "^10.4.13",
        "postcss": "^8.4.20",
        "tailwindcss": "^3.2.4"
    }
},
{
    id: crypto.randomUUID(),
    name: 'Sass',
    dependencies: {
        'sass': '*'
    }
    , devDependencies: {}
}
    ,

{
    id: crypto.randomUUID(),
    name: 'CSS',
    dependencies: {

    }
    , devDependencies: {}

}]

