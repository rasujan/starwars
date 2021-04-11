import React, { useState } from "react";
import Head from "next/head";

//Componets
import Navbar from "@/components/Navbar";
import Planets from "../components/Planets";
import People from "@/components/People";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

// Create a client
const queryClient = new QueryClient();

function index() {
  const [comp, setComp] = useState("Planets");
  const renderedComp = (comp: string) => {
    switch (comp) {
      case "Planets":
        return <Planets />;
      case "People":
        return <People />;
      default:
        return <h1> No component Found </h1>;
    }
  };
  return (
    <div className="bg-black text-white h-full w-full">
      <Head>
        <title>Starwars</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="container mx-auto">
        <QueryClientProvider client={queryClient}>
          <Navbar setComp={setComp} comp={comp} />
          <div className="flex">{renderedComp(comp)}</div>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default index;
