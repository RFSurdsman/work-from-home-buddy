import { WindowInfo } from "../types";
import _ from "lodash";

const updateWindows = (
  savedWindows: string,
  setSavedWindows: (windows: string) => void,
  setMode: () => void
) => {
  chrome.windows.getAll({ populate: true }, (windows) => {
    let window_ids = [] as number[];
    const new_saved_windows: WindowInfo[] = windows.map((window) => {
      window_ids.push(window.id);
      const window_state = _.pick(window, [
        "height",
        "width",
        "top",
        "left",
        "type",
        "state",
      ]);
      const urls = window
        .tabs!.map((tab) => tab.url!)
        .filter((url) => !url.startsWith("chrome://newtab"));
      return { ...window_state, url: urls };
    });

    console.log(savedWindows);
    const saved_windows =
      savedWindows.length > 0 ? JSON.parse(savedWindows) : [];
    console.log(savedWindows);
    saved_windows.length > 0
      ? saved_windows.forEach((window: WindowInfo, i: Number) => {
          i === saved_windows.length - 1
            ? chrome.windows.create({
                ...window,
                url: ["chrome://newtab", ...window.url],
              })
            : chrome.windows.create({ ...window });
        })
      : chrome.windows.create({});

    setTimeout(() => {
      window_ids.forEach((id) => {
        chrome.windows.remove(id);
      });
      setMode();
    }, 300);

    setSavedWindows(JSON.stringify(new_saved_windows));
  });
};

export default updateWindows;
