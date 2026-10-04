# Better Relative Wikilinks Plugin for Obsidian

An extremely lightweight Obsidian plugin that makes **`[[wikilinks]]`** cleaner.

---

###### (Disclaimer: This plugin is meant to work with the setting "Files and links > New link format" set to `Shortest path when possible`. If you do not use that setting, turn this plugin off. It won't break, but it will have confusing behavior.)

Normally, when you create a wikilink in obsidian, it shows up as just the filename. (e.g. `[[doc]]`)

But what if you create a wikilink to `doc`, but you have 2 or more files of the same name? In that case, Obsidian creates a **direct path**, which looks something like this: `[[folder/foo/doc]]`

This is fine and all, but having an entire file path in your link is inconvenient when the file you are referencing is right next to the current file.

This plugin fixes that. It changes Obsidian's behavior so that when a wikilink has no conflicting filenames, it stays nice and clean with a single `[[filename]]`, and when there IS a conflict, it replaces it using a **relative path** instead of a direct path, which looks something more like this: `[[../bar/doc]]`, and the path gets shorter the closer together the files are. (e.g. `[[./doc]]` for a file in the same folder)

If the relative path backs up all the way to the start anyways, (e.g. `[[../../../folder/foo]]`) it uses a normal **direct path** instead to be cleaner. (`[[folder/bar]]`)

---

There IS a existing setting called `Path from current file` under "Files and links > New link format", but that applys to **every** link, so you get things like `[[../../folder/foobar]]`, even if you only have 1 file called `foobar` in your entire vault.

This plugin keeps the default `[[foobar]]` formatting when possible, keeping your links nice and tidy.
