import React, { useState, useEffect } from "react";
import "./App.css";
import { Box, Grommet, Button, Image, Card, Clock, Heading } from "grommet";
import createPersistedState from "use-persisted-state";
import cityGif from "./resources/city.gif";

import Todolist from "./todolist";

const Theme = {
  global: {
    colors: {
      home: "rgb(50, 250, 200)",
      work: "rgb(50, 200, 250)",
      secondary: "rgb(50, 150, 250)",
      text: "rgb(250, 250, 250)",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

export const ExtensionApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);

  return (
    <Grommet theme={Theme}>
      <Box
        height="medium"
        width="medium"
        align="center"
        justify="center"
        background="brand"
      >
        <Heading level="2">WFH Buddy</Heading>
        <Button
          primary
          label={isWorkMode ? " End work mode" : "Start work mode"}
          color="secondary"
          onClick={() => {
            console.log("BUTTON CLICKED");
            setIsWorkMode(!isWorkMode);
          }}
        />
      </Box>
    </Grommet>
  );
};

export const NewTabApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);

  return (
    <Grommet theme={Theme} full>
      <Box
        fill
        align="center"
        justify="center"
        background={isWorkMode ? "work" : "home"}
      >
        <Heading level="2">WFH Buddy</Heading>
        <Heading level="1">Good morning, Tony</Heading>
        <Clock type="digital" size="xlarge" margin="medium" />
        {/* <Heading level="1">{new Date(time).toLocaleTimeString()}</Heading> */}
        {/* <Image fit="cover" src={cityGif} /> */}
        <Button
          primary
          label={isWorkMode ? "End work mode" : "Start work mode"}
          color="secondary"
          onClick={() => {
            console.log("BUTTON CLICKED");
            setIsWorkMode(!isWorkMode);
          }}
        />
        <Todolist />
      </Box>
    </Grommet>
  );
};
