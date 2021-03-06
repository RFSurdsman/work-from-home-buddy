import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card, Heading, Clock } from "grommet";
import TitleBar from "../components/TitleBar";

interface HomeDashboardProps {
  startWorkMode: () => void;
  time: number;
}
const HomeDashboard = (props: HomeDashboardProps) => {
  const { startWorkMode, time } = props;

  return (
    <>
      <TitleBar menu={true}/>
      <Box flex="grow" align="center" justify="center">
        <Heading level="2">Balance</Heading>
        <Heading level="1">Good morning, Tony</Heading>
        <Clock type="digital" size="xlarge" margin="medium" />
        <Button
          primary
          label={"Start Work"}
          color="secondary"
          onClick={startWorkMode}
        />
      </Box>
    </>
  );
};

export default HomeDashboard;
