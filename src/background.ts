chrome.runtime.onInstalled.addListener(() => {
  console.log("On inStalled.");
  console.log(chrome.cookies);
});
