import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import studentCient from "../../clients/students";
import { CoursesType } from "../../types/courses";
import { ProfileType } from "../../types/profile";
import { StudentListType } from "../../types/students";
import { useGetCourses } from "./courses";
import { useGetProfile } from "./profile";

export const useGetStudents = () =>
  useQuery("STUDENTS", studentCient.getStudents);

export const useGetStudentById = (id: number) => {
  const { data: students, isLoading } = useGetStudentsInfos();
  const [data, setData] = useState<StudentListType>();
  useEffect(() => {
    const res = students.find((item) => item.id === id);
    if (res) {
      setData({ ...res });
    }
  }, [students, id]);

  return { data, isLoading, setData };
};

export const useGetStudentsInfos = () => {
  const { data: students, isLoading: studentsIsLoading } = useGetStudents();
  const { data: courses, isLoading: coursesIsLoading } = useGetCourses();
  const { data: profile, isLoading: profileIsLoading } = useGetProfile();
  const [data, setData] = useState<StudentListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMajor = (arr: ProfileType[], id: number) => {
    const res = arr.find((item) => item.user_id === `user_${id}`);
    return res?.major;
  };

  const getYear = (arr: ProfileType[], id: number) => {
    const res = arr.find((item) => item.user_id === `user_${id}`);
    return res!.year;
  };

  const getDP = (arr: ProfileType[], id: number) => {
    const res = arr.find((item) => item.user_id === `user_${id}`);
    return res?.user_img ?? "default.jpg";
  };

  const getStatus = (arr: ProfileType[], id: number) => {
    const res = arr.find((item) => item.user_id === `user_${id}`);
    if (res?.status.length) {
      const reduceArr = res?.status.reduce(function (a, b) {
        return a.date > b.date ? a : b;
      });
      switch (reduceArr.type) {
        case 1:
          return "good";
        case 2:
          return "probation";
        case 3:
          return "inactive";
      }
    }
    return "Withdrawn";
  };

  const getTotalCourses = (arr: CoursesType[], id: number) => {
    let res = arr.filter((item) => item.user_id === `user_${id}`);

    const distinctArr = Array.from(
      new Set(res.map((item) => item.course_selection))
    );
    return distinctArr.length;
  };

  const getCourses = (arr: CoursesType[], id: number) => {
    let res = arr.filter((item) => item.user_id === `user_${id}`);

    const distinctArr = Array.from(
      new Set(
        res.map((item) => ({
          course_name: item.course_name,
          course_selection: item.course_selection,
          semester_code: item.semester_code,
          course_fee: item.course_fee,
        }))
      )
    );
    return distinctArr;
  };

  useEffect(() => {
    if (studentsIsLoading || coursesIsLoading || profileIsLoading)
      setIsLoading(true);
    else setIsLoading(false);
  }, [studentsIsLoading, coursesIsLoading, profileIsLoading]);

  useEffect(() => {
    if (students && profile && courses && !data.length) {
      setData([]);
      students.data.map((item) =>
        setData((prev) => [
          ...prev,
          {
            id: item.id,
            dp: getDP(profile.data, item.id),
            name: item.name,
            nickname: item.nickname,
            phone: item.phone,
            email: item.email,
            major: getMajor(profile.data, item.id),
            year: getYear(profile.data, item.id),
            status: getStatus(profile.data, item.id),
            total_courses: getTotalCourses(courses.data, item.id),
            courses: getCourses(courses.data, item.id),
          },
        ])
      );
    }
  }, [students, profile, courses, data.length]);

  return { data, setData, isLoading };
};
