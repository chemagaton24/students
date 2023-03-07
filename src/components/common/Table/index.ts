import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-spacing: 1px;
  text-align: center;
  margin: 0 auto;
  font-size: 0.875rem;
`;

export const THead = styled.thead`
  color: #fff;

  button {
    color: #fff;
    font-weight: 700;
  }
`;

export const Tr = styled.tr`
  background-color: #b7c4e4;

  :nth-child(even) {
    background-color: #dae1f0;
  }
`;

export const Th = styled.th`
  padding: 8px;
  background-color: #4f71be;
`;

export const TBody = styled.tbody``;

export const Td = styled.td`
  padding: 8px;

  a {
    color: #000;
  }
`;
