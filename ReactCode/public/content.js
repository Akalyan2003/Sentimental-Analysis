// content.js

// Function to inject a script into the page
function injectScript(file, node) {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.setAttribute("src", file);
  th.appendChild(s);
}

// Inject React components into the HTML
injectScript(chrome.extension.getURL("login.js"), "div#login");
injectScript(chrome.extension.getURL("dashboard.js"), "div#dashboard");

// Example of message passing
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchWebsiteUsage") {
    // Perform the action to fetch website usage
    // Example:
    const websiteUsage = [
      { url: "example.com", timeSpent: 10 },
      { url: "another-example.com", timeSpent: 15 },
    ];
    sendResponse({ data: websiteUsage });
  }
});
