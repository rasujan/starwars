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

const getPeople = async () => {
  const res = await axios.get("api/people");
  return res.data;
};

function People() {
  const { data, status } = useQuery("People", getPeople);

  const PeopleListLoading = () => {
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

  const PeopleList = (props: any) => {
    const { people } = props;
    return (
      <div className="flex flex-col text-sm border border-yellow-50 m-2 p-2">
        <h1 className="text-xl  text-yellow-300"> {people.name}</h1>
        <p> Birth Year - {people.birth_year} </p>
        <p> Gender - {people.gender} </p>
        <p> Height - {people.height} </p>
        <p> Mass - {people.mass}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-screen">
      <div className="flex justify-start justify-items-center m-2 p-2">
        <h1 className="text-xl text-yellow-300">People</h1>
      </div>
      <div className="flex flex-col justify-start justify-items-center m-2 p-2 ">
        {status === "loading" && <PeopleListLoading />}
        {status === "error" && (
          <h1> Something Went Wrong While Fetching data</h1>
        )}
        {status === "success" && (
          <div className="grid grid-cols-1 w-full mx-auto sm:grid-cols-2 md:grid-cols-3 place-items-stretch place-content-start  md:h-screen md:overflow-auto">
            {data.results.map((people) => (
              <PeopleList people={people} key={people.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default People;
