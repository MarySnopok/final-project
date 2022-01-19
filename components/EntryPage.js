import { Map } from "./Map";
import { NavBar } from "../ui_fractions/NavBar";
import { NavButton } from "../ui_fractions/NavButton";
import { Link } from "react-router-dom";
import colors from "../utils/colors.json";

export const EntryPage = () => {
  return (
    <>
      <Map />
      <NavBar>
        <Link to="/login" style={{ textDecoration: "none" }} color={colors[0].font}>
          <NavButton children={"log in"} />
        </Link>
        <Link to="/signup" style={{ textDecoration: "none" }} color={colors[0].font}>
          <NavButton children={"sign up"} />
        </Link>
      </NavBar>
    </>
  );
};
