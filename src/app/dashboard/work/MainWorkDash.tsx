import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card, Heading, Clock } from "grommet";
import Todolist from "./todolist";
import createPersistedState from "use-persisted-state";

interface MainWorkDashboardProps {
  startHomeMode: () => void;
  time: number;
}
const MainWorkDashboard = (props: MainWorkDashboardProps) => {
  const { startHomeMode, time } = props;

  return (
    <>
    </>
  )
};

export default MainWorkDashboard;