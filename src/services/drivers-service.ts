import { findAllDrivers, jsonDeleteById,restoreDriversFile} from '../repositories/drivers-repository';
import { deleteByIdParams } from '../models/Driver-DeleteById-Params';
import * as path from 'path';

export const getDrivers = () => {
    const drivers = findAllDrivers()
    return drivers;
}

    export const deleteDriverById = (id: number):deleteByIdParams => {
        let isDeleted = jsonDeleteById(id);
        return isDeleted 
};

export const restoreDrivers = async () => {
    
    let backupDirectory = path.join(__dirname, "./utils-service/restoreDrivers.json")
    const backup = await restoreDriversFile(backupDirectory)
    return backup
}