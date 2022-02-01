import { useSelector } from "react-redux";

import { Map } from "./Map";
import { NavSection } from "../ui_fractions/NavSection";
import user from "../reducers/user";

export const EntryPage = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  console.log("accessTockem", accessToken);
  return (
    <>
      {!accessToken ? (
        <>
          <Map />
          <NavSection
            routes={[
              { title: "log in", link: "/signin" },
              { title: "sign up", link: "/signup" },
            ]}
          />
        </>
      ) : (
        <>
          <Map />
          <NavSection
            routes={[
              { title: "history", link: "/history" },
              { title: "profile", link: "/profile" },
            ]}
          />
        </>
      )}
    </>
  );
};
