import React from "react";
import { Box, Clock, Heading } from "grommet";
import MenuButton from "./MenuButton";

interface TitleBarProps {
  menu?: boolean;
  heading?: boolean;
  clock?: boolean;
}
const TitleBar = (props: TitleBarProps) => {
  const {menu, heading, clock} = props;
  return (
    <Box direction="row" margin={{bottom: "medium"}} justify="between">
      {menu && <MenuButton/>}
      {heading && <Heading level="3" margin={{top: "small", left: "xlarge"}}>Balance</Heading>}
      {clock && <Clock type="digital" size="medium" margin="small"/>}
    </Box>
    )
}

export default TitleBar;