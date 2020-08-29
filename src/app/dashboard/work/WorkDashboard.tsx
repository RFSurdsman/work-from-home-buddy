import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card, Heading, Clock } from "grommet";
import Todolist from "./todolist";

interface WorkDashboardProps {
  startHomeMode: () => void;
  time: number;
}
const WorkDashboard = (props: WorkDashboardProps) => {
  const { startHomeMode, time } = props;


  return (
    <>
       <Heading level="1">Good morning, Tony</Heading>
      <Clock type="digital" size="xlarge" margin="medium" />
      <Button
        primary
        label={"Finish Work"}
        color="secondary"
        onClick={startHomeMode}
      />
      <Todolist />
    </>
  )
};

export default WorkDashboard;