import fs from "node:fs"

export const readFile = () => {
    const file = fs.readFileSync("./ejemplo.txt");
    const data = file.toString()
    const rows = data.split("\n")
    const matrix = rows.map( row => row.split(" "))
    console.log(matrix)
}