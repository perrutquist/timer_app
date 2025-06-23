# Multi-Timer App ⏱️

A tiny, free, open source progressive-web app that lets you run a **sequence of timers** 
described with plain text. Perfect for interval training, presentations, cooking sessions,
and more.  
Everything runs client-side and also works **offline** thanks to a service
worker.

## Demo

👉 Try the live version at <https://perrutquist.github.io/timer_app/>.  

To run it locally, serve the folder with any static HTTP server (see Development
section) or deploy it to any static host (GitHub Pages, Netlify, Vercel, …).

## Generate timers with ChatGPT 🪄

Need a quick set-up or some inspiration?  
You can ask a Large Language Model (LLM) such as ChatGPT to produce a formatted timer list that you can paste straight into the app.

Example prompt (edit the workout description to your liking):

```
Please write a plain-text list of timers for a the multi-timer app.

FORMAT (exactly):

duration ; heading ; sub-heading ; color ; bells

▪ duration — mm:ss (zero-padded)
▪ heading - Text to be displayed in large font
▪ sub-heading - Text to be displayed in smaller font
▪ color — any valid CSS colour name
▪ bells — integer, number of beep sounds at the end (default 0)

Example:

00:03 ; Get Ready! ; ; white ; 1
00:20 ; Sit-ups ; As many as possible! ; red; 2
00:10 ; Rest ; Get ready for plank. ; green; 1
00:20 ; Plank ; Engage your core! ; red; 2
00:00 ; Done! ; ; white

Task: Design a HIIT routine with
9 rounds of 20 s work / 10 s rest. 1 minute rest after each 3rd round.
5 rounds of 45 s stretch, 15 s rest.

Use different types of exercises as headings, alternating between core, arms and legs.
Give tips specific to the exercise as subheading, or just general encouragement.
Colors: red for work, green for short rest, blue for stretch, white during long rest
Play 2 bells after each work/stretch interval and 1 bell after each rest.

Return ONLY the timer lines, nothing else.
```

Copy the model’s reply into the textarea, hit ▶️, and you’re ready to sweat!

---

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

⚠️  Because the service worker caches files aggressively, you might not see
your changes right away. Perform a hard refresh (Shift-Reload) on desktop
browsers, or — on mobile devices — remove the app from the home-screen and add
it again to pick up the latest version. It may also help to open the **About** 
page (ℹ️ icon) and click **Refresh cached files**

## Contributing

Issues and pull requests are welcome – the whole codebase is under 400 LOC.

## License

MIT
