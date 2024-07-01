import fastify, { FastifyInstance } from 'fastify';
import { getAllTeams, getTeamsPerName} from './controllers/teams-controller'; 
import {getAllDrivers, deleteDrivers,resetDrivers} from "./controllers/drivers-controller"



const app = fastify({ logger: true });

app.register(getAllDrivers);
app.register(getAllTeams);
app.register(deleteDrivers);
app.register(resetDrivers);
app.register(getTeamsPerName)

export { app };
