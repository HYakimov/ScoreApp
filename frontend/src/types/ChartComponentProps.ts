import { ChartData } from "./ChartData";

export interface ChartComponentProps {

    id: number;
    name: string;
    scores: ChartData[];
}