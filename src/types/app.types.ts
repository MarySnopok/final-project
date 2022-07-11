import { Point, RouteId } from "./BE.types";
import { FERoute } from "./types";

export enum PossibleScreens {
    homeScreen = 'homeScreen',
    routeScreen = 'routeScreen',
    searchResultScreen = 'searchResultScreen',
}

export interface SearchResultScreen {
    type: PossibleScreens.searchResultScreen,
    results: RouteId[],
}

export interface RouteScreen {
    type: PossibleScreens.routeScreen,
    route: RouteId,
}

export interface HomeScreen {
    type: PossibleScreens.homeScreen;
}

export type ScreenState = HomeScreen | SearchResultScreen | RouteScreen;

export interface AppMainState {
  screenStack: ScreenState[];
  loginPage: null | "login" | "singUp" | "profile";
  loading?: boolean;
}



export interface RoutesState {
  routes: Record<RouteId, FERoute>;
  error: any | undefined;
  status: "init" | "loading" | "success" | "no-access" | "error";
}

export interface GeoState {
    currentLocation?: Point;
    status: "init" | "loading" | "success" | "no-access"; // | 'manual'; manual for picking city manually
  }


export interface UserState {
    userId?: string;
    username?: string;
    accessToken?: string;
    email?: string;
    error?: Error;
    favorite: RouteId[];
    coordinates: any; // use actual coordinate type
    userImage?: string;
  }
  

export interface RootState {
    app: AppMainState;
    routes: RoutesState;
    geo: GeoState;
    user: UserState;
  }

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
