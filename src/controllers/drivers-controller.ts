import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {Routes} from "../routes.ts/route";
import {StatusCode} from "./utils-controller/status-code"
import { ApplicationType } from './utils-controller/type-application';
import {getDrivers, deleteDriverById, restoreDrivers} from "../services/drivers-service";
import { deleteByIdParams } from '../models/Driver-DeleteById-Params';


const DEFAULT_TYPE = 'Content-Type'
export const getAllDrivers = async (app: FastifyInstance) => {

    app.get(Routes.drivers, async (request: FastifyRequest, response: FastifyReply) => {
        response.type(ApplicationType.APPLICATION_JSON).code(StatusCode.OK); 
        let drivers = getDrivers();
        return drivers;
    });
}

export const deleteDrivers = async (app: FastifyInstance) => {
    app.delete(Routes.drivers + "/:id", async (request: FastifyRequest <{ Params: { id: string; }; }>, response: FastifyReply) => {

            const id = parseInt(request.params.id, 10); 
            let drivers: deleteByIdParams = deleteDriverById(id); 
            let content = {
                Message: `Driver Not Found -> ${id}`,
                IsDriverDeleted: drivers.isTrue,
                DataBase: drivers.drivers
            }
            if (drivers.isTrue != true) {
                return response.header(DEFAULT_TYPE, ApplicationType.APPLICATION_JSON).code(StatusCode.NOT_FOUND).send(content);
            }else{
                return response.header(DEFAULT_TYPE, ApplicationType.APPLICATION_JSON).code(StatusCode.NO_CONTENT).send();
            }
    });
};

export const resetDrivers = async (app: FastifyInstance) => {

    app.get(Routes.restore, async (request: FastifyRequest, response: FastifyReply) => {
        let result = await restoreDrivers()
        return response.header(DEFAULT_TYPE, ApplicationType.APPLICATION_JSON).code(StatusCode.OK).send(result);
    })
}