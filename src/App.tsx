import React, { useState, useEffect } from "react";
import "./App.css";
import { Box, Grommet, Button } from "grommet";
import createPersistedState from "use-persisted-state";

const commonTheme = {
  font: {
    family: "Roboto",
    size: "36px",
    height: "20px",
  },
};

const HomeModeTheme = {
  global: {
    ...commonTheme,
    colors: {
      brand: "rgb(40, 230, 150)",
      secondary: "rgb(50, 150, 250)",
      text: "#ebebeb",
    },
  },
};

const WorkModeTheme = {
  global: {
    ...commonTheme,
    colors: {
      brand: "rgb(50, 200, 250)",
      secondary: "rgb(50, 150, 250)",
      text: "#ebebeb",
    },
  },
};

// function MyApp() {
//   const [isWorkMode, setIsWorkMode] = useState(false);
//   const [homeBookmarkId, setHomeBookmarkId] = useState('');

//   const setupWorkMode = (isWorkMode: boolean, setHomeBookmarkId: any) => {
//     chrome.windows.getAll({ 'populate': true }, windows => {
//       console.log(windows);
//     });
    
//     chrome.bookmarks.getTree(bookmarkTree => {
//       // Store bookmarks in bookmark bar
//       if (!bookmarkTree[0].children) {
//         // Error because bookmark tree always has two children
//         return;
//       }
//       let bookmarkBar = bookmarkTree[0].children[0];

//       console.log(bookmarkBar);


//       if (isWorkMode) {
//         chrome.bookmarks.create({
//           'title': 'My Home Bookmarks'
//         }, (homeBookmarks) => {
//           setHomeBookmarkId(homeBookmarks.id);
//           bookmarkBar.children && bookmarkBar.children.forEach(bookmark => {
//             chrome.bookmarks.move(bookmark.id, { 'parentId': homeBookmarks.id });
//           })
//           console.log('Successfully created home bookmarks with id: ' + homeBookmarks.id);
//         })
//       } else {
//         chrome.bookmarks.getChildren(homeBookmarkId, children => {
//           children.forEach(bookmark => {
//             chrome.bookmarks.move(bookmark.id, { 'parentId': bookmarkBar.id });
//           })
//         })
//         console.log('Removed bookmark with id: ' + homeBookmarkId);
//         setHomeBookmarkId('');
//       }
      
//     });
//   }

export const ExtensionApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);

  return (
    <Grommet theme={isWorkMode ? WorkModeTheme : HomeModeTheme}>
      <Box
        height="medium"
        width="medium"
        align="center"
        justify="center"
        background="brand"
      >
        <h1>WFH Buddy</h1>
        <Button
          primary
          label={isWorkMode ? " End work mode" : "Start work mode"}
          color="secondary"
          onClick={() => {
            let workMode = !isWorkMode;
            setupWorkMode(workMode, setHomeBookmarkId);
            setIsWorkMode(workMode);
          }}
        />
      </Box>
    </Grommet>
  );
};

export const NewTabApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    setInterval(() => {
      setTime(Date.now());
    }, 1000);
  });

  return (
    <Grommet theme={isWorkMode ? WorkModeTheme : HomeModeTheme} full>
      <Box fill align="center" justify="center" background="brand">
        <h6>WFH Buddy</h6>
        <h3>Good morning, Tony</h3>
        <h1>{new Date(time).toLocaleTimeString()}</h1>
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
