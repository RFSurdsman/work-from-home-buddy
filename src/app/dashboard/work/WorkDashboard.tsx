import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card, Heading, Clock } from "grommet";
import Todolist from "./todolist";
import createPersistedState from "use-persisted-state";
import BreakPage from "./BreakPage";

interface WorkDashboardProps {
  startHomeMode: () => void;
  time: number;
}
const WorkDashboard = (props: WorkDashboardProps) => {
  const { startHomeMode, time } = props;
  const [isBreak, setIsBreak] = createPersistedState("isBreak")(false);

  return isBreak ? (
    <BreakPage endBreak={() => setIsBreak(false)} />
  ) : (
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
  );
};

export default WorkDashboard;
