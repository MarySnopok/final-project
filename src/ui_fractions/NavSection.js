import { NavBar } from "../ui_fractions/NavBar";
import { NavLinkButton } from "./NavLinkButton";

export const NavSection = ({ routes }) => {
  return (
    <>
      <NavBar>
        {routes.map((route) => {
          return (
            <NavLinkButton key={route.link} to={route.link}>
              {route.title}
            </NavLinkButton>
          );
        })}
      </NavBar>
    </>
  );
};
