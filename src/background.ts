const FULLSCREEN_MENU_ID = "toggleFullscreen";

// 拡張機能のインストール時にコンテキストメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: FULLSCREEN_MENU_ID,
    title: "全画面表示",
    contexts: ["all"]
  });
});

// メニュークリック時のイベントリスナー
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === FULLSCREEN_MENU_ID) {
    toggleFullScreenInTab(tab);
  }
});

// タブのフルスクリーンを切り替える処理
const toggleFullScreenInTab = (tab: chrome.tabs.Tab | undefined) => {
  const tabId = tab?.id;
  if (tabId !== undefined) {
    chrome.scripting.executeScript({
      target: { tabId },
      func: toggleFullScreen
    });
  } else {
    console.error("タブIDが取得できませんでした");
  }
};

// フルスクリーンを切り替える関数
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
