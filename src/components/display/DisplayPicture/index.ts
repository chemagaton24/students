import styled from "styled-components";

export const DisplayPicture = styled.div<{
  dp: string;
  size?: number;
  round?: true | never;
}>`
  background-image: url("${({ dp }) => dp}");
  background-size: cover;
  width: ${({ size }) => (size ? size + `px` : "50px")};
  height: ${({ size }) => (size ? size + `px` : "50px")};
  border-radius: ${({ round }) => (round ? `999px` : "0")};
  border: ${({ round }) => (round ? `6px solid #769cb2` : "0")};
  margin: 0 auto;
`;
