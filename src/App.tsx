import React, { useState, useEffect } from "react";
import "./App.css";
import { Box, Grommet, Button } from "grommet";
import createPersistedState from "use-persisted-state";

declare var gapi: any;

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
            setIsWorkMode(workMode);
          }}
        />
      </Box>
    </Grommet>
  );
};

export const NewTabApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const useHomeBookmarksIdState = createPersistedState('homeBookmarksId');
  const useWorkBookmarksIdState = createPersistedState('workBookmarksId');
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);
  const [homeBookmarksId, setHomeBookmarksId] = useHomeBookmarksIdState('');
  const [workBookmarksId, setWorkBookmarksId] = useWorkBookmarksIdState('');
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    setInterval(() => {
      setTime(Date.now());
    }, 1000);

    console.log(gapi);
  });

  const toggleBookmarks = (isWorkMode: boolean) => {    
    chrome.bookmarks.getTree(bookmarkTree => {
      // Store bookmarks in bookmark bar
      if (!bookmarkTree[0].children) {
        // Error because bookmark tree always has two children
        return;
      }
      let bookmarkBar = bookmarkTree[0].children[0];

      if (isWorkMode) {
        chrome.bookmarks.create({
          'title': 'Home Bookmarks'
        }, (homeBookmarks) => {
          setHomeBookmarksId(homeBookmarks.id);
          bookmarkBar.children && bookmarkBar.children.forEach(bookmark => {
            chrome.bookmarks.move(bookmark.id, { 'parentId': homeBookmarks.id });
          });
        });

        chrome.bookmarks.getChildren(workBookmarksId, children => {
          children.forEach(bookmark => {
            chrome.bookmarks.move(bookmark.id, { 'parentId': bookmarkBar.id });
          });

          chrome.bookmarks.remove(workBookmarksId);
        });
        setWorkBookmarksId('');

      } else {
        chrome.bookmarks.create({
          'title': 'Work Bookmarks'
        }, (workBookmarks) => {
          setWorkBookmarksId(workBookmarks.id);
          bookmarkBar.children && bookmarkBar.children.forEach(bookmark => {
            chrome.bookmarks.move(bookmark.id, { 'parentId': workBookmarks.id });
          });
        });

        chrome.bookmarks.getChildren(homeBookmarksId, children => {
          children.forEach(bookmark => {
            chrome.bookmarks.move(bookmark.id, { 'parentId': bookmarkBar.id });
          });

          chrome.bookmarks.remove(homeBookmarksId);
        });
        setHomeBookmarksId('');

      }
    });
  };

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
            let workMode = !isWorkMode;
            toggleBookmarks(workMode);
            setIsWorkMode(workMode);
          }}
        />
      </Box>
    </Grommet>
  );
};