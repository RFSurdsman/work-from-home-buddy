import React, { useState, useEffect } from "react";
import "./App.css";
import _ from "lodash";
import { Box, Grommet, Button, Image, Card } from "grommet";
import createPersistedState from "use-persisted-state";
import cityGif from "./resources/city.gif";

import Todolist from "./todolist";


interface WindowInfo {
  url: string[];
  height?: number | undefined;
  width?: number | undefined;
  top?: number | undefined;
  left?: number | undefined;
  type: string;
  state: string;
}

const commonTheme = {
  font: {
    family: "Roboto",
    size: "36px",
    height: "40px",
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

const update_windows = (savedWindows: WindowInfo[], setSavedWindows: (windows: WindowInfo[]) => void) => {
  chrome.windows.getAll({populate: true}, (windows) => {
    const saved_windows: WindowInfo[] = windows.map(window => {
      const window_state = _.pick(window, ['height', 'width', 'top', 'left', 'type', 'state']);
      const urls = window.tabs!
                    .map(tab => tab.url!)
                    .filter(url => !url.startsWith("chrome://newtab"));
      chrome.windows.remove(window.id);
      console.log(urls)
      return {...window_state, url: urls};
    });

    savedWindows.forEach((window: WindowInfo, i: Number) => {
        (i === savedWindows.length - 1) ?
          chrome.windows.create({...window, url: ["chrome://newtab", ...window.url]})
        :
          chrome.windows.create({...window})
    })

    setSavedWindows(saved_windows);
  });
}
// function MyApp() {
//   const [isWorkMode, setIsWorkMode] = useState(false);
//   const [homeBookmarkId, setHomeBookmarkId] = useState('');

  // const setupWorkMode = (isWorkMode: boolean, setHomeBookmarkId: any) => {
  //   chrome.windows.getAll({ 'populate': true }, windows => {
  //     console.log(windows);
  //   });
    
  //   chrome.bookmarks.getTree(bookmarkTree => {
  //     // Store bookmarks in bookmark bar
  //     if (!bookmarkTree[0].children) {
  //       // Error because bookmark tree always has two children
  //       return;
  //     }
  //     let bookmarkBar = bookmarkTree[0].children[0];

  //     console.log(bookmarkBar);


  //     if (isWorkMode) {
  //       chrome.bookmarks.create({
  //         'title': 'My Home Bookmarks'
  //       }, (homeBookmarks) => {
  //         setHomeBookmarkId(homeBookmarks.id);
  //         bookmarkBar.children && bookmarkBar.children.forEach(bookmark => {
  //           chrome.bookmarks.move(bookmark.id, { 'parentId': homeBookmarks.id });
  //         })
  //         console.log('Successfully created home bookmarks with id: ' + homeBookmarks.id);
  //       })
  //     } else {
  //       chrome.bookmarks.getChildren(homeBookmarkId, children => {
  //         children.forEach(bookmark => {
  //           chrome.bookmarks.move(bookmark.id, { 'parentId': bookmarkBar.id });
  //         })
  //       })
  //       console.log('Removed bookmark with id: ' + homeBookmarkId);
  //       setHomeBookmarkId('');
  //     }
      
  //   });
//   }

export const ExtensionApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const useWindowsState = createPersistedState("windows");

  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);
  const [savedWindows, setSavedWindows] = useWindowsState([] as WindowInfo[]);

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
            update_windows(savedWindows, setSavedWindows);
            setIsWorkMode(!isWorkMode);
          }}
        />
      </Box>
    </Grommet>
  );
};

export const NewTabApp = () => {
  const useWorkModeState = createPersistedState("workMode");
  const useWindowsState = createPersistedState("windows");
  const useHomeBookmarksIdState = createPersistedState('homeBookmarksId');
  const useWorkBookmarksIdState = createPersistedState('workBookmarksId');
  const [isWorkMode, setIsWorkMode] = useWorkModeState(false);
  const [homeBookmarksId, setHomeBookmarksId] = useHomeBookmarksIdState('');
  const [workBookmarksId, setWorkBookmarksId] = useWorkBookmarksIdState('');
  const [savedWindows, setSavedWindows] = useWindowsState([] as WindowInfo[]);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    setInterval(() => {
      setTime(Date.now());
    }, 1000);
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
        {/* <Image fit="cover" src={cityGif} /> */}
        <Button
          primary
          label={isWorkMode ? " End work mode" : "Start work mode"}
          color="secondary"
          onClick={() => {
            update_windows(savedWindows, setSavedWindows);
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
