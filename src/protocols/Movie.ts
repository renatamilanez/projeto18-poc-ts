export type MovieEntity = {
    id: number,
    name: string,
    plataform: string,
    genre: string
};

export type Movie = Omit<MovieEntity, "id">;