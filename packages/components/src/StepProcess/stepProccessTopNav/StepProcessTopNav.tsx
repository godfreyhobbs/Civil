import * as React from "react";
import styled from "styled-components";
import { colors } from "../../styleConstants";
import { StepProps } from "./Step";

export interface StepsProps {
  activeIndex?: number;
  children: Array<React.ReactElement<StepProps>>;
  startPosition?: number;
  onActiveTabChange?(activeIndex: number): void;
}

export interface StepProcessTopNavState {
  activeIndex: number;
  startPosition?: number;
}

const StyledNav = styled.div`
  position: relative;
  height: 76px;
  margin: 0 auto 50px;
  width: 100%;
  & > ul {
    justify-content: space-between;
  }
`;

const StyledContainer = styled.ul`
  display: flex;
  list-style: none;
  margin: 0 auto;
  padding: 0;
`;

export class StepProcessTopNav extends React.Component<StepsProps, StepProcessTopNavState> {
  constructor(props: StepsProps) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex || 0,
    };
  }

  public componentDidUpdate(prevProps: StepsProps, prevState: StepProcessTopNavState): void {
    if (typeof this.props.activeIndex === "undefined") {
      return;
    }
    if (this.props.activeIndex !== prevProps.activeIndex) {
      this.setState({ activeIndex: this.props.activeIndex });
    } else if (prevProps.activeIndex !== prevState.activeIndex && this.props.activeIndex !== this.state.activeIndex) {
      this.setState({ activeIndex: this.props.activeIndex });
    }
  }

  public renderTabs(): Array<React.ReactElement<StepProps>> {
    return React.Children.map(this.props.children, (child: React.ReactChild, index) => {
      return React.cloneElement(child as React.ReactElement<StepProps>, {
        index,
        startPosition: this.state.startPosition,
        isCurrent: this.state.activeIndex === index,
        isActive: this.state.activeIndex >= index,
        onClick: this.handleClick,
        setStartPosition: index === 0 ? this.setStartPosition : undefined,
      });
    });
  }

  public renderContent(): React.ReactNode | undefined {
    const children = this.props.children;
    const { activeIndex } = this.state;
    if (children[activeIndex]) {
      return children[activeIndex].props.children;
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        <StyledNav>
          <StyledContainer>{this.renderTabs()}</StyledContainer>
        </StyledNav>
        <div>{this.renderContent()}</div>
      </div>
    );
  }

  private setStartPosition = (position: number): void => {
    this.setState({ startPosition: position });
  };

  private handleClick = (index: number): void => {
    this.setState({ activeIndex: index });
  };
}
