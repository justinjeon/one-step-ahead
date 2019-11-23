/*global chrome*/

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ queuedSites: [] }, function() {});

  chrome.storage.sync.get(["queuedSites"], function(result) {
    console.log(result);
  });
});

chrome.alarms.onAlarm.addListener(alarm => {
  // Remove entry after the window is opened
  chrome.storage.sync.get(["queuedSites"], function(result) {
    let newArray = result.queuedSites.filter(entry => entry !== alarm.name);
    chrome.storage.sync.set({ queuedSites: newArray }, function() {});
  });

  let websitePos = alarm.name.indexOf(" ");
  let website = alarm.name.slice(0, websitePos);
  chrome.windows.create({ url: "https://www." + website });
});
