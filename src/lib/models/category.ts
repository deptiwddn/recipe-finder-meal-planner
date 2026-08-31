export type Category = {
	name: string;
	image: string;
	description: string;
};

export type CategoryApi = {
	strCategory: string;
	strCategoryThumb: string;
	strCategoryDescription: string;
};

export type CategoriesApiResponse = {
	categories: CategoryApi[];
};
