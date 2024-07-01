import * as fs from 'fs';
import * as path from 'path';
const pathData = path.join(__dirname, '../database/teams.json')


export const findAllTeams = () => {

    const language = 'utf-8'
    const rawData = fs.readFileSync(pathData, language)
    let jsonFile =  JSON.parse(rawData)
    
    return jsonFile
}