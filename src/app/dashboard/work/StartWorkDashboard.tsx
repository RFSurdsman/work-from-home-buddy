import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card, Heading, Clock } from "grommet";
import Todolist from "./todolist";

interface StartWorkDashboardProps {
  startWork: () => void;
  time: number;
}
const StartWorkDashboard = (props: StartWorkDashboardProps) => {
  const { startWork, time } = props;

  return (
    <>
      <Box align="center" justify="center" flex="grow">
        <Heading level="1">Good morning, Tony</Heading>
        <Clock type="digital" size="xlarge" margin="medium" />
        <Button
          primary
          label={"Get Started"}
          color="secondary"
          onClick={startWork}
        />
      </Box>
    </>
  );
};

export default StartWorkDashboard;
