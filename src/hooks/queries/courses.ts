import { useQuery } from "react-query";

import coursesClient from "../../clients/courses";

export const useGetCourses = () =>
  useQuery("COURSES", coursesClient.getCourses);
