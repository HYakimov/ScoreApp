import { IsNotEmpty } from "class-validator";

export class CreateCompetitionDto {

    @IsNotEmpty()
    name: string;
}