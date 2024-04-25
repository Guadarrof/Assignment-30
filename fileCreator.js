import fs, { constants } from "node:fs";
import { Buffer } from "node:buffer";
import prompt from "prompt-sync";
import cls from "colors"

const promptFunc = prompt()

export const fileCreator= () => {
    let action;
    do {
        action = promptFunc(cls.blue("Qué acción desea realizar? Escribir en mayusculas (Crear: C, Leer : R, Modificar: M, Eliminar: D, Salir: Q): "))
    } while (!(action === "C" || action === "M" || action === "D" || action === "Q" || action === "R"));
    if (action === "Q") {
        return;
    }

    switch (action) {
        case "C":
            const fileName = promptFunc(cls.rainbow("Por favor, ingrese el nombre del archivo: "))
            const dirName = `./createdFiles/${fileName}`
            const data = promptFunc(cls.yellow("Por favor, ingrese el contenido del archivo: "))
            const buffer = new Uint8Array(Buffer.from(data));
            fs.writeFileSync(dirName, buffer, error => {
                if (error) {
                    console.log(cls.red("Lo sentimos, no hemos podido crear el archivo"))
                }
                console.log(cls.green("El archivo se ha creado correctamente"))
            })
            
            break;
        case "R":
            const fileToRead = promptFunc(cls.yellow("Por favor, ingrese el nombre del archivo que quiere leer: "));
            const filePathToRead = `./createdFiles/${fileToRead}`;
            fs.access(
                filePathToRead, fs.constants.F_OK, 
                error => {
                    if (error) {
                        console.log(cls.red("El archivo especificado no existe."));
                    } else {
                        fs.readFile(filePathToRead, (err, data) => {
                            if (err) {
                                console.log(cls.red("Lo sentimos, no hemos podido leer el archivo."));
                            } else {
                                console.log(cls.green("Contenido del archivo:"));
                                console.log(data.toString());
                            }
                        });
                    }
                })

            break;
        case "M":
            const fileToEdit = promptFunc(cls.yellow("Por favor, ingrese el nombre del archivo a editar: "));
            const filePathToEdit = `./createdFiles/${fileToEdit}`;
            fs.access(
                filePathToEdit, fs.constants.F_OK| constants.R_OK | constants.W_OK,
                error => {
                    if (error) {
                        console.log(cls.red("Este archivo no existe"))
                    } else {
                        const fileData = promptFunc(cls.rainbow("Por favor, ingrese el nuevo contenido del archivo: "))
                        const buffer = new Uint8Array(Buffer.from(fileData));
                        fs.writeFileSync(filePathToEdit, buffer, error => {
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
            const fileToDelete = promptFunc(cls.yellow("Por favor, ingrese el nombre del archivo a eliminar: "));
            const filePathToDelete= `./createdFiles/${fileToDelete}`;
            fs.rm(filePathToDelete, error => {
                if (error) {
                    console.log(cls.red("Lo sentimos, no hemos podido eliminar el archivo"))
                }else{
                    console.log(cls.green("El archivo se ha eliminado correctamente"))
                }
            })
            break;
        default:
            break;
    }
}