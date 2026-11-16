# NXEnhancedR — NX Enhanced Revived

My personal fixed version of **NX Enhanced**, the NextDNS web interface enhancer.
Fixed for my own use; shared here in case it's useful to anyone else.

> ⚠️ **This is not the original project.** Original by **BLBC (hjk789)**:
> [hjk789/NXEnhanced](https://github.com/hjk789/NXEnhanced) (archived 2024).
> This build was based on the fork by
> [network-security-toolkit](https://github.com/network-security-toolkit/NXEnhanced)
> (abdullahkhilji). All credit for the original extension goes to them.
> If the original author requests removal, this repository will be taken down.

## 📌 Scope — read before opening an issue

**This fork exists ONLY to keep the extension working.** Specifically:

- ✅ Fixes when NextDNS changes their website/API and breaks something
- ✅ Fixes when Chromium changes break something
- ❌ **No new features. Ever.**
- ❌ Feature requests and "it would be nice if..." issues will be
  **closed without response.**

I use this myself daily, so if something breaks for me it'll get fixed
eventually. If it breaks for you but not for me, feel free to open an issue
describing exactly what's broken — but there are no guarantees or timelines.

## 🤖 Disclosure

This build was fixed with heavy AI assistance (vibecoded). I described the
bugs, AI wrote most of the patches, I tested them. The fixes work and are
in daily use, but they haven't been through any formal review. Use at your
own risk.

## Fixes applied on top of v5.1.3.1

### Critical
- **Restored all API communication** — added the missing `xhr.open()` call in
  `makeApiRequestFunc`, which silently broke every API request (allow/denylist
  saving, logs loading, config import/export, TLD adding, etc.)

### Logs page
- Fixed the "List queries before" filter defaulting to UTC instead of local time
- Fixed `to=NaN` being sent when the date input is empty, which permanently
  wedged the log loader
- A failed log request no longer leaves the spinner stuck forever
- Fixed multi-term search (an array was accidentally passed as the search string)
- A lone `-` in search no longer hides every entry
- Entries missing `reasons` no longer crash the renderer (another stuck spinner)
- Entries without a root domain no longer display "undefined"
- Empty lines in "domains to hide" no longer match every domain and hide all logs
- The refresh button now respects an active "List queries before" filter

### Allowlist/Denylist pages
- Fixed the "add a list from URL" textarea, which could never appear
- URL list imports now strip `#` comments, support hosts-file format
  (`0.0.0.0 domain.com`), remove duplicates, and skip invalid lines
- "Right-aligned" now actually right-aligns the domain text
- Turning off "Add a list of domains" now reloads to restore the original input

### Settings & storage
- Fixed a race condition where rapid setting changes could overwrite each other
- Domain descriptions stored as an array are migrated to an object automatically
- Removed a redundant storage listener that caused double-initialization

## Installation

1. Download the latest zip from [Releases](../../releases)
2. Extract it somewhere **permanent**, the browser will load the extension from
   this folder so don't delete it afterwards!
3. Open `chrome://extensions` in Chrome, Brave, Edge, Opera or Vivaldi
4. Enable **Developer mode** (top-right toggle)
5. Click **Load unpacked** and select the extracted folder
6. Log into [my.nextdns.io](https://my.nextdns.io)

Tested on Brave (Windows). Should work on other Chromium browsers.
Firefox untested.

## Credits & license

- Original code: **Copyright (c) 2020+ BLBC (hjk789)** — the
  [original license terms](https://github.com/hjk789/NXEnhanced#license)
  continue to apply to all original code.
- v5.1.3.1 base fork: [network-security-toolkit/NXEnhanced](https://github.com/network-security-toolkit/NXEnhanced)
- Fixes in this build: by me, with AI assistance. Provided as-is, no warranty.
- No affiliation with BLBC, the base fork's author, or NextDNS Inc.