export interface Incomes {
    incomeId: string;
    salaryAmount: string;
    reference: string;
    categories: Categories;
}

export interface Categories {
    categoryID: string;
    categoryName: string;
}