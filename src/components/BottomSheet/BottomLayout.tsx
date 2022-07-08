import { useSelector } from "react-redux";
import { getCurrentScreen } from "../../reducers/app";
import { PossibleScreens } from "../../types/app.types";
import { HomeLayout } from "./HomeLayout";
import { LoadingLayout } from "./LoadingLayout";
import { RouteLayout } from "./RouteLayout";
import { SearchResultLayout } from "./SearchResult";


  
export const BottomLayout = ({ loading }: { loading?: boolean }) => {

  const currentScreen = useSelector(getCurrentScreen);

  if (loading) {
    return <LoadingLayout />
  }

  if (currentScreen.type === PossibleScreens.routeScreen) {
    return <RouteLayout screen={currentScreen} />
  }

  if (currentScreen.type === PossibleScreens.searchResultScreen) {
    return <SearchResultLayout screen={currentScreen} />
  }

  return <HomeLayout />
};
