export class UserBasicDto {

    id: number;
    name: string;

    static create(user: any): UserBasicDto {
        const record = new UserBasicDto();
        record.id = user.id;
        record.name = `${user.firstName} ${user.lastName}`;

        return record;
    }
}