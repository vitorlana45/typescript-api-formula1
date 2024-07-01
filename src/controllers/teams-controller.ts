import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {Routes} from "../routes.ts/route";
import {StatusCode} from "./utils-controller/status-code"
import { ApplicationType } from './utils-controller/type-application';
import { getTimePerName, getTeams } from "../services/teams-services"

const DEFAULT_TYPE = 'Content-Type'

export const getAllTeams = async (app: FastifyInstance) => {
    app.get(Routes.teams, async (request: FastifyRequest, response: FastifyReply) => {

        response.type(ApplicationType.APPLICATION_JSON).code(StatusCode.OK); 
        let teams = getTeams();
        return teams;
    });
}

export const getTeamsPerName = async (app: FastifyInstance) => {
    app.get(Routes.teams + "/:name", async (request: FastifyRequest <{Params: {name: string}}>, response: FastifyReply) => {

        let searchTeam = request.params.name
        let teams = await getTimePerName(searchTeam)

        let contetErrorSearch = {
            Message: `Team Not Found -> ${searchTeam}`,
            DataBase: teams
        }

        if(teams !== undefined){
            response.header(DEFAULT_TYPE,ApplicationType.APPLICATION_JSON).code(StatusCode.OK).send(teams); 
        }
        else {
            let databaseTeams = getTeams();
            contetErrorSearch.DataBase = databaseTeams
            response.header(DEFAULT_TYPE,ApplicationType.APPLICATION_JSON).code(StatusCode.NOT_FOUND).send(contetErrorSearch); 
        }
    })
}