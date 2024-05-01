export interface Incomes {
    incomeId: string;
    salaryTitle: string;
    salaryAmount: string;
    categoryID: string;
    date: string;
    reference: string;
    categories: Categories;
}

export interface Categories {
    categoryID: string;
    categoryName: string;
}