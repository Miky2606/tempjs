export interface Templates {
    author: string,
    url: string,
    name: string,
    description: string;
    typeTemplate: string

}



export const templatesDB: Templates[] = [
    {
        author: "Eduardo Fierro",
        url: "https://raw.githubusercontent.com/eduardofierropro/Reset-CSS/main/scss/_reset.scss",
        name: "Reset Sass",
        description: 'ghjghjasghjd',
        typeTemplate: "file"
    },
    {
        author: "Eduardo Fierro",
        url: "https://raw.githubusercontent.com/eduardofierropro/Reset-CSS/main/css/app.css",
        name: "Reset Css",
        description: 'ghjghjasghjd',
        typeTemplate: "file"
    },
    {
        author: "Jonathan",
        url: "https://github.com/Miky2606/easy-code",
        name: "Electron-React",
        description: "asdghjasgd",
        typeTemplate: "project"
    }
]