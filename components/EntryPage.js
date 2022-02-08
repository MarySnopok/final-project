import { useSelector } from "react-redux";

import { Map } from "./Map";
import { NavSection } from "../ui_fractions/NavSection";
import user from "../reducers/user";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";

export const EntryPage = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  return (
    <>
      <LayoutRoot>
        <LayoutFlex>
          <Map />
        </LayoutFlex>
        <LayoutNavbar>
          <NavSection
            routes={
              !accessToken
                ? [
                    { title: "log in", link: "/signin" },
                    { title: "sign up", link: "/signup" },
                  ]
                : [
                    { title: "history", link: "/history" },
                    { title: "profile", link: "/profile" },
                  ]
            }
          />
        </LayoutNavbar>
      </LayoutRoot>
    </>
  );
};
