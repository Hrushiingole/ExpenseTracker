import express, { Router } from'express';
import { addExactExpense, addExpense } from '../controller/expense-controller.js';
import { addPercentExpense } from '../controller/expense-controller.js';
import {getUser} from '../controller/expense-controller.js'
const route=express.Router();





route.post('/addExpense',addExpense);

route.post('/addExactExpense',addExactExpense);
route.post('/addPercentExpense',addPercentExpense);
route.get('/getUser',getUser);









export default route;