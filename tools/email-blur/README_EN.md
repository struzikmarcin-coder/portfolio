# Email Blur

🇵🇱 [Wersja polska](README_PL.md)

A browser extension that automatically blurs email addresses on every web page. It comes in handy when you record your screen, take screenshots, give a presentation or share your screen on a call and don't want to expose anyone's contact details.

- Works right after installation, with no setup and no account.
- One click on the envelope icon turns blurring on or off.
- Sends nothing to the internet. Everything happens locally in your browser.

---

## What's in the package

| Item | Purpose |
|---|---|
| `email-blur/` | The extension for Chrome, Edge, Brave, Opera, Vivaldi, Arc and other Chromium-based browsers |
| `email-blur-firefox/` | The same extension prepared for Firefox |
| `README_EN.md` | This file |
| `README_PL.md` | Polish instructions |

Each extension folder contains `manifest.json` (extension description for the browser), `content.js` (finds and blurs email addresses), `background.js` (on/off button), `icons/` (envelope icons) and `_locales/` (labels in English and Polish, picked automatically from your browser language).

---

## Installation

First unzip the archive. You'll get two folders: `email-blur` (for Chrome and other Chromium-based browsers) and `email-blur-firefox` (for Firefox). **Don't delete or move the folder after installing**, because the browser loads the extension straight from it.

Put it somewhere permanent right away, outside Downloads and outside cloud-synced folders (iCloud, OneDrive), because the system may keep files there only in the cloud and the extension would stop working. Good spots:

- **Mac:** `/Users/your_name/Extensions/email-blur` (in Finder: Go → Home, create an `Extensions` folder there)
- **Windows:** `C:\Users\your_name\Extensions\email-blur`

Browser updates don't affect the extension as long as the folder stays in place. Extensions loaded from a folder don't sync to other computers with your browser account, so you need to install it once on each computer.

### Google Chrome

1. Type `chrome://extensions` in the address bar and press Enter.
2. Turn on **Developer mode** in the top right corner.
3. Click **Load unpacked** and select the `email-blur` folder.
4. Click the puzzle icon in the toolbar and pin **Email Blur** (the pin icon) so the envelope is always visible.

### Microsoft Edge

1. Type `edge://extensions` in the address bar.
2. Turn on **Developer mode** in the left sidebar (or at the bottom of the page).
3. Click **Load unpacked** and select the `email-blur` folder.
4. Click the puzzle icon and turn on **Show in toolbar** next to Email Blur.

### Brave

1. Type `brave://extensions` in the address bar.
2. Turn on **Developer mode** in the top right corner.
3. Click **Load unpacked** and select the `email-blur` folder.
4. Pin the icon from the puzzle menu.

### Opera

1. Type `opera://extensions` in the address bar.
2. Turn on **Developer mode** in the top right corner.
3. Click **Load unpacked** and select the `email-blur` folder.
4. Pin the icon from the extensions (cube) menu in the toolbar.

### Vivaldi, Arc and other Chromium-based browsers

Follow the same steps as for Chrome: open the extensions page (`vivaldi://extensions`, in Arc via **Extensions → Manage extensions**), turn on developer mode and choose **Load unpacked**.

### Mozilla Firefox (temporary mode)

Firefox only lets you load an extension from outside its store temporarily, until the browser is closed.

1. Type `about:debugging#/runtime/this-firefox` in the address bar.
2. Click **Load Temporary Add-on…** and select the `manifest.json` file inside the `email-blur-firefox` folder.
3. Click the puzzle icon, choose Email Blur and allow it to run **on all sites** (Firefox asks for this permission by default).
4. After restarting Firefox you need to repeat steps 1 to 3.

### Safari

Safari can't load extensions in this form. It would have to be rebuilt in Xcode and signed with an Apple Developer account, so this version doesn't support Safari.

### Phones

Mobile browsers (Chrome on Android and iPhone, Safari on iOS) don't allow installing extensions like this one. Email Blur works on desktop only.

### Files opened from disk

If you want the extension to also work on HTML files opened from your disk (`file://`), in Chrome and similar browsers open the extension's **Details** and turn on **Allow access to file URLs**. Regular websites don't need this.

---

## How to use it

- After installation the extension is **on** and works on every open page.
- **Click the envelope icon** to turn blurring off. The icon shows **OFF** and addresses are revealed immediately on all tabs, without reloading.
- Click again to turn it back on.
- The setting is remembered, even after you close the browser.

---

## How it works

1. Once a page loads, the script scans its text for anything that looks like an email address (e.g. `john.smith@company.com`).
2. The page element containing that address gets a blur effect. The edges of the blur fade out softly on the left and right, so it looks natural rather than like a cut-out rectangle.
3. It also checks:
   - form fields (typed text and the placeholder hint in an empty field),
   - `mailto:` links,
   - tooltip texts (`title`) and screen reader labels (`aria-label`).
4. The script keeps watching the page. When new content loads (e.g. a contact list in a CRM, a new message in your inbox, scrolling a list), new addresses get blurred too. When you type an email into a form field, the field blurs as you type.
5. The extension also works inside frames embedded in the page (e.g. widgets, login windows).

The extension has only one permission: `storage`, used to remember whether it's on. It doesn't read your history, doesn't collect data and doesn't connect to any server.

---

## Limitations

Worth knowing before you start recording.

- **A brief moment without blur while a page loads.** The script starts when the page has loaded, so an address may be visible for a split second. When recording your screen, open the page before you hit record, or trim the beginning.
- **The whole element containing the address is blurred.** If the address sits in a sentence with other text (e.g. "Email us at office@company.com or call"), the whole sentence gets blurred, not just the address.
- **Text only.** Addresses in images, screenshots, videos, PDFs opened in the browser and those drawn on a `canvas` element (e.g. Google Docs, Figma) won't be detected.
- **Obfuscated addresses aren't recognized**, e.g. `john [at] company [dot] com` or an address split across several page elements.
- **Shadow DOM.** Some modern components hide their content in the so-called Shadow DOM. Addresses tucked inside such components may not get blurred.
- **Browser pages.** Browsers don't let extensions run on their own internal pages (`chrome://…`, `edge://…`, settings) or in extension stores.
- **Resizing the window.** The fading edges are fitted to the address width at the moment it's detected. After a big change in window width the blur edge may shift slightly. Reloading the page fixes it.
- **This is not data protection.** The blur is purely visual. The address is still in the page code, can be copied and seen in developer tools. The extension protects against accidentally showing an address on screen, not against someone with access to your computer.
- **Developer mode notice.** Chrome and Edge may occasionally remind you that you have extensions running in developer mode. That's normal for installs from outside the store and you can safely dismiss it.
- **Firefox** forgets the extension after a restart (see the instructions above).

---

## Uninstalling

Go to your browser's extensions page (e.g. `chrome://extensions`), find **Email Blur** and click **Remove**. Then you can delete the `email-blur` folder.

---

## Customizing (advanced)

In `content.js` you can change:

- **blur strength**: `blur(6px)` (a higher number means a stronger blur),
- **edge fade length**: `20%` and `80%` (e.g. `35%` and `65%` give a longer, softer fade).

After making changes, go to the extensions page and click the reload icon next to Email Blur.
