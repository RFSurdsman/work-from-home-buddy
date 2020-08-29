import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card, Heading, Clock } from "grommet";

interface HomeDashboardProps {
  startWorkMode: () => void;
  time: number;
}
const HomeDashboard = (props: HomeDashboardProps) => {
  const { startWorkMode, time } = props;

  return (
    <>
      <Box flex="grow" align="center" justify="center">
        <Heading level="2">WFH Buddy</Heading>
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
  )
};

export default HomeDashboard;