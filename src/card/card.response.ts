import { Priority } from "src/enums/priority";

export class CardResponse {
    id!: string;
    title!: string;
    description!: string;
    priority!: Priority;
    parentColumnId!: string;
    externalWorker?: string;
}