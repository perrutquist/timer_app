# Multi-Timer PWA ⏱️

A tiny progressive-web app that lets you run a **sequence of timers** described
with plain text. Perfect for interval training, presentations, cooking sessions,
and more.  
Everything runs client-side and also works **offline** thanks to a service
worker.

## Demo

👉 Try the live version at <https://perrutquist.github.io/timer_app/>.  

To run it locally, simply open `index.html` in any modern browser or deploy the
folder to any static host (GitHub Pages, Netlify, Vercel, …).

## Features

- List-driven multi-timer: define any number of timers in a textarea.
- Accepts `mm:ss` or pure seconds.
- Optional *heading*, *sub-heading* and *background color* per timer.
- One-click copy / paste of the timer list via the clipboard.
- Touch & keyboard friendly controls (start, pause, next, previous, reset).
- Responsive UI; content stays vertically centered on all screens.
- Installable PWA – add it to the home screen and use it offline.

## List syntax

Each line describes one timer and is split by **semicolons**:

```
duration ; heading ; sub-heading ; color ; bells
```

Only `duration` is required; the optional `bells` column sets how many bell sounds will play when the timer ends (default `0`):

```
00:20 ; Work ; Round 1 ; red
00:10 ; Rest ; Round 1 ; green
30     ; Presentation intro
```

`color` accepts any valid CSS color (`red`, `#ff0000`, `rgb(255 0 0 / .8)`, …).

Blank lines or lines starting with `#` are ignored.

## Development

Serve the folder with any static server so the service-worker scope works:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Contributing

Issues and pull requests are welcome – the whole codebase is under 200 LOC.

## License

MIT
