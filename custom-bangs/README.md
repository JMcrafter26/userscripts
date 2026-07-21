# Custom DuckDuckGo Bangs

**Add your own `!bangs` to DuckDuckGo without touching the built-in ones.** This userscript provides a fully featured, mobile-friendly interface to manage custom search shortcuts, sync external lists, and prevent collisions with official DuckDuckGo commands.

[![GitHub](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/social/github-enhancements/cozy.svg)](https://github.com/JMcrafter26/userscripts)
[![GitHub Issues](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/social/github-issues/cozy.svg)](https://github.com/JMcrafter26/userscripts/issues)

---

## 📦 Installation

[![Install from Greasyfork](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/available/greasy-fork/cozy.svg)](#) <!-- Replace # with actual Greasyfork URL when published -->
[![Install from GitHub](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/available/github/cozy.svg)](https://raw.githubusercontent.com/JMcrafter26/userscripts/main/custom-bangs/custom-bangs.user.js)

**Click the badges above to install**, or manually install from GitHub:

```url
https://raw.githubusercontent.com/JMcrafter26/userscripts/main/custom-bangs/custom-bangs.user.js
```

> Requires a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) | [Read more about installation](https://www.google.com/search?q=../README.md%23installation-guide)

---

## ✨ Features

### Personal Custom Bangs

Create your own shortcuts with names, triggers, and target URLs. Organize them using built-in categories (Tech, Shopping, Research, News, etc.) for easy management.

### External Bang Lists

Import bang collections via URLs (e.g., GitHub Gists). The script supports multiple lists, lets you set priority order, and auto-syncs them in the background daily.

### Collision Detection

Caches the official DuckDuckGo bang list and warns you if your custom trigger overrides an existing official command.

### Mobile-Friendly UI

The entire management interface is responsive, ensuring you can add, edit, or delete bangs easily on both desktop and mobile devices.

### Import / Export

Easily backup your personal custom bangs to a JSON format, or transfer them to another browser/device.

---

## 💡 Usage

Once installed, the script runs automatically on DuckDuckGo.

**How to manage bangs:**

1. Open your userscript manager extension menu.
2. Click **⚙️ Manage Custom Bangs**.
3. Use the interface to add a new bang.

* *Example Trigger:* `!gh`
* *Example URL:* `https://github.com/search?q={{{s}}}` (The `{{{s}}}` acts as the placeholder for your search query).

**How to use bangs:**
Search directly in the DuckDuckGo search bar as you normally would.

* Typing `!gh userscripts` will automatically redirect you to the GitHub search page based on the URL you configured.

---

## 🤝 Contributing

Contributions are welcome! Check out the [GitHub repository](https://github.com/JMcrafter26/userscripts) to:

* Report bugs or issues
* Suggest new features
* Submit pull requests
* Improve documentation

---

## 🙏 Acknowledgements

* **Author**: Cufiy
* **All Contributors & Users** - Your feedback helps improve this tool!

---

## ⚠️ Disclaimer

This userscript stores your custom bangs and settings locally in your browser via your userscript manager. It does not collect or transmit any personal search data to third parties. Background requests are only made to fetch external JSON lists you explicitly add, and to cache the official DuckDuckGo `bang.js` file for collision detection.

---

<div align="center">

⭐ Enjoying this script? [Star the repo](https://github.com/JMcrafter26/userscripts) and [Rate it on Greasyfork](https://greasyfork.org/en/scripts/) • Made with ❤️

</div>
