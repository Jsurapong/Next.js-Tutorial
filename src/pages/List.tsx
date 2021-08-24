import axios  from "axios";
import Link from "next/link";
import { VehiclesPreson } from "../../api/VehiclesPreson";


export interface ListProps {
  ownersList: VehiclesPreson[] | undefined;
}

export default function List({ ownersList }: ListProps) {
  // const [owners, setOwners] = useState([]);
  // useEffect(() => {
  //   async function loadData() {
  //     const response = await fetch('http://localhost:4001/vehicles');
  //     const ownersList = await response.json();
  //     setOwners(ownersList);
  //   }

  //   loadData();
  // }, []);

  return (
    <div>
      {ownersList?.map((e, index) => (
        <div key={index}>
          <Link as={`/${e.vehicle}/${e.ownerName}`} href="/[vehicle]/[person]">
            <a>
              Navigate to {e.ownerName}'s {e.vehicle}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}


List.getInitialProps = async () => {
  const response = await axios("http://localhost:4001/vehicles");

  const ownersList: VehiclesPreson[] | undefined = await response.data;
  return { ownersList: ownersList };
};
