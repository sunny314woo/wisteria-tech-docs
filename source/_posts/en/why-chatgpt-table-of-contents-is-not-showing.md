---
title: "Why Is the ChatGPT Table of Contents Not Showing? How to Get It Back"
date: 2026-09-17 18:55:00
updated: 2026-09-17 18:55:00
description: "Is the ChatGPT Table of Contents or right-side prompt navigator missing? As of September 2026, shorter chats may not qualify, while long chats can require older history to load before the native navigator appears. Here is what to try."
keywords:
  - ChatGPT table of contents not showing
  - ChatGPT table of contents missing
  - ChatGPT navigator missing
  - ChatGPT prompt navigator missing
  - ChatGPT right side navigation missing
  - ChatGPT outline not showing
  - ChatGPT long conversation navigation
  - ChatGPT table of contents
permalink: Product-Docs/en/why-chatgpt-table-of-contents-is-not-showing/
categories:
  - Product Docs
tags:
  - ChatGPT
  - ChatGPT Table of Contents
  - ChatGPT Navigation
  - Long Conversations
  - Troubleshooting
lang: en
---

## Why is the ChatGPT Table of Contents not showing?

**As of September 2026, there are two common reasons the native ChatGPT Table of Contents / prompt navigator may not appear on the web: the conversation is not long enough to qualify, or an older long conversation has not fully reconstructed enough of its history in the current page session.**

OpenAI introduced a Table of Contents for longer conversations on the web in June 2026. OpenAI's release notes describe it as available for conversations with more than five responses.

A separate navigation problem began receiving multiple public reports around **August 21, 2026**: users reopening long conversations found that the right-side Table of Contents was missing while older messages loaded progressively. Several users reported that the native navigator returned after they eventually loaded the conversation back to its beginning.

This article describes the current behavior observed in September 2026. ChatGPT's web interface can change, so these details should be treated as time-specific rather than permanent rules.

## Reason 1: the conversation may not have more than five responses yet

The simplest explanation is that the chat is still too short.

OpenAI's June 2026 release notes say that conversations with **more than five responses** can display a Table of Contents on the web. If you have only just started a conversation, the absence of the right-side navigator does not necessarily indicate a bug.

Continue the conversation and check again after it has become long enough.

## Reason 2: a long conversation may not have loaded enough history yet

This is the more frustrating case.

Since around August 21, 2026, users in the OpenAI Developer Community have reported that reopening a long existing conversation can show only part of its history at first. Older sections then become available progressively as the user moves upward.

At the same time, the native right-side Table of Contents may remain missing until much more of that history has been reconstructed in the current page session.

The important distinction is:

**Your old messages can still exist even when the current page has not loaded enough of them for the native navigator to appear.**

This is why the problem can look like a removed feature even though the Table of Contents later returns.

## When did this missing-navigator problem start?

Public reports clustered around **August 21–24, 2026**.

Users described the same combination of symptoms:

- the right-side Table of Contents or prompt navigator disappeared;
- older messages loaded only as they moved upward;
- the scrollbar represented only the currently loaded portion of a very long chat;
- after enough older history was loaded, sometimes all the way to the first prompt, the native navigator could return.

OpenAI Support has subsequently continued to describe a Table of Contents as a feature available in some longer web chats, so the feature itself has not simply been documented as permanently removed.

## How can I make the ChatGPT Table of Contents appear again?

Try these steps in order.

### 1. Check whether the chat is long enough

If the conversation does not yet have more than five responses, continue using it first. The native Table of Contents is intended for longer web conversations rather than every new chat.

### 2. Use ChatGPT on the web

The Table of Contents discussed here is a web navigation feature. OpenAI Support stated in September 2026 that the same conversation Table of Contents was not yet available across the mobile and desktop apps in the same way.

If you are troubleshooting the missing right-side navigator, reproduce the issue in ChatGPT Web first.

### 3. Move upward and allow older history to load

For an older long conversation, scroll upward and watch whether earlier messages continue to appear.

If the page is still revealing older history, the conversation has not yet reconstructed its full visible history in the current session.

Several users have reported that the Table of Contents returns after they eventually reach the actual beginning of the conversation.

### 4. Do not assume Ctrl+Home or Cmd+Up loads the entire chat instantly

Keyboard shortcuts can move to the top of the **currently loaded** portion of a page, but reports from very long conversations show that this may simply trigger another section of older history to load.

You may therefore need to repeat the process rather than expecting one shortcut to reach the true first message immediately.

### 5. Reload and test another long conversation

If one conversation behaves differently, compare it with another conversation that should also be long enough to have a navigator.

This helps distinguish a conversation-specific loading state from a broader ChatGPT interface change.

## Did OpenAI remove the Table of Contents?

Current evidence does not support treating it as permanently removed.

OpenAI Support was still pointing users to the Table of Contents for longer web chats in September 2026. Public bug reports also show cases where the navigator disappears when a long conversation is reopened but reappears after enough history is loaded.

A more accurate description is that **the native navigator can currently be unavailable or inconsistent while a long conversation is being progressively reconstructed in the browser.**

## Why is this especially painful in very long chats?

The workaround conflicts with the purpose of the feature.

If you have a conversation with hundreds of turns, you want a navigator precisely because manually moving through the entire history is slow. Requiring a large amount of history to load before the navigator becomes useful makes the native Table of Contents least convenient in the conversations that need it most.

That is also why multiple users have requested persistent navigation, direct jumps to unloaded sections, or a global conversation index.

## Is there another way to navigate a very long ChatGPT conversation?

If you regularly work with very long ChatGPT conversations and do not want to rely entirely on the native Table of Contents becoming available first, **Outlinesave** provides an alternative navigation layer.

Its long-conversation approach is to discover a broader conversation structure first and then help navigation progress toward historical locations that are not currently mounted in the page.

A useful mental model is:

**Discover first → Navigate progressively.**

This does not mean every distant message can always be reached instantly. ChatGPT's live page still controls how historical content is rendered and loaded. The advantage is that navigation does not have to begin with a completely blind manual scroll through the conversation.

Outlinesave also adds a two-level outline, bookmarks, highlights, notes, search/filtering, Markdown export and searchable offline HTML workflows.

## What should I do after the native ChatGPT navigator returns?

If the official Table of Contents is enough for your workflow, keep using it. There is no reason to replace a native feature that already solves your problem.

If your chats have become long-term research, coding, study or project records, consider adding a separate organization layer: bookmark the parts that matter, highlight key conclusions, and export important material so finding it later does not depend entirely on the current ChatGPT page state.

## Related guides

For deeper troubleshooting and long-conversation workflows, see the Outlinesave guides on incomplete long-conversation outlines, navigating long ChatGPT conversations, adding an outline sidebar, bookmarking important answers, exporting ChatGPT to Markdown, and saving a searchable offline HTML copy.

*Outlinesave is developed by Wisteria Software.*
