import { ChartData } from "./ChartData";

export interface ChartComponentProps {

    competitionId: number;
    competitionName: string;
    scores: ChartData[];
}