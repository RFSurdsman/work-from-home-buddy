import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card, Heading, Clock } from "grommet";
import Todolist from "./todolist";
import createPersistedState from "use-persisted-state";
import MainWorkDashboard from "./MainWorkDashboard";
import StartWorkDashboard from "./StartWorkDashboard";
import BreakPage from "./BreakPage";

interface WorkDashboardProps {
  startHomeMode: () => void;
  time: number;
}
const WorkDashboard = (props: WorkDashboardProps) => {
  const { startHomeMode, time } = props;
  const [isBreak, setIsBreak] = createPersistedState("isBreak")(false);

  const useWorkStarted = createPersistedState("workStarted");
  const [isWorkStarted, setIsWorkStarted] = useWorkStarted(false);

  return (
    <>
      {isBreak ? 
        <BreakPage endBreak={() => setIsBreak(false)} />
      :
       (isWorkStarted) ?
          <MainWorkDashboard 
            startHomeMode={() => {
              startHomeMode()
              setTimeout(() => {
                setIsWorkStarted(false);
              }, 300);
            }}
            time={time}
          />
        :
          <StartWorkDashboard 
            startWork={() => {setIsWorkStarted(true)}}
            time={time}
          />
      }
    </>
  );
};

export default WorkDashboard;
