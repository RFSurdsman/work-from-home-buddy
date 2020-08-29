import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Box, Grommet, Button, Image, Card, Heading, Clock } from "grommet";
import createPersistedState from "use-persisted-state";
import Todolist from "../../todolist";
import { WindowInfo } from "../types";
import { updateWindows } from "../components/UpdateWindows";
import theme from "../styles/theme";

const NewTabApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const useWindowsState = createPersistedState("windows");
  const useHomeBookmarksIdState = createPersistedState("homeBookmarksId");
  const useWorkBookmarksIdState = createPersistedState("workBookmarksId");
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);
  const [homeBookmarksId, setHomeBookmarksId] = useHomeBookmarksIdState("");
  const [workBookmarksId, setWorkBookmarksId] = useWorkBookmarksIdState("");
  const [savedWindows, setSavedWindows] = useWindowsState([] as WindowInfo[]);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    setInterval(() => {
      setTime(Date.now());
    }, 1000);
  });

  const toggleBookmarks = (isWorkMode: boolean) => {
    chrome.bookmarks.getTree((bookmarkTree) => {
      // Store bookmarks in bookmark bar
      if (!bookmarkTree[0].children) {
        // Error because bookmark tree always has two children
        return;
      }
      let bookmarkBar = bookmarkTree[0].children[0];

      if (isWorkMode) {
        chrome.bookmarks.create(
          {
            title: "Home Bookmarks",
          },
          (homeBookmarks) => {
            setHomeBookmarksId(homeBookmarks.id);
            bookmarkBar.children &&
              bookmarkBar.children.forEach((bookmark) => {
                chrome.bookmarks.move(bookmark.id, {
                  parentId: homeBookmarks.id,
                });
              });
          }
        );

        chrome.bookmarks.getChildren(workBookmarksId, (children) => {
          children.forEach((bookmark) => {
            chrome.bookmarks.move(bookmark.id, { parentId: bookmarkBar.id });
          });

          chrome.bookmarks.remove(workBookmarksId);
        });
        setWorkBookmarksId("");
      } else {
        chrome.bookmarks.create(
          {
            title: "Work Bookmarks",
          },
          (workBookmarks) => {
            setWorkBookmarksId(workBookmarks.id);
            bookmarkBar.children &&
              bookmarkBar.children.forEach((bookmark) => {
                chrome.bookmarks.move(bookmark.id, {
                  parentId: workBookmarks.id,
                });
              });
          }
        );

        chrome.bookmarks.getChildren(homeBookmarksId, (children) => {
          children.forEach((bookmark) => {
            chrome.bookmarks.move(bookmark.id, { parentId: bookmarkBar.id });
          });

          chrome.bookmarks.remove(homeBookmarksId);
        });
        setHomeBookmarksId("");
      }
    });
  };

  return (
    <Grommet theme={theme} full>
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
            updateWindows(savedWindows, setSavedWindows);
            let workMode = !isWorkMode;
            toggleBookmarks(workMode);
            setIsWorkMode(workMode);
          }}
        />
        <Todolist />
      </Box>
    </Grommet>
  );
};

export default NewTabApp;
