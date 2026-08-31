export type MealArea = {
	name: string;
};

export type AreaApi = {
	strArea: string;
};

export type AreasApiResponse = {
	meals: AreaApi[] | null;
};
