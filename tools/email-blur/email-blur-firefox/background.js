const render = enabled => {
  chrome.action.setBadgeText({ text: enabled ? '' : 'OFF' });
  chrome.action.setBadgeBackgroundColor({ color: '#888' });
  chrome.action.setTitle({ title: chrome.i18n.getMessage(enabled ? 'titleOn' : 'titleOff') });
};
const get = async () => (await chrome.storage.local.get({ enabled: true })).enabled;

chrome.runtime.onInstalled.addListener(async () => render(await get()));
chrome.runtime.onStartup.addListener(async () => render(await get()));
chrome.action.onClicked.addListener(async () => {
  const enabled = !(await get());
  await chrome.storage.local.set({ enabled });
  render(enabled);
});
