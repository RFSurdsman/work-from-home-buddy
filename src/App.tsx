import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

type MostVisitedURL = chrome.topSites.MostVisitedURL;

function App() {
  const [visitedURLs, setVisitedURLs] = useState<MostVisitedURL[]>([]);

  useEffect(() => {
    console.log(chrome);
    chrome.topSites.get((data) => {
      setVisitedURLs(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>WORK FROM HOME BUDDY.</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lfdsakljdsfadfslakj
        </a>
        <p>
          {visitedURLs.map((url, index) => (
            <p key={url.url}>
              <a
                className="App-link"
                target="_blank"
                rel="noopener noreferrer"
                href={url.url}
              >
                {url.title}
              </a>
            </p>
          ))}
        </p>
      </header>
    </div>
  );
}

export default App;
