---
title: "How to Hide the ChatGPT Extension Toolbar and Reduce UI Clutter"
date: 2026-10-16 21:00:00
updated: 2026-10-21 09:30:00
description: "Learn how to collapse or hide the Outlinesave floating toolbar, open the Full TOC sidebar, resize the conversation outline, and navigate with J, K, and Esc."
keywords:
  - hide ChatGPT extension toolbar
  - ChatGPT sidebar extension
  - minimize ChatGPT UI clutter
  - Outlinesave Full TOC
  - ChatGPT table of contents
  - collapsible floating toolbar
permalink: Product-Docs/en/chatgpt-hide-toolbar-sidebar-low-distraction/
categories:
  - Product Docs
tags:
  - Outlinesave
  - ChatGPT Outline
  - Full TOC
  - Navigation
lang: en
---

## Quick answer: How do I keep Outlinesave out of the way?

Collapse the five-control floating toolbar into an **Edge Button**, or open the **Outlinesave extension popup** and turn off **Show floating toolbar** to hide it completely, including the edge control. Open the **Full TOC** by clicking the **Outline** button when you need to navigate; press `Esc` or close the sidebar when you want to focus on reading.

This guide uses ChatGPT for the walkthrough. Outlinesave also supports Gemini, Claude, and DeepSeek. Controls and behavior may vary by AI platform.

## New: Pinned and flexible sidebar modes

Open the **Outlinesave extension popup** in your browser toolbar to choose the sidebar behavior:

- **Pinned mode** keeps the sidebar open for ongoing outline navigation, searching, and jumping between answers.
- **Flexible mode (low-distraction)** reveals the sidebar when you move your pointer over its area and automatically collapses it when you move away. This leaves more room for reading and writing.

**The original quick controls are still available.** The right-side toolbar retains Outline, Previous, Next, Download, Search, and its collapse control. You can still fold it into a single Edge Button or hide the floating toolbar through the extension popup. The right-side placement has also been adjusted to avoid covering the page scrollbar.

Pinned/flexible behavior is separate from collapsing or hiding the floating toolbar.

## 1. Collapse the floating toolbar to one button

The floating Quick Toolbar sits along the right side of the conversation and provides five groups of controls: **Outline, previous/next navigation, export, search, and collapse**.

When you no longer need these shortcuts, collapse the toolbar. The controls fold into a single **Edge Button**. Expand it again whenever you need them.

This is a good default if you use the extension occasionally but don't want a column of buttons visible all the time.

## 2. Hide the toolbar completely

Collapsing and hiding are different. A collapsed toolbar still leaves the Edge Button visible.

To remove the floating controls entirely, open the browser's **Outlinesave extension popup** and switch off **Show floating toolbar**. This setting controls the floating toolbar, Edge Button, and sidebar on supported pages. Turn it back on in the popup to restore them.

## 3. Open the Full TOC only when needed

**Full TOC** means **Full Table of Contents**. It is the name used in these guides for the complete conversation-outline view, **not the label of a button**.

To open it, click **Outline** in the Quick Toolbar. A scrollable sidebar displays your conversation structure. The **Two-Level TOC** organizes user questions as the first level and AI response headings as the second. The sidebar can be repositioned and resized to suit the available space.

For especially long conversations, opening Full TOC does not imply that every older message has already been loaded. Outline discovery can take place progressively.

Close the sidebar when you want a quieter reading space. Click **Outline** again to reopen it. As long as the page has not been refreshed, closing and reopening the sidebar does not itself discard the outline entries already loaded.

## 4. Navigate with your keyboard

| Key | Action |
| --- | --- |
| `J` | Next item |
| `K` | Previous item |
| `Esc` | Close the TOC sidebar |

The in-product navigation labels include **Next (J)** and **Previous (K)**. Keyboard behavior may depend on the current input focus.

## 5. Turn off the annotation tool when you don't need it

Highlights, underlines, and notes are useful for revisiting important passages, but the annotation tool doesn't have to be part of every reading session. If it interferes with selecting or copying text, turn off the drawing/annotation tool using the extension's available control; re-enable it when you want to mark up a passage.

## 6. Three low-distraction workflows

**Focus on writing:** Hide the floating toolbar, close the TOC Sidebar, and disable the annotation tool if unnecessary.

**Occasionally retrieve an older answer:** Keep only the Edge Button visible. Open Full TOC when you need a conversation map, then close it.

**Work with long research or coding conversations:** Adjust the TOC Sidebar's position and size, inspect the Two-Level TOC, and use J/K to move through items.

## FAQ

### Where is the Full TOC button?

There isn't a button labeled **Full TOC**. Click **Outline** in the Quick Toolbar to open the full table-of-contents view.

### What is the difference between Full TOC, Two-Level TOC, and TOC Sidebar?

**Full TOC** names the complete outline view. **Two-Level TOC** describes its two-level structure—user questions and AI response headings. **TOC Sidebar** names the interface panel that contains the outline.

### Can I hide the Edge Button too?

Yes. Turn off **Show floating toolbar** in the Outlinesave extension popup.

### Does closing the sidebar reload the outline?

Not merely by closing it. Previously loaded outline entries remain available if the page has not been refreshed. That does not guarantee the same state after a page reload.

### How do I close the TOC Sidebar?

Use its close control or press `Esc`. Click **Outline** to bring it back.

### Does this only work on ChatGPT?

No. Outlinesave supports ChatGPT, Gemini, Claude, and DeepSeek, although platform-specific controls can differ.

## Related guides

- [How to Add an Outline Sidebar to ChatGPT](/Product-Docs/en/how-to-add-an-outline-sidebar-to-chatgpt-for-faster-navigation/)
- [Quick Toolbar and Full TOC guide (Chinese)](/Outline/outline/floating-toolbar-and-full-outline/)

[Get Outlinesave on the Chrome Web Store](https://chromewebstore.google.com/detail/opbngifmlnoahbhjhgmngkggedlofddj)
