import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCurrency,
  useGetCurrencyRate,
} from "../../hooks/queries/currency";
import { useGetStudentById } from "../../hooks/queries/students";
import { SortButton } from "../common/Button";
import { FlexBox, FlexCol } from "../common/Flexbox";
import { Li, Ul } from "../common/List";
import { Table, THead, Tr, Th, Td, TBody } from "../common/Table";
import { DisplayPicture } from "../display/DisplayPicture";

const Profile = () => {
  const { id } = useParams();
  const { data, isLoading, setData } = useGetStudentById(parseInt(id!));
  const { data: currencyList, isLoading: currencyListIsLoading } =
    useGetCurrency();
  const [sortBySemester, setSortBySemester] = useState(false);
  const [currency, setCurrency] = useState<string>("USD");
  const [symbol, setSymbol] = useState<string>();
  const [rate, setRate] = useState<number>();
  const {
    data: currencyRate,
    isLoading: currencyRateIsLoading,
    isError: currencyRateIsError,
    error: currencyRateError,
  } = useGetCurrencyRate(currency);

  const sortBySemesterFn = () => {
    if (data) {
      const arr = data.courses;
      arr.sort((a, b) =>
        sortBySemester
          ? -a.semester_code!.localeCompare(b.semester_code!)
          : a.semester_code!.localeCompare(b.semester_code!)
      );
      setData({
        ...data,
        courses: [...arr],
      });
      setSortBySemester(!sortBySemester);
    }
  };
  useEffect(() => {
    if (currencyRate) {
      setRate(currencyRate.data.conversion_rate);
    }
  }, [currencyRate]);

  const changeCurrencyFn = (e: React.FormEvent<HTMLSelectElement>) => {
    const selKey = e.currentTarget.value;
    if (currencyList) {
      setCurrency(currencyList.data[selKey].code);
      setSymbol(currencyList.data[selKey].symbol);
    }
  };

  return (
    <>
      <FlexBox gap={16}>
        <FlexCol>
          {data && (
            <>
              <FlexBox gap={16} flexDirection="column">
                <DisplayPicture
                  dp={require(`./dp/${data.dp}`)}
                  size={130}
                  round
                />
                <Ul>
                  <Li>Name: {data.name}</Li>
                  <Li>Major: {data.major}</Li>
                  <Li>Year: {data.year}</Li>
                  <Li>Status: {data.status}</Li>
                </Ul>
              </FlexBox>
            </>
          )}
        </FlexCol>
        <FlexCol flexGrow={1}>
          <FlexBox gap={16}>
            <FlexCol>
              <select onChange={changeCurrencyFn}>
                {!currencyListIsLoading &&
                  currencyList &&
                  Object.keys(currencyList.data).map((item, key) => (
                    <option key={key}>{item}</option>
                  ))}
              </select>
            </FlexCol>
            <FlexCol>
              {currencyRateIsLoading && <>...loading</>}
              {currencyRateIsError && <>{currencyRateError.message}</>}
            </FlexCol>
          </FlexBox>
          <Table>
            <THead>
              <Tr>
                <Th>
                  <SortButton
                    onClick={sortBySemesterFn}
                    sortAscState={sortBySemester}
                  >
                    Semester Code
                  </SortButton>
                </Th>
                <Th>Course Name</Th>
                <Th>Course Selection</Th>
                <Th>Course Fee</Th>
              </Tr>
            </THead>
            <TBody>
              {isLoading && (
                <Tr>
                  <Td colSpan={4}>loading...</Td>
                </Tr>
              )}
              {!isLoading && (!data || (data && !data.courses.length)) && (
                <Tr>
                  <Td colSpan={4}>No data found.</Td>
                </Tr>
              )}
              {data &&
                data.courses.map((item, key) => (
                  <Tr key={key}>
                    <Td>{item.semester_code}</Td>
                    <Td>{item.course_name}</Td>
                    <Td>{item.course_selection}</Td>
                    <Td>
                      {symbol}
                      {(parseFloat(item.course_fee) * rate!).toFixed(2)}
                    </Td>
                  </Tr>
                ))}
            </TBody>
          </Table>
        </FlexCol>
      </FlexBox>
    </>
  );
};

export default Profile;
