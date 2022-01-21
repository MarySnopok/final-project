import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Card } from "../ui_fractions/Card";
import { Heading } from "../ui_fractions/Heading";

// import { API_URL } from "../utils/constants";
// import thoughts from "../reducers/thoughts";

export const Profile = () => {
  //   const thoughtsItems = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  //   useEffect(() => {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     };

  //     fetch(API_URL("thoughts"), options)
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
    <Card>
      <Heading>This is a logged in area - profile etc </Heading>
    </Card>
  );
};