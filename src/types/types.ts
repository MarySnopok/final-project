import { Point, ProcessedRoute, RouteId } from "./BE.types";

export interface FERoute extends ProcessedRoute {
    color: string;
}

export interface SearchResult {
    status: "init" | "loading" | "success" | "no-access" | "error";
    location: Point;
    radius?: number;
    routes: FERoute[];
    ids?: RouteId[];
}