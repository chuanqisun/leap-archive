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
  - All movement without arrow keys
    - Including explorer and menu navigation
    - Except for OS native input boxes and menus
- High compatibility with VS Code built-in behaviors
  - Preserve all VS Code keybindings in edit mode
  - No change to multicursor keybindings
  - Intellisence available in all modes
  - Search and replace available in all modes

## Anti-goals

- `h`, `j`, `k`, `l` navigation. Leap uses `j`, `i`, `k`, `l` for better ergonomics and learning curve.

## Credits

- Paragraph travel logic is based on [Block Travel](https://github.com/sashaweiss/vscode_block_travel)

## Release Notes

### 0.0.1

Leap is currently pre-release. Stay tuned.
