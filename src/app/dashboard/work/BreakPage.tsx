import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Meter } from "grommet";

interface Props {
  endBreak: () => void;
}

const BreakPage: React.FC<Props> = (props: Props): JSX.Element => {
  const { endBreak } = props;

  const [progressValue, setProgressValue] = useState(0);

  const incrementMeter = () => {
    setTimeout(() => {
      setProgressValue((progressValue) => progressValue + 0.1);
      incrementMeter();
    }, 100);
  };

  useEffect(incrementMeter, []);

  return (
    <Box
      align="center"
      justify="center"
      background="brand"
      pad="large"
      round="medium"
    >
      <Heading level="1">Relax - you're on a Pomodoro break.</Heading>
      <Heading level="2">5 minutes remaining.</Heading>
      <Meter
        values={[
          {
            value: progressValue,
            color: "secondary",
          },
        ]}
        round
        type="circle"
        aria-label="meter"
        thickness="large"
      />
      <br />
      <Button primary label="End Break" color="secondary" onClick={endBreak} />
    </Box>
  );
};

export default BreakPage;
