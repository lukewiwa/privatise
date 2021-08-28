const MENU_ID = "privatise-menu-item";

chrome.contextMenus.create({
  id: MENU_ID,
  title: "Open Current Tab In Private",
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === MENU_ID && tab?.url) {
    chrome.windows.create({ incognito: true, url: tab.url });
  }
});
