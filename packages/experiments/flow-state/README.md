# flow-state README

## Roadmap

- [ ] bug: race condition when hold on up/down arrow
- [ ] use insert/esc to collapse selection
- [x] support vertical panning when non-word character is selected (the result will retain one character selection)
- [x] support Home/End on empty line to swap implicit cursor position logic
- [x] use built-in cursor up/down command to handle empty lines pan up/down
- [x] bug: initial pan up/down fails on empty line (consider setting default cursor mode to home)
