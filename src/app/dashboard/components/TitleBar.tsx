import React from "react";
import { Box, Clock, Heading } from "grommet";
import MenuButton from "./MenuButton";
import { WiDaySunny } from "weather-icons-react";

const TitleBar = () => {
  return (
    <Box direction="row" justify="between" margin={{bottom: "medium"}}>
      <MenuButton/>
      <Heading level="3" margin={"small"}>WFH Buddy</Heading>
      <Clock type="digital" size="medium" margin="small"/>
    </Box>
    )
}

export default TitleBar;