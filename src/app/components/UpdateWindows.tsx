import { WindowInfo } from "../types";
import _ from "lodash";

export const updateWindows = (savedWindows: WindowInfo[], setSavedWindows: (windows: WindowInfo[]) => void) => {
    
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