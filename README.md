# Leap

## Features

Use `Caps Lock` to toggle "Select"/"Edit" mode. The following keybindings are active for "Select" mode.

```json
    "keybindings": [
      {
        "key": "space",
        "command": "editor.action.smartSelect.expand",
        "when": "editorTextFocus"
      },
      {
        "key": "ctrl+space",
        "command": "editor.action.smartSelect.shrink",
        "when": "editorTextFocus && leap.mode == 'select'"
      },
      {
        "key": "i",
        "command": "cursorUp",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "l",
        "command": "cursorWordPartRight",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "k",
        "command": "cursorDown",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "j",
        "command": "cursorWordPartLeft",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "u",
        "command": "cursorHome",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "o",
        "command": "cursorEnd",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "[",
        "command": "cursorPageUp",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "]",
        "command": "cursorPageDown",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "shift+i",
        "command": "cursorUpSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "shift+l",
        "command": "cursorWordPartRightSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "shift+k",
        "command": "cursorDownSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "shift+j",
        "command": "cursorWordPartLeftSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "shift+u",
        "command": "cursorHomeSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "shift+o",
        "command": "cursorEndSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "shift+[",
        "command": "cursorPageUpSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "shift+]",
        "command": "cursorPageDownSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "ctrl+i",
        "command": "cursorUp",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "ctrl+l",
        "command": "cursorRight",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "ctrl+k",
        "command": "cursorDown",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "ctrl+j",
        "command": "cursorLeft",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "ctrl+shift+i",
        "command": "cursorUpSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "ctrl+shift+l",
        "command": "cursorRightSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "ctrl+shift+k",
        "command": "cursorDownSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "ctrl+shift+j",
        "command": "cursorLeftSelect",
        "when": "textInputFocus && leap.mode == 'select'"
      },
      {
        "key": "alt+i",
        "command": "editor.action.moveLinesUpAction",
        "when": "editorTextFocus && !editorReadonly && leap.mode == 'select'"
      },
      {
        "key": "alt+k",
        "command": "editor.action.moveLinesDownAction",
        "when": "editorTextFocus && !editorReadonly && leap.mode == 'select'"
      },
      {
        "key": "shift+alt+i",
        "command": "editor.action.copyLinesUpAction",
        "when": "editorTextFocus && !editorReadonly && leap.mode == 'select'"
      },
      {
        "key": "shift+alt+k",
        "command": "editor.action.copyLinesDownAction",
        "when": "editorTextFocus && !editorReadonly && leap.mode == 'select'"
      },
      {
        "key": "i",
        "command": "selectPrevSuggestion",
        "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus"
      },
      {
        "key": "k",
        "command": "selectNextSuggestion",
        "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus"
      },
      {
        "key": "i",
        "command": "workbench.action.quickOpenNavigatePrevious",
        "when": "inQuickOpen && leap.mode == 'select'"
      },
      {
        "key": "k",
        "command": "workbench.action.quickOpenNavigateNext",
        "when": "inQuickOpen && leap.mode == 'select'"
      },
      {
        "key": "i",
        "command": "list.focusUp",
        "when": "explorerViewletFocus && listFocus && !inputFocus && leap.mode == 'select'"
      },
      {
        "key": "k",
        "command": "list.focusDown",
        "when": "explorerViewletFocus && listFocus && !inputFocus && leap.mode == 'select'"
      },
      {
        "key": "l",
        "command": "list.expand",
        "when": "explorerViewletFocus && listFocus && !inputFocus && leap.mode == 'select'"
      },
      {
        "key": "j",
        "command": "list.collapse",
        "when": "explorerViewletFocus && listFocus && !inputFocus && leap.mode == 'select'"
      }
```

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Beta release of leap keymap
