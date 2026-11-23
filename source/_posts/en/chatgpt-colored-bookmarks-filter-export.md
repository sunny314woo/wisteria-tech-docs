---
title: "How to Filter ChatGPT Bookmarks by Color and Export HTML or PDF"
date: 2026-11-23 23:05:00
updated: 2026-11-23 23:05:00
permalink: Product-Docs/en/chatgpt-colored-bookmarks-filter-export/
description: "Learn how to use colored ChatGPT bookmarks in Outlinesave: unclassified marks, red/yellow/green filters, selective HTML or PDF export, and colored bookmarks retained in exported contents."
keywords:
  - colored ChatGPT bookmarks
  - filter ChatGPT bookmarks by color
  - export bookmarked ChatGPT messages
  - export ChatGPT bookmarks to PDF
  - ChatGPT offline HTML bookmark colors
  - Outlinesave bookmark filter
article_type: 常见问题
translation_key: chatgpt-colored-bookmarks-filter-export
categories:
  - FAQ
tags:
  - ChatGPT
  - Outlinesave
  - Colored Bookmarks
  - Bookmark Filter
  - HTML Export
  - PDF Export
lang: en
---

Outlinesave lets you **bookmark important ChatGPT questions and AI headings, filter bookmarks by color, and export the matching turns to HTML or PDF**. **The exported file's table of contents also retains bookmark markers and their colors**, making your selections useful beyond the live chat.

## 1. How do I add colored bookmarks to ChatGPT?

Outlinesave supports two levels of bookmarks:

- **First-level bookmark:** Marks a question and its associated answer turn.
- **Second-level star:** Marks a heading inside an AI answer.

The interaction is deliberately quick:

1. **Click once** on an unmarked bookmark (or heading star) to save it as **unclassified**.
2. **Click the marked icon again** to open the color picker.
3. Choose **red, yellow, or green**.
4. To remove the mark, choose the **plain bookmark icon** in the picker (or the corresponding remove-star action for a heading).

You can change a bookmark's color without removing it first. Bookmark colors are independent of text-highlight colors.

## 2. What does an “unclassified” bookmark mean?

**Unclassified is the default state when you first add a bookmark; it is not a fourth selectable color.**

You can bookmark something with one click and decide later whether it needs a category.

For example, you might use:

| Marker | Example meaning |
| --- | --- |
| Unclassified | Saved for later; not yet categorized |
| Red | Needs action or revision |
| Yellow | Needs another review |
| Green | Verified or completed |

These are examples, not predefined meanings imposed by the extension.

Unclassified bookmarks appear under **All bookmarks**. The current top filter does **not** offer a separate “unclassified only” choice.

To turn an already colored bookmark back into an unclassified one, remove it and add it again.

## 3. How do I filter bookmarks by color?

Select the **bookmark filter control at the top of the Outlinesave conversation outline**. Its choices are:

- **All bookmarks:** Every saved first-level bookmark and second-level star, including unclassified ones.
- **Red:** Outline entries associated with red bookmarks.
- **Yellow:** Entries associated with yellow bookmarks.
- **Green:** Entries associated with green bookmarks.

If only a second-level heading is bookmarked, the associated first-level question remains visible so the outline still has context.

Older bookmarks using legacy colors are not erased by the new picker. Historical marks that do not belong to the current three color categories can still appear under **All bookmarks**.

**Filtering changes your view; it does not delete other conversation turns or bookmarks.**

## 4. How can I export only the bookmarks matching the current filter?

If a ChatGPT conversation contains hundreds of turns but only a few are worth keeping:

1. Bookmark important first-level questions or second-level headings.
2. Optionally assign red, yellow, or green.
3. Open the top bookmark filter and choose **All bookmarks** or a specific color.
4. Open the **Outlinesave export menu**.
5. Choose **HTML · Current bookmark filter** or **PDF · Current bookmark filter** (labels may vary with the installed language).

For example, mark unresolved issues red, filter to red bookmarks, then export the related turns as a focused PDF.

**Selection is based on complete first-level question-and-answer turns.** A filtered export is not just a list of titles, and it does not isolate only the highlighted words.

## 5. Can I still export the full conversation while filtering bookmarks?

**Yes.** With bookmark filtering enabled, the export menu offers both full and filtered versions:

| Export choice | Content included |
| --- | --- |
| HTML · Full conversation | All conversation turns |
| HTML · Current bookmark filter | Turns matching the selected bookmark/color filter |
| PDF · Full conversation | All conversation turns |
| PDF · Current bookmark filter | Turns matching the selected bookmark/color filter |

**Turning on a bookmark filter does not automatically convert the full-export option into a filtered export.** Choose the desired scope explicitly.

Current free export allowances and Pro rights are shown inside the extension.

## 6. Do exported HTML and PDF files retain colored bookmarks in their table of contents?

**Yes. Colored bookmarks are represented in the exported contents, not only in Outlinesave's live ChatGPT sidebar.**

### Offline HTML

An offline HTML knowledge page keeps its first-level and second-level contents, including existing bookmark markers and their colors. You can use its outline navigation and bookmark color filtering while reading offline.

The export can also retain existing highlights, underlines, and notes. However, the HTML file is **not** an annotation backup file that can be imported to restore extension data.

### PDF

PDF export also retains first-level and second-level contents and bookmark color information. **Colored bookmark indicators remain visible in the PDF contents page**, and the PDF document-outline data includes corresponding colors. How a PDF reader renders colored outline entries may vary.

Supported existing text annotations are included in the exported layout, but a PDF is not a database for restoring editable extension annotations.

**In short: use HTML for interactive offline search and navigation; use PDF for fixed-layout reading, sharing, and printing.**

## 7. If I bookmark only an AI subheading, does the export keep the full answer?

**Yes. The filtered export includes the complete first-level question-and-answer turn containing that heading.**

For example, an answer contains “Problem analysis / Approach A / Approach B / Final conclusion.” If you star only “Final conclusion” in red, the red filter focuses on that section in the outline; the HTML/PDF export retains its parent question-and-answer turn.

A second-level mark identifies the important location; the export preserves the context needed to understand it.

## 8. What is the difference between bookmark colors and text highlights?

| Feature | Purpose |
| --- | --- |
| Colored bookmarks and heading stars | Mark and categorize questions or sections |
| Bookmark filter | Focus a long outline on selected important locations |
| Highlights, underlines and notes | Mark and explain specific passages inside answers |
| Filtered HTML/PDF export | Save matching complete question-and-answer turns |

The two color systems are **independent**. You could mark a question with a red bookmark while highlighting a formula in yellow inside the answer.

## 9. Will exporting HTML or PDF automatically protect my bookmarks when I reinstall?

No. Exporting an HTML or PDF file does not make it an extension annotation backup. Bookmarks and their colors are stored locally by default.

If you want to protect marks against browser-profile loss, reinstalling, or switching computers, you can enable **automatic Google Drive annotation backup** and restore a completed backup manually when needed.

Read the [ChatGPT bookmark backup and restore FAQ](/Product-Docs/en/chatgpt-bookmark-backup-restore/) for the steps and limitations.

---

**Suggested workflow: Bookmark as unclassified → categorize when useful → filter by color → export matching HTML/PDF → revisit colored bookmarks in the exported contents.**

## Related guides

- [How to back up and restore ChatGPT bookmarks](/Product-Docs/en/chatgpt-bookmark-backup-restore/)
- [How to bookmark important ChatGPT answers](/Product-Docs/en/05-how-to-bookmark-important-chatgpt-answers/)
- [How to export ChatGPT as searchable offline HTML](/Product-Docs/en/how-to-save-chatgpt-as-searchable-offline-html/)
- [阅读中文版：彩色书签筛选与 HTML/PDF 导出](/Product-Docs/zh/chatgpt-colored-bookmarks-filter-export/)
- [Outlinesave on the Chrome Web Store](https://chromewebstore.google.com/detail/opbngifmlnoahbhjhgmngkggedlofddj)

*Product source reviewed on November 23, 2026. Exact controls, availability, and export entitlements may differ by installed version.*
