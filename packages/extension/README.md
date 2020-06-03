# Leap

## Features

Use `Caps Lock` to toggle Leap Mode on/off. The following keybindings are active when it's on.

```
================
Base layer
================
i => Up
k => Down
j => Left
l => Right

u => Home
o => End
[ => PageUp
] => PageDn


================
Accerated layer
================
ctrl+i => Paragraph up
ctrl+k => Paragraph down
ctrl+j => Word left
ctrl+l => Word right

ctrl+u => Line start
ctrl+o => Line end
ctrl+[ => Page top
ctrl+] => Page bottom
```

_This is a temporary documentation. An official version is currently being worked on._

## Design Philosophy

1. Ergonomics
   - Finger placement over key names
   - Modifer keys with consistent meaning
     - `Shift` to select
     - `Ctrl` to accelerate
     - `Alt` to manipulate
2. All movement without mouse or arrow keys
   - Including explorer and menu navigation
   - Except for OS native input boxes and menus
3. High compatibility with VS Code built-in behaviors
   - Preserve all VS Code keybindings in edit mode
   - No change to multicursor keybindings
   - Intellisence available in all modes
   - Search and replace available in all modes

## Anti-goals

- `hjkl` navigation. Leap uses `ijkl` for better ergonomics and learning curve.

## Known issues

1. Mode gets out of sync when you toggle capslock from outside of vscode
   - Use `Ctrl`+`Caps Lock` or `Shift`+`Caps Lock` to update the keyboard state without changing the modes.
   - (Work in progress) Use an external companion program to completely disable `Caps Lock` and manage the modes.
2. File free will enter filter mode when `ijkl` is pressed.
   - This is beyond the extension's capability. You can use `Ctrl` + `ijkl` to navigate.
   - (Work in progress) Use an external companion program to map `ijkl` to native arrow keys.
3. Code action (quick fixes) options cannot be navigated with `ijkl`.
   - (Work in progress) Use an external companion program to map `ijkl` to native arrow keys.

## Credits

- Paragraph travel logic is based on [Block Travel](https://github.com/sashaweiss/vscode_block_travel)

## Release Notes

### 0.0.1

Leap is currently pre-release. Stay tuned.
