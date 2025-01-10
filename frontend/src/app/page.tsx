import axios from "axios";
import Tables from "@/components/Tables/Tables";
import { hom } from "@/utils/api";

interface UserFromAPI {
  id: string;
  name: string;
  address: string;
  description: string;
  troubleshoot: string;
  portainer: string;
  user_id: {
    username: string;
    first_name: string;
    last_name: string;
    patronymic: string;
    email: string;
    speciality: string;
  }[];
}

export default async function Home() {

  return (
    <div className="font-roboto mx-10 ">
      <Tables  />
    </div>
  );
}

