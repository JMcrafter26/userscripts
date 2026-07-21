# Custom DuckDuckGo Bangs

**Add your own `!bangs` to DuckDuckGo (and other search engines!) without touching the built-in ones.** This userscript provides a fully featured, mobile-friendly interface to manage custom search shortcuts, sync external lists, and bring the power of `!bangs` to the whole web.

> [!TIP]
> This also brings `!bangs` to other search engines like Google, Bing, Yahoo, Startpage, Brave, Ecosia, Qwant, and Kagi. You can disable this feature in the settings.

[![GitHub](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/social/github-enhancements/cozy.svg)](https://github.com/JMcrafter26/userscripts)
[![GitHub Issues](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/social/github-issues/cozy.svg)](https://github.com/JMcrafter26/userscripts/issues)

---

## 📦 Installation

[![Install from Greasyfork](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/available/greasy-fork/cozy.svg)](https://greasyfork.org/en/scripts/588027-custom-duckduckgo-bangs)
[![Install from GitHub](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/available/github/cozy.svg)](https://raw.githubusercontent.com/JMcrafter26/userscripts/main/custom-bangs/custom-bangs.user.js)

**Click the badges above to install**, or manually install from GitHub:

```url
[https://raw.githubusercontent.com/JMcrafter26/userscripts/main/custom-bangs/custom-bangs.user.js](https://raw.githubusercontent.com/JMcrafter26/userscripts/main/custom-bangs/custom-bangs.user.js)

```

> Requires a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) | [Read more about installation](https://www.google.com/search?q=../README.md%23installation-guide)

---

## ✨ Features

### Universal Search Engine Support

Why limit bangs to DuckDuckGo? Use your custom bangs—**and DuckDuckGo's official bangs**—directly on Google, Bing, Yahoo, Startpage, Brave, Ecosia, Qwant, and Kagi! Enabled by default, this turns any search engine into a shortcut powerhouse.

### Personal Custom Bangs

Create your own shortcuts with names, triggers, and target URLs. Organize them using built-in categories (Tech, Shopping, Research, News, etc.) for easy management.

### External !Bang Lists & Auto-Sync

Import bang collections via URLs (e.g., GitHub Gists). The script supports multiple lists, lets you set priority order, and **auto-syncs** them in the background (choose between every 12 hours, daily, weekly, or manual).

### Collision Detection

Caches the official DuckDuckGo bang list and warns you if your custom trigger overrides an existing official command.

### Mobile-Friendly UI

The entire management interface is responsive, ensuring you can easily add, edit, or delete bangs on both desktop and mobile devices.

### Backup & Restore (Everything)

Easily export your *entire* configuration (own bangs, external lists, and settings) to a JSON format so you can instantly transfer your exact setup to another browser or device.

---

## 💡 Usage

Once installed, the script runs automatically on DuckDuckGo and all other supported search engines.

**How to manage bangs:**

1. Open your userscript manager extension menu.
2. Click **⚙️ Manage Custom Bangs**.
3. Use the interface to add a new bang, tweak your sync settings, or manage search engine integrations.

Alternatively, you can also access the management interface by typing `!bang` (or visiting <https://duckduckgo.com/bangs>) in your browser and clicking on the floating **⚙️ Custom Bangs** button.

* *Example Trigger:* `!gh`
* *Example URL:* `https://github.com/search?q={{{s}}}` (The `{{{s}}}` acts as the placeholder for your search query).

> [!TIP]
> You can paste the URL directly from a search result page, and the script will automatically detect and replace the search query with `{{{s}}}`.

**How to use bangs:**
Search directly in your search engine's query bar as you normally would.

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

This userscript stores your custom bangs and settings locally in your browser via your userscript manager. It does not collect or transmit any personal search data to third parties. Background requests are only made to fetch external JSON lists you explicitly add, and to cache the official DuckDuckGo `bang.js` file for collision detection and cross-engine support.

---

⭐ Enjoying this script? [Star the repo](https://github.com/JMcrafter26/userscripts) and [Rate it on Greasyfork](https://greasyfork.org/en/scripts/588027-custom-duckduckgo-bangs) • Made with ❤️