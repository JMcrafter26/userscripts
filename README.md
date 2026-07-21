# Userscripts

This is my personal collection of userscripts designed to enhance web browsing and development experiences. Each script is tailored for specific websites or functionalities, providing useful features and improvements.

## Table of Contents

<details>
<summary>Click to expand</summary>

- [Userscripts](#userscripts)
  - [Table of Contents](#table-of-contents)
  - [Available Userscripts](#available-userscripts)
    - [Custom DuckDuckGo !Bangs](#custom-duckduckgo-bangs)
    - [JustLemmeDebug](#justlemmedebug)
    - [Makerworld Enhancements](#makerworld-enhancements)
  - [Installation Guide](#installation-guide)
    - [Prerequisites](#prerequisites)
    - [Installation Methods](#installation-methods)
      - [Method 1: Via Greasyfork (Recommended) ⭐](#method-1-via-greasyfork-recommended-)
      - [Method 2: Via GitHub Direct Link](#method-2-via-github-direct-link)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Legal Disclaimer](#legal-disclaimer)

</details>

> [!NOTE]
> You need a userscript manager in order to install and use these scripts.
>
> Please refer to the [**Installation Guide**](#installation-guide) for detailed instructions on how to install each userscript.

## Available Userscripts

> [!TIP]
> Click the badges to install or view the source code.

### [Custom DuckDuckGo !Bangs](./custom-bangs/README.md)

[![Greasyfork](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/available/greasy-fork/cozy.svg)](https://greasyfork.org/en/scripts/588027-custom-duckduckgo-bangs)
[![GitHub](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/available/github/cozy.svg)](https://raw.githubusercontent.com/JMcrafter26/userscripts/main/custom-bangs/custom-bangs.user.js)

```url
https://raw.githubusercontent.com/JMcrafter26/userscripts/main/custom-bangs/custom-bangs.user.js
```

**Add your own `!bangs` to DuckDuckGo without touching the built-in ones.** This userscript provides a fully featured, mobile-friendly interface to manage custom search shortcuts, sync external lists.

- **Features:**
  - **Personal Custom Bangs** - Create your own shortcuts with names, triggers, and target URLs. Organize them using built-in categories (Tech, Shopping, Research, News, etc.) for easy management.
  - **External !Bang Lists** - Import bang collections via URLs (e.g., GitHub Gists). The script supports multiple lists, lets you set priority order, and auto-syncs them in the background daily.
  - **Mobile-Friendly UI** - The entire management interface is responsive, ensuring you can add, edit, or delete bangs easily on both desktop and mobile devices.

- **Author**: Cufiy
- **License**: AGPL-3.0
- [**More Details ➜**](./custom-bangs/README.md)

### [JustLemmeDebug](./justlemmedebug/README.md)

[![Greasyfork](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/available/greasy-fork/cozy.svg)](https://greasyfork.org/en/scripts/562680-justlemmedebug/)
[![GitHub](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/available/github/cozy.svg)](https://raw.githubusercontent.com/JMcrafter26/userscripts/main/justlemmedebug/justlemmedebug.user.js)

```url
https://raw.githubusercontent.com/JMcrafter26/userscripts/main/justlemmedebug/justlemmedebug.user.js
```

**Unblock developer tools and debugging capabilities!** Blocks anti-debugging scripts on websites to allow easier debugging. Based on the concept from [LemmeDebug](https://github.com/deeeeone/userscripts).

- **Features:**
  - **Bypass Anti-Debug Protection** - Allows developers to inspect and debug web pages without interference
  - **Block Common Techniques** - Neutralizes disable-devtool, debugger statements, and infinite/tamper debugger traps
  - **Clean Console** - Prevents console.clear(), table spam, and log pollution
  - **Restore Controls** - Removes keyboard and right-click restrictions
  - **iframe Support** - Preserves console access in iframes
  - **Universal** - Runs automatically on all websites

- **Original Author**: Cufiy + deeeeone
- **License**: AGPL-3.0
- [**More Details ➜**](./justlemmedebug/README.md)

### [Makerworld Enhancements](./makerworld-enhancements/README.md)

[![Greasyfork](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/available/greasy-fork/cozy.svg)](https://greasyfork.org/en/scripts/560107-makerworld-enhancements)
[![GitHub](https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets/available/github/cozy.svg)](https://raw.githubusercontent.com/JMcrafter26/userscripts/main/makerworld-enhancements/makerworld-enhancements.user.js)

```url
https://raw.githubusercontent.com/JMcrafter26/userscripts/main/makerworld-enhancements/makerworld-enhancements.user.js
```

**Supercharge your MakerWorld experience!** This userscript adds powerful enhancements and quality-of-life improvements to the MakerWorld platform.

- **Features:**
  - **Cross-Platform Quick Search** - Instantly find similar models on Printables and Thingiverse
  - **Enhanced UI** - Seamless integration with MakerWorld's interface
  - **More Coming Soon** - Regular updates with new features based on community feedback!
- **Author**: Cufiy
- **License**: AGPL-3.0
- [**More Details ➜**](./makerworld-enhancements/README.md)

## Installation Guide

### Prerequisites

You'll need a userscript manager installed in your browser:

| Platform | Browser | Recommended Extension |
| ---------- | --------- | ---------------------- |
| 🖥️ **Desktop** | Almost All | [Violentmonkey](https://violentmonkey.github.io/) |
| 🖥️ **Desktop** | Almost All | [ScriptCat](https://docs.scriptcat.org/en/) |
| 🖥️ **Desktop** | FireFox | [FireMonkey](https://addons.mozilla.org/en-US/firefox/addon/firemonkey/) |
| 📱 **Android** | FireFox | [Violentmonkey](https://violentmonkey.github.io/) |
| 📱 **iOS/Mac** | Safari | [wBlock](https://apps.apple.com/us/app/wblock/id6746388723) |
| 📱 **iOS/Mac** | Safari | [Userscripts](https://apps.apple.com/us/app/userscripts/id1463298887) |

### Installation Methods

#### Method 1: Via Greasyfork (Recommended) ⭐

1. Visit the script's Greasyfork page (click the Greasyfork badge above)
2. Click the green **"Install this script"** button
3. Your userscript manager will open automatically
4. Click **Install** to confirm
5. Done! The script is now active

#### Method 2: Via GitHub Direct Link

**For Desktop/Android:**

1. Copy the userscript URL from above
2. Open your userscript manager's dashboard
3. Look for "Install from URL" or "New script from URL"
4. Paste the URL and confirm the installation

**For iOS (wBlock App):**

1. Copy the userscript URL from above
2. Open the wBlock app
3. Navigate to the **"Scripts"** tab
4. Tap the **"+"** button to add a new script
5. Paste the URL and confirm the installation

**For iOS (Userscripts App):**

1. Copy the userscript URL from above
2. Open the URL in Safari (paste into address bar)
3. Tap the **Share** button (square with arrow)
4. Select **"Userscripts"** from the share menu
5. Tap **"Install"** in the Userscripts popup
6. The script is now installed and active

> [!TIP]
> After installation, you may need to refresh the target website for the script to take effect.

## Usage

Once installed, the userscript will automatically run on the Makerworld website. You can access its features through the provided interface elements.

## Contributing

Feel free to contribute by submitting issues or pull requests. Make sure to follow the existing code style and include appropriate documentation for any new features or changes.

## License

This repository is licensed under the MIT License, but individual userscripts may have their own licenses as specified in their respective files.

## Legal Disclaimer

This repository is not affiliated with or endorsed by the websites it supports. The userscripts are provided "as is" without warranty of any kind. The author is not responsible for any issues that may arise from using these scripts. Use them at your own risk.
