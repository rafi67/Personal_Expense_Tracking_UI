import { User } from "./user.model";

export interface Incomes {
    incomeId: string;
    salaryTitle: string;
    salaryAmount: string;
    categoryID: string;
    date: string;
    reference: string;
    userID: string;
    categories: Categories;
    users: User;
}

export interface Categories {
    categoryID: string;
    categoryName: string;
}