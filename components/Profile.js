import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { View } from "react-native-web";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";
import { Card } from "../ui_fractions/Card";
import { Heading } from "../ui_fractions/Heading";
import { NavSection } from "../ui_fractions/NavSection";

import user from "../reducers/user";
import { FavoriteRoute } from "../ui_fractions/FavoriteRoute";
import { SubHeading } from "../ui_fractions/SubHeading";

export const Profile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  //   useEffect(() => {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     };

  //     fetch(API_URL("profile"), options)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.success) {
  //           dispatch(thoughts.actions.setItems(data.response));
  //           dispatch(thoughts.actions.setError(null));
  //         } else {
  //           dispatch(thoughts.actions.setItems([]));
  //           dispatch(thoughts.actions.setError(data.response));
  //         }
  //       });
  //   }, [accessToken, dispatch]);

  return (
    <LayoutRoot>
      <LayoutFlex>
        <Card>
          <Heading>Hi {username}!</Heading>
          <SubHeading>Your favorite routes:</SubHeading>
          <View>
            <FavoriteRoute isChecked={false} text={"Route name 1"} distance={"7.5km"} duration={"2.30h"} difficulty={"moderate"} />

            <FavoriteRoute isChecked={false} text={"Route name 2"} distance={"14.5km"} duration={"6.30h"} difficulty={"hard"} />

            <FavoriteRoute isChecked={false} text={"Route name 3"} distance={"0.5km"} duration={"0.20h"} difficulty={"easy"} />

            <FavoriteRoute isChecked={false} text={"Route name 4"} distance={"3.5km"} duration={"1.00h"} difficulty={"moderate"} />

            <FavoriteRoute isChecked={false} text={"Route name 5"} distance={"1.5km"} duration={"0.30h"} difficulty={"easy"} />
          </View>
        </Card>
      </LayoutFlex>
      <LayoutNavbar>
        <NavSection
          routes={[
            { title: "home", link: "/entrypage" },
            { title: "history", link: "/history" },
            { title: "log out", link: "/" },
          ]}
        />
      </LayoutNavbar>
    </LayoutRoot>
  );
};
