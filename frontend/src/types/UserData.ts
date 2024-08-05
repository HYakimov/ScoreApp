import { FormData } from "./FormData";

export class UsersData {

    users: FormData[];

    constructor(data: FormData[]) {
        this.users = data;
    }
}