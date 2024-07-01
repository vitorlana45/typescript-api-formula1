import * as fs from 'fs';

export const readFileJson = (path: string) => {

    const language = 'utf-8'
    const rawData = fs.readFileSync(path, language)
    let jsonFile =  JSON.parse(rawData)
    return jsonFile
}