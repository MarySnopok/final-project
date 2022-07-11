import { APIResponse, ProcessedRoute, RoutesResponse } from "../types/BE.types";
import { API_URL } from "./constants";

const get = async <T>(
  slug: string,
  query?: Record<string, string | number>,
  auth?: string
) => {
  const url = query
    ? API_URL(slug) +
      "?" +
      encodeURI(
        Object.entries(query)
          .map(([key, val]) => `${key}=${val}`)
          .join("&")
      )
    : API_URL(slug);
  const resp = await fetch(url, {
    ...(auth && {
      headers: {
        Authorization: auth,
      },
    }),
  });
  if (resp.status >= 400) {
    throw new Error("resp returned bad status");
  }

  const data: APIResponse<T> = await resp.json();

  if (data.status !== "success") {
    throw new Error("Not successful response");
  }

  return data.response!;
};

export const API = {
  tracks: (lat: number, long: number, radius?: number) =>
    get<RoutesResponse>("tracks2", {
      lat,
      long,
      ...(radius && { radius }),
    }),
  // fetch(`${API_URL("tracks2")}?${encodeURI(`lat=${lat}&long=${long}`)}`).then(
  //   async (resp) => {
  // const data: APIResponse<RoutesResponse> = await resp.json();
  //   }
  // ),
  user: {
    getFavorite: (token: string) => {
      return get<ProcessedRoute[]>("favorite", undefined, token);
    },
  },
};
