import styled from "styled-components";

export const FlexBox = styled.div<{
  gap?: number;
  flexDirection?:
    | "row"
    | "row-reverse"
    | "column"
    | "column-reverse"
    | "initial"
    | "inherit";
}>`
  display: flex;
  width: 100%;
  gap: ${(p) => p.gap}px;
  align-items: center;
  flex-direction: ${(p) => p.flexDirection ?? undefined};
`;

export const FlexCol = styled.div<{
  flexGrow?: 1 | 0;
}>`
  flex-grow: ${(p) => p.flexGrow};
`;
