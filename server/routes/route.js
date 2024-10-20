import express, { Router } from'express';
import { addExpense } from '../controller/expense-controller.js';

const route=express.Router();





route.post('/addExpense',addExpense);












export default route;