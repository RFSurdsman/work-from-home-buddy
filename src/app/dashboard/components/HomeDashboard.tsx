import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card } from "grommet";

interface HomeDashboardProps {
  startWorkMode: () => void;
  time: number;
}
const HomeDashboard = (props: HomeDashboardProps) => {
  const { startWorkMode, time } = props;

  return (
    <>
      <h3>Good morning, Tony</h3>
      <h1>{new Date(time).toLocaleTimeString()}</h1>
      <Button
        primary
        label={"Start work mode"}
        color="secondary"
        onClick={startWorkMode}
      />
    </>
  )
};

export default HomeDashboard;