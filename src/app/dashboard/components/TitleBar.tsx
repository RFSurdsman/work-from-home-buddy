import React from "react";
import { Box, Clock, Heading } from "grommet";
import MenuButton from "./MenuButton";

interface TitleBarProps {
  menu: boolean;
  heading: boolean;
  clock: boolean;
}
const TitleBar = () => {
  return (
    <Box direction="row" margin={{bottom: "medium"}} justify="between">
      <MenuButton/>
      <Heading level="3" margin={{top: "small", left: "xlarge"}}>Balance</Heading>
      <Clock type="digital" size="medium" margin="small"/>
    </Box>
    )
}

export default TitleBar;