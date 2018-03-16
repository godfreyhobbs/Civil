import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import { Plugin } from "../plugins";

export const Bold = styled.span`
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 700;
  font-size: 19px;
  color: #000000;
`;

export const bold = (options: any): Plugin => {
  return {
    renderMark(props: any): JSX.Element | void {
      if (props.mark.type === "bold") {
        return <Bold {...props}/>;
      }
    },
  };
};
