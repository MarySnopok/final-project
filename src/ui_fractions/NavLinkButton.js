import { NavButton } from "./NavButton";
import { useNavigate } from "react-router";

export const NavLinkButton = ({ children, onPress, to, ...rest }) => {
  const navigate = useNavigate();
  return (
    <NavButton onPress={() => navigate(to)} {...rest}>
      {children}
    </NavButton>
  );
};
