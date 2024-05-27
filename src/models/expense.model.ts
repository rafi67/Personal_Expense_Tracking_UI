import { User } from "./user.model";

export interface Expenses {
    expenseID: string;
    expenseTitle: string;
    expenseAmount: string;
    expenseDate: string;
    expenseCategoryID: string;
    expenseReference: string;
    userID: string; 
    expenseCategories: ExpenseCategories;
    users: User   
}

export interface ExpenseCategories {
    expenseCategoryID: string;
    categoryName: string;
}