import express from 'express';
import { userHistory, userMessage } from '../controller/message.controller.js';


const msgRoute = express.Router();


msgRoute.post('/message',userMessage);
msgRoute.post('/history',userHistory);


export {msgRoute}