export interface Expenses {
    expenseID: string;
    expenseTitle: string;
    expenseAmount: string;
    expenseDate: string;
    expenseCategoryID: string;
    expenseReference: string; 
    expenseCategories: ExpenseCategories;   
}

export interface ExpenseCategories {
    expenseCategoryID: string;
    categoryName: string;
}