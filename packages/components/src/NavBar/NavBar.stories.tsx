import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";
import * as React from "react";
import { NavBar } from "./NavBar";

const balance = "100,203";
const votingBalance = "1,200";

storiesOf("Nav Bar", module)
  .addDecorator(StoryRouter())
  .add("Global Nav", () => {
    return <NavBar balance={balance} votingBalance={votingBalance} />;
  });
