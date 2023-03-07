import axios from "axios";
import { CoursesType } from "../types/courses";

const BASE_URL = "https://run.mocky.io/v3";

const coursesCient = {
  getCourses: () =>
    axios.get<CoursesType[]>(
      `${BASE_URL}/34bdbb5f-70c0-41ce-aa0c-2bf46befa477`
    ),
};

export default coursesCient;
