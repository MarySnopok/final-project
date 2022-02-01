import { NavBar } from "../ui_fractions/NavBar";
import { NavButton } from "../ui_fractions/NavButton";
import { Link } from "./router/react-router";
import colors from "../utils/colors.json";

export const NavSection = ({ routes }) => {
  return (
    <>
      <NavBar>
        {routes.map((route) => {
          return (
            <Link key={route.link} to={route.link} style={{ textDecoration: "none" }} color={colors[0].font}>
              <NavButton>{route.title}</NavButton>
            </Link>
          );
        })}
      </NavBar>
    </>
  );
};
