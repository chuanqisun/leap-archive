# Leap

## Features

Use `Caps Lock` to toggle "Select"/"Edit" mode. The following keybindings are active for "Select" mode.

_This is a temporary documentation. An official version is currently being worked on._

## Design Philosophy

- Ergonomics
  - Finger placement over key names
  - Modifer keys with consistent meaning
    - `Shift` to select
    - `Ctrl` to accelerate
    - `Alt` to manipulate
  - All movement without mouse or arrow keys
    - Including explorer and menu navigation
    - Except for OS native input boxes and menus
- High compatibility with VS Code built-in behaviors
  - Preserve all VS Code keybindings in edit mode
  - No change to multicursor keybindings
  - Intellisence available in all modes
  - Search and replace available in all modes

## Anti-goals

- `h`, `j`, `k`, `l` navigation. Leap uses `j`, `i`, `k`, `l` for better ergonomics and learning curve.

## FAQ

- What can I do if the mode gets out of sync when I toggle capslock from outside of vscode
  1. Use `Ctrl`+`Caps Lock` or `Shift`+`Caps Lock` to update the keyboard state without changing the modes.
  2. (Work in progress) Use an external companion program to completely disable `Caps Lock` and manage the modes.

## Credits

- Paragraph travel logic is based on [Block Travel](https://github.com/sashaweiss/vscode_block_travel)

## Release Notes

### 0.0.1

Leap is currently pre-release. Stay tuned.
