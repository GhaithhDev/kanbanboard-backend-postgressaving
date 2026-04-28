
export type boardAuthorizedUser = {
    username: string,
    color: number
}

export class BoardResponse {
    boardId!: string;
    name!: string;
    columnIds!: string[];
    authorizedUsers!: boardAuthorizedUser[]
}