import { NavLink } from "react-router-dom";
import { useGetStudentsInfos } from "../../hooks/queries/students";
import { Table, THead, Tr, Th, Td, TBody } from "../common/Table";
import { useState } from "react";
import { SortButton } from "../common/Button";
import { DisplayPicture } from "../display/DisplayPicture";

const Students = () => {
  const { data, setData, isLoading } = useGetStudentsInfos();
  const [nameSortAsc, setNameSortAsc] = useState(false);
  const [majorSortAsc, setMajorSortAsc] = useState(false);
  const [statusSortAsc, setStatusSortAsc] = useState(false);

  const sortByNameFn = () => {
    const arr = data;
    arr.sort((a, b) =>
      nameSortAsc ? -a.name.localeCompare(b.name) : a.name.localeCompare(b.name)
    );
    setData([...arr]);
    setNameSortAsc(!nameSortAsc);
  };

  const sortByMajorFn = () => {
    const arr = data;
    arr.sort((a, b) =>
      majorSortAsc
        ? -a.major!.localeCompare(b.major!)
        : a.major!.localeCompare(b.major!)
    );
    setData([...arr]);
    setMajorSortAsc(!majorSortAsc);
  };

  const sortByStatusFn = () => {
    const arr = data;
    arr.sort((a, b) =>
      statusSortAsc
        ? -a.status.localeCompare(b.status)
        : a.status.localeCompare(b.status)
    );
    setData([...arr]);
    setStatusSortAsc(!statusSortAsc);
  };

  return (
    <>
      <Table>
        <THead>
          <Tr>
            <Th>Profile</Th>
            <Th>
              <SortButton onClick={sortByNameFn} sortAscState={nameSortAsc}>
                Name
              </SortButton>
            </Th>
            <Th>Phone</Th>
            <Th>Email</Th>
            <Th>
              <SortButton onClick={sortByMajorFn} sortAscState={majorSortAsc}>
                Major
              </SortButton>
            </Th>
            <Th>
              <SortButton onClick={sortByStatusFn} sortAscState={statusSortAsc}>
                Status
              </SortButton>
            </Th>
            <Th>Total Course</Th>
          </Tr>
        </THead>
        <TBody>
          {isLoading && (
            <Tr>
              <Td colSpan={7}>loading...</Td>
            </Tr>
          )}
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>
                <DisplayPicture dp={require(`./dp/${item.dp}`)} />
              </Td>
              <Td>
                <NavLink to={`/${item.id}`}>
                  {item.name}
                  {item.nickname ? ` (${item.nickname})` : null}
                </NavLink>
              </Td>
              <Td>{item.phone}</Td>
              <Td>{item.email}</Td>
              <Td>{item.major}</Td>
              <Td>{item.status}</Td>
              <Td>{item.total_courses}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </>
  );
};

export default Students;
