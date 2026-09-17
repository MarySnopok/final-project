import { GeneralButton } from "./GeneralButton";
import { useNavigate } from "react-router";

export const LinkButton = ({ children, onPress, to, ...rest }) => {
  const navigate = useNavigate();
  return (
    <GeneralButton check={rest.check} onPress={() => navigate(to)} {...rest}>
      {children}
    </GeneralButton>
  );
};
