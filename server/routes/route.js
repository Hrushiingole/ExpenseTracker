import express, { Router } from'express';
import { addExactExpense, addExpense } from '../controller/expense-controller.js';

const route=express.Router();





route.post('/addExpense',addExpense);

route.post('/addExactExpense',addExactExpense);










export default route;