import React from "react";
import {
  Box,
  Grommet,
  Card,
  CardHeader,
  CardBody,
  Meter,
  Button,
} from "grommet";

const theme = {
  global: {
    font: {
      family: "Roboto",
    },
    colors: {
      brand: "rgb(40, 230, 150)",
      secondary: "rgb(50, 150, 250)",
      text: "#ebebeb",
    },
  },
};

const NotificationApp = () => {
  return (
    <Grommet theme={theme}>
      <Card
        pad="10px"
        height="200px"
        width="400px"
        align="center"
        justify="center"
        background="brand"
        round="large"
      >
        <CardHeader pad="small">
          <b>Pomdoro Notification</b>
        </CardHeader>
        <CardBody pad="medium" direction="row">
          <Box align="center" justify="center" height="100%" width="50%">
            <h2 style={{ textAlign: "center" }}>Time for a break soon!</h2>
            <Button primary label="Start" color="secondary" />
          </Box>
          <Box align="center" justify="center" height="100%" width="50%">
            <Meter
              values={[
                {
                  value: 60,
                  label: "sixty",
                  color: "rgb(50, 200, 250)",
                  onClick: () => {},
                },
              ]}
              round
              type="circle"
              aria-label="meter"
              thickness="large"
            />
          </Box>
        </CardBody>
      </Card>
    </Grommet>
  );
};

export default NotificationApp;
