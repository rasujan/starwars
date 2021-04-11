import classes from "*.module.css";
import axios from "@/utils/axios";
import React, { Fragment } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

// Create a client
const queryClient = new QueryClient();

const getPlanets = async () => {
  const res = await axios.get("api/planets");
  return res.data;
};

function Planets() {
  const { data, status } = useQuery("planets", getPlanets);
  console.log("Planets Data", data);
  console.log("Planets Get Satus", status);

  const PlanetListLoading = () => {
    let indents = [];
    for (let i = 1; i < 10; i++) {
      indents.push(
        <div
          key={i}
          className="flex flex-col text-sm border border-white m-2 p-2"
        >
          <div className="animate-pulse flex space-x-2">
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-yellow-100 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-2 bg-white rounded"></div>
                <div className="h-2 bg-white rounded"></div>
                <div className="h-2 bg-white rounded"></div>
                <div className="h-2 bg-white rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 w-full mx-auto sm:grid-cols-2 md:grid-cols-3 place-items-stretch place-content-center ">
        {" "}
        {indents}
      </div>
    );
  };

  const PlanetList = (props: any) => {
    const { planet } = props;
    return (
      <div className="flex flex-col text-sm border border-yellow-50 m-2 p-2">
        <h1 className="text-xl  text-yellow-300"> {planet.name}</h1>
        <p> Population - {planet.population} </p>
        <p> Terrain - {planet.terrain} </p>
        <p> Gravity - {planet.gravity} </p>
        <p> Diameter - {planet.diameter}</p>
        <p> Orbital Period - {planet.orbital_period}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-screen">
      <div className="flex justify-start justify-items-center m-2 p-2">
        <h1 className="text-xl text-yellow-300">Planets</h1>
      </div>
      <div className="flex flex-col justify-start justify-items-center m-2 p-2 ">
        {status === "loading" && <PlanetListLoading />}
        {status === "error" && (
          <h1> Something Went Wrong While Fetching data</h1>
        )}
        {status === "success" && (
          <div className="grid grid-cols-1 w-full mx-auto sm:grid-cols-2 md:grid-cols-3 place-items-stretch place-content-start  md:h-screen md:overflow-auto">
            {data.results.map((planet) => (
              <PlanetList planet={planet} key={planet.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Planets;
