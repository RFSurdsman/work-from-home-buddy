import React from "react";
import { HomeModeTheme, WorkModeTheme } from "../styles/themes";
import createPersistedState from "use-persisted-state";
import { Box, Grommet } from "grommet";

const NotificationApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);

  return (
    <Grommet theme={isWorkMode ? WorkModeTheme : HomeModeTheme}>
      <Box
        height="200px"
        width="400px"
        align="center"
        justify="center"
        background="brand"
        round="large"
      >
        <h4>NOTIFICATION</h4>
      </Box>
    </Grommet>
  );
};

export default NotificationApp;
