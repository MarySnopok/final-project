import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <>
      <Card>
        <Heading>Hi {username}!</Heading>
        <SubHeading>Your favorite routes:</SubHeading>

        <FavoriteRoute isChecked={false} text={"Route 1"} />

        <FavoriteRoute isChecked={false} text={"Route 1"} />

        <FavoriteRoute isChecked={false} text={"Route 1"} />

        <FavoriteRoute isChecked={false} text={"Route 1"} />

        <FavoriteRoute isChecked={false} text={"Route 1"} />

        <FavoriteRoute isChecked={false} text={"Route 1"} />
      </Card>
      <NavSection
        routes={[
          { title: "home", link: "/entrypage" },
          { title: "log out", link: "/" },
        ]}
      />
    </>
  );
};
