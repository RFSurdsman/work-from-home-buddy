import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card } from "grommet";
import Todolist from "../../../todolist";

interface WorkDashboardProps {
  startHomeMode: () => void;
  time: number;
}
const WorkDashboard = (props: WorkDashboardProps) => {
  const { startHomeMode, time } = props;


  return (
    <>
      <h3>Good morning, Tony</h3>
      <h1>{new Date(time).toLocaleTimeString()}</h1>
      <Button
        primary
        label={"Start work mode"}
        color="secondary"
        onClick={startHomeMode}
      />
      <Todolist />
    </>
  )
};

export default WorkDashboard;