console.log("Loading Content Page.");

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

if (
  !document.getElementById("root-iframe") &&
  !document.getElementById("root") &&
  !document.getElementById("root-newtab")
) {
  console.log(chrome.runtime.getURL("iframe.html"));
  const iframe = document.createElement("iframe");
  iframe.id = "work-from-home-buddy-iframe";
  iframe.src = chrome.runtime.getURL("iframe.html");
  iframe.style.width = "400px";
  iframe.style.height = "200px";
  iframe.style.position = "fixed";
  iframe.style.top = "20px";
  iframe.style.right = "20px";
  iframe.style.border = "0";
  iframe.style.zIndex = "2147483649";
  document.body.appendChild(iframe);
}
