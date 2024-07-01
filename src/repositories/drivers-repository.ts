import * as fs from 'fs';
import * as path from 'path';
import {deleteByIdParams} from "../models/Driver-DeleteById-Params"
import {Driver} from "../models/Driver"

const pathData = path.join(__dirname, '../database/drivers.json')

export const findAllDrivers = ():JSON => {
    const language = 'utf-8'
    const rawData = fs.readFileSync(pathData, language)
    let jsonFile =  JSON.parse(rawData)
    return jsonFile
}

export const jsonDeleteById = (id: number):deleteByIdParams => {

    let drivers = readDriversFile(); 
    let isTrue = true;

    const index = drivers.findIndex((driver) => driver.id === id);

    if (index !== -1) { 
        drivers.splice(index, 1); 
        saveDriversFile(drivers); 
    } else {
        console.log(`Driver with ID ${id} not found.`);
        isTrue = false;
    }
    return { drivers, isTrue};
};

export const readDriversFile = ():Driver[] => {
    const rawData = fs.readFileSync(pathData, 'utf-8');
    return JSON.parse(rawData);
};

export const restoreDriversFile  = async (backupPath: string) => {

    let origin = pathData
    let readBackupFile = fs.readFileSync(backupPath, 'utf-8')
    fs.writeFileSync(origin, readBackupFile,'utf-8');
    return JSON.parse(fs.readFileSync(origin, 'utf-8'))
}

const saveDriversFile = (drivers: Driver[]) => {
    fs.writeFileSync(pathData, JSON.stringify(drivers, null, 2), 'utf-8');
};

