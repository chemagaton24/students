import axios from "axios";
import { ProfileType } from "../types/profile";

const BASE_URL = "https://run.mocky.io/v3";

const profileCient = {
  getProfile: () =>
    axios.get<ProfileType[]>(
      `${BASE_URL}/214aef9d-b18a-4188-b55f-a25046408a7e`
    ),
};

export default profileCient;
