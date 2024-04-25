import fs, { constants } from "node:fs";
import { Buffer } from "node:buffer";
import prompt from "prompt-sync";


const promptFunc = prompt()

export const fileCreator= () => {
    let action;
    do {
        action = promptFunc(cls.blue("Qué acción desea realizar? (Lectura: R, Edición: E, Creación: C, Eliminar: D, Salir: Q): "))
    } while (!(action === "R" || action === "E" || action === "C" || action === "D" || action === "Q"));

    if (action === "Q") {
        return;
    }

    const fileName = promptFunc(cls.blue("Por favor, ingrese el nombre del archivo: "))
    const dirName = `./files/${fileName}`

    switch (action) {
        case "R":
            fs.access(
                dirName,
                constants.R_OK,
                error => {
                    if (error) {
                        console.log(cls.red("Este archivo no se puede leer"))
                    } else {
                        const file = fs.readFileSync(dirName)
                        const data = file.toString()
                        console.log(cls.green(data))
                    }
                }
            )
            break;
        case "C":
            const data = promptFunc(cls.blue("Por favor, ingrese el contenido del archivo: "))
            const buffer = new Uint8Array(Buffer.from(data));
            fs.writeFileSync(dirName, buffer, error => {
                if (error) {
                    console.log(cls.red("Lo sentimos, no hemos podido crear el archivo"))
                }
                console.log(cls.green("El archivo se ha creado correctamente"))
            })
            
            break;
        case "E":
            fs.access(
                dirName,
                constants.R_OK | constants.W_OK,
                error => {
                    if (error) {
                        console.log(cls.red("Este archivo no se puede leer y/o no se puede escribir."))
                    } else {
                        const finalData = promptFunc(cls.blue("Por favor, ingrese el contenido del archivo: "))
                        const buffer = new Uint8Array(Buffer.from(finalData));
                        fs.writeFileSync(dirName, buffer, error => {
                            if (error) {
                                console.log(cls.red("Lo sentimos, no hemos podido modificar el archivo"))
                            }
                            console.log(cls.green("El archivo se ha modificado correctamente"))
                        })
                    }
                }
            )
            break;
        case "D":
            fs.rm(dirName, error => {
                if (error) {
                    console.log(cls.red("Lo sentimos, no hemos podido eliminar el archivo"))
                }
                console.log(cls.green("El archivo se ha eliminado correctamente"))
            })
            break;
        default:
            break;
    }
}