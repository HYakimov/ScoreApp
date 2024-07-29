import { Competition } from "../competition.entity";
import { CompetitionDto } from "./competition.dto";

export class CompetitionsDto {

    data: CompetitionDto[];

    static create(competitions: Competition[]): CompetitionsDto {
        const record = new CompetitionsDto();
        record.data = competitions.map(competition => CompetitionDto.create(competition));

        return record;
    }
}

