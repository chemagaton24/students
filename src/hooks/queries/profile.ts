import { useQuery } from "react-query";

import profileCient from "../../clients/profile";

export const useGetProfile = () => useQuery("PROFILE", profileCient.getProfile);
