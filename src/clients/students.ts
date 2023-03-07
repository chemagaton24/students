import axios from "axios";
import { StudentsType } from "../types/students";

const BASE_URL = "https://run.mocky.io/v3";

const studentCient = {
  getStudents: () =>
    axios.get<StudentsType[]>(
      `${BASE_URL}/79ebd782-efd6-469b-8dd5-663cf03406ad`
    ),
  getStudentById: async (id: number) => {
    const res = await axios.get<StudentsType[]>(
      `${BASE_URL}/79ebd782-efd6-469b-8dd5-663cf03406ad`
    );
    return res.data.find((item) => item.id === id);
  },
};

export default studentCient;
