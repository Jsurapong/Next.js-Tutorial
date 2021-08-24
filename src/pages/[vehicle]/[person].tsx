import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { VehiclesPreson } from "../../../api/VehiclesPreson";
import { NextPageContext } from "next";

export interface PersonProps {
  ownersList?: VehiclesPreson[] | undefined;
}

export default function Person({ ownersList }: PersonProps) {
  const router = useRouter();

  const [owners, setOwners] = useState(ownersList);
  useEffect(() => {
    async function loadData() {
      const response = await axios.get(`http://localhost:4001/vehicles`, {
        params: {
          ownerName: router.query.person,
          vehicle: router.query.vehicle,
        },
      });

      const ownersList: VehiclesPreson[] | undefined = await response.data;
      setOwners(ownersList);
    }

    if (ownersList?.length == 0) {
      loadData();
    }
  }, []);

  if (!owners?.[0]) {
    return <div>loading...</div>;
  }

  return <pre>{owners[0]?.details}</pre>;
}

interface MyNextPageContext extends NextPageContext{
  query:{
    person:string;
    vehicle:string;
  }
}

Person.getInitialProps = async ({query,req}: MyNextPageContext) => {
  if (!req) {
    return { ownersList: [] };
  }

  const response = await axios.get(`http://localhost:4001/vehicles`, {
    params: {
      ownerName: query.person,
      vehicle: query.vehicle,
    },
  });

  const ownersList: VehiclesPreson[] | undefined = await response.data;
  return { ownersList: ownersList };
};
