import { Priority } from "..//enums/priority";

export interface Card {
    id: string;
    title: string,
    description?: string,
    priority: Priority,
    assignee?: string,
    startDate: Number,
    dueDate?: Date,
    columnId: string
}
