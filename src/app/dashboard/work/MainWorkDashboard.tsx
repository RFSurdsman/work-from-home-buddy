import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card, Heading, Clock } from "grommet";
import TitleBar from "../components/TitleBar";

interface MainWorkDashboardProps {
  startHomeMode: () => void;
  time: number;
}
const MainWorkDashboard = (props: MainWorkDashboardProps) => {
  const { startHomeMode, time } = props;

  return (
    <>
      <TitleBar/>
      <Box align="center" justify="center" flex="grow">
        <Button
          primary
          label={"Finish Work"}
          color="secondary"
          onClick={startHomeMode}
        />
      </Box>
    </>
  )
};

export default MainWorkDashboard;