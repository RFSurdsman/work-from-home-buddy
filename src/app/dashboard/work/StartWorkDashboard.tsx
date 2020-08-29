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
      Start Work Dashboard
      <Button
        primary
        label={"Get Started"}
        color="secondary"
        onClick={startWork}
      />
    </>
  );
};

export default StartWorkDashboard;
