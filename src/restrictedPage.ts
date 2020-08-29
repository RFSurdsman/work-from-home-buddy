console.log("Loading Restricted Page Content Page.");
chrome.runtime.sendMessage(
  { method: "getLocalStorage", key: "workMode" },
  function (response) {
    if (response.data === "true") {
      const illegalWebsites = ["reddit", "youtube", "facebook"];
      if (
        illegalWebsites.find((website) =>
          window.location.href.includes(website)
        )
      ) {
        document.getElementsByTagName("html")[0].innerHTML =
          "<h1>You are not allowed to access this page in work mode.</h1>";
      }
    }
  }
);
