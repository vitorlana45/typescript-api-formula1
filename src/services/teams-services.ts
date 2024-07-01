import { findAllTeams } from '../repositories/team-repository';
import { readFileJson } from './utils-service/read-file-json';
import * as path from 'path'


export const getTeams = () => {
    let teams = findAllTeams()
    return teams;
}

export const getTimePerName = async (name: string) => {

    const pathData = path.join(__dirname,"../database/teams.json")
    const teams = readFileJson(pathData)

    let finded

    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
            finded = teams[i]
            console.log("findeddddd", finded)
        }
    }

    if (finded === undefined) {
        
    }
    return finded;
}