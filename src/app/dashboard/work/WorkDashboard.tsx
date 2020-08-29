import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card, Heading, Clock } from "grommet";
import Todolist from "./todolist";
import createPersistedState from "use-persisted-state";
import MainWorkDashboard from "./MainWorkDashboard";
import StartWorkDashboard from "./StartWorkDashboard";

interface WorkDashboardProps {
  startHomeMode: () => void;
  time: number;
}
const WorkDashboard = (props: WorkDashboardProps) => {
  const { startHomeMode, time } = props;

  const useWorkStarted = createPersistedState("workStarted");
  const [isWorkStarted, setIsWorkStarted] = useWorkStarted(false);

  return (
    <>
       {(isWorkStarted) ?
          <MainWorkDashboard 
            startHomeMode={() => {
              setIsWorkStarted(false)
              startHomeMode()
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
  )
};

export default WorkDashboard;