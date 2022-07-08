import { NavLinkButton } from "./NavLinkButton";

export const CrossLinks = ({ routes }) => {
  return (
    <>
      {routes.map((route) => {
        return (
          <NavLinkButton key={route.link} to={route.link}>
            {route.title}
          </NavLinkButton>
        );
      })}
    </>
  );
};
