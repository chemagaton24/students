import { SortButtonSX } from "./style";
import { BsArrowDownShort } from "react-icons/bs";

interface SortButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  sortAscState: boolean;
}

export const SortButton = (props: SortButtonProps) => {
  const { children, sortAscState, ...restProps } = props;
  return (
    <SortButtonSX {...restProps}>
      <span>{props.children}</span>
      <BsArrowDownShort
        size={20}
        style={{
          transform: sortAscState ? "rotate(180deg)" : undefined,
        }}
      />
    </SortButtonSX>
  );
};
