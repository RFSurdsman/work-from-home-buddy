import React, { useState, useEffect } from "react";
import { Box, Grommet, Button, Image, Card, Heading, Clock, Grid } from "grommet";
import TitleBar from "../components/TitleBar";
import theme from '../../styles/theme';

interface MainWorkDashboardProps {
  startHomeMode: () => void;
}
const MainWorkDashboard = (props: MainWorkDashboardProps) => {
  const { startHomeMode } = props;

  return (
    <>
      <Grommet full theme={theme}>
        <TitleBar/>
        <Button
          primary
          label={"Finish Work"}
          color="secondary"
          onClick={startHomeMode}
        />
        <Grid
          rows={['large']}
          columns={['1/4', 'auto', 'auto']}
          areas={[
            { name: 'time', start: [0, 0], end: [0, 0] },
            { name: 'schedule', start: [1, 0], end: [1, 0] },
            { name: 'tasks', start: [2, 0], end: [2, 0] },
          ]}  
        >
          <Box gridArea="time" background="dark-2" justify='center' align='center'>
            <Clock type='digital' precision='minutes' size='xlarge' />
            <Button primary color='secondary' label="Take a Break" />
          </Box>
          <Box gridArea="schedule" background="light-5" />
          <Box gridArea="tasks" background="light-2" />
        </Grid>
      </Grommet>
    </>
  )
};

export default MainWorkDashboard;