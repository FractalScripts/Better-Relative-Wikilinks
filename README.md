# Better Relative Wikilinks Plugin for Obsidian

An extremely lightweight Obsidian plugin that makes **`[[wikilinks]]`** cleaner.

---

> [!info]+ Disclaimer:
> This plugin is meant to work with the setting "Files and links > New link format" set to `Shortest path when possible`. If you do not use that setting, turn this plugin off. It won't break, but it will have confusing behavior.

Normally, when you create a wikilink in obsidian, it shows up as just the note name. (e.g. `[[notes]]`)

But what if you create a wikilink to `notes`, but you have 2 or more notes of the same name? In that case, Obsidian creates a **direct path**, which looks something like this: `[[work/summer/meetings/notes]]`

This is fine and all, but having an entire long path in your link is inconvenient when the note you are referencing is right next to the active note.

This plugin fixes that. It changes Obsidian's behavior so that when a wikilink has no conflicting names, it stays nice and clean with a single `[[name]]`, and when there IS a conflict, it replaces it using a **relative path** instead of a direct path, which looks something more like this: `[[../meetings/notes]]`, and the path gets shorter the closer together the notes are. (e.g. `[[./notes]]` for a note in the same folder)

If the relative path backs up all the way to the main vault anyways, (e.g. `[[../../../schedule/dinner]]`) it uses a normal **direct path** instead to be cleaner. (`[[schedule/dinner]]`)

> [!info]+ Note:
> There IS a existing setting called `Path from current file` under "Files and links > New link format", but that applys to **every** link, so you get things like `[[../../contacts/john]]`, even if you only have 1 note called `john` in your entire vault.
> 
> This plugin keeps the default `[[document]]` formatting when possible, keeping your links nice and tidy.
