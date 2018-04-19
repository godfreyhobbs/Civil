import * as React from "react";
import { CivilEditor, plugins } from "@joincivil/editor";
import styled from "styled-components";
import { getCivil } from "../helpers/civilInstance";

// TODO(nickreynolds): get colors from constants file
const Button = styled.button`
  background-color: #2b56ff;
  font-family: "Libre Franklin", sans-serif;
  font-weight: 700;
  color: #ffffff;
  border: none;
  font-size: 18px;
  text-align: center;
  &.active {
    color: #30e8bd;
  }
  &.disabled {
    background-color: #c4c2c0;
  }
`;

export const initialJSON = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text:
                  "twenty miles 1234567890 farther up the Mississippi River, and he spent more than a decade trying to lure a similar facility to Osceola—using the city’s resources to buy a power plant so that it could sell electricity cheaply and preserving land by the river for industry rather than residential development. In 2013, when a former Nucor executive named John Correnti toured the state to lobby legislators for a hundred and forty million dollars in tax breaks to build the Big River Steel plant, Kennemore went",
              },
            ],
          },
        ],
      },
    ],
  },
};

export interface EditorState {
  value: any;
  resultURL: string;
  publishInProgress: boolean;
}

class Editor extends React.Component<{}, EditorState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: initialJSON,
      resultURL: "",
      publishInProgress: false,
    };
  }
  public render(): JSX.Element {
    return (
      <>
        <CivilEditor plugins={plugins} value={initialJSON} onChange={this.onChange} readyOnly={false} />
        <Button onClick={this.onProposeClicked} disabled={this.state.publishInProgress}>
          Publish to IPFS
        </Button>
        {this.state.resultURL && "Published to: " + this.state.resultURL}
      </>
    );
  }

  private onChange = (value: any): any => {
    this.setState({ value });
  };

  private onProposeClicked = async (e: any): Promise<void> => {
    this.setState({ publishInProgress: true });
    const civil = getCivil();
    const value = JSON.stringify(this.state.value.toJSON());
    const uri = await civil.publishContent(value);
    this.setState({ resultURL: uri });
    this.setState({ publishInProgress: false });
  };
}

export default Editor;
