To start dev you must run:

```bash
bun install
bun tauri dev
```

# Backend orientation

For better understanding, how the Backend works, we
separate each major functionalities of Backend into multiple
folders.

What does the backed do? Here's everything what the Backend
does and will do:

- **Audio manipulation**: Backend at the start creates new thread
  with channel sender. This is your main way to request new
  changes to audio player, like volume, play, pause changes
  and so on.
- **Audio info emitter (Getting audio values)**: During the run
  Backend sends every 250ms (this value can be changed during
  the development) runtime information about the audio or the
  audio player into Frontend, which can listen to this channel.

  When new track is loaded, Backend also sends new information
  about this track. This may change to regular invoke. To
  be precise the `load_track` invoke could just send also the
  track.

  Currently only way to get audio options is by invoking
  `get_options`. These values doesn't make sense to send
  through emitting, because you need to get values
  from a file on start and afterwards you have the freshest
  data already in Frontend, because it's the place, where you
  are setting them.
- **Crawling folder for new files**
- **DB, Cache and Configuration manipulation**

So it's even more clearer, here's current version of backend folder with comments
to understand, which part does what:

```text
src-tauri/src/              # root folder (I don't know what to say more)
├── audio/                  # Folder, where the audio backend lives in.
│   │                       # You'll find audio commands to manipulate audio sink,
│   │                       # audio emitters, request types,...
│   │
│   ├── commands/               # Commands, which can be `invoked` from frontend
│   │   ├── getters.rs              # Commands, which will get you some values, like options
│   │   ├── mod.rs                  # Initializer of the directory
│   │   └── setters.rs              # Commands for setting the Audio handler ("Load audio", "Play current", ...).
│   │
│   ├── emitters.rs/            # Functions, which handles emitting data into frontend
│   │                           # (Read the long paragraph about `Audio info emitter`)
│   │
│   ├── handler.rs              # Audio handler, which runs on separate thread.
│   │                           # You could say it's the main part that does the
│   │                           # audio magic
│   │
│   ├── mod.rs                  # Initializer of the directory
│   └── request.rs              # Request types, which can be send to handler
├── crawler/                # Handles folder crawling, creating array of tracks, ... (rn empty)
│   └── mod.rs                  # Initializer of the directory
├── structs/                # Structures, which will be used throughout the backend
│   ├── audio                   # Data primitives connected to the audio
│   │   ├── mod.rs                  # Initializer of the directory
│   │   ├── options.rs              # Options for audio (volume, mute, ...)
│   │   ├── realtime.rs             # Realtime data, which will be send to frontend every `n` ms
│   │   └── track.rs                # Structure of Track, which will be used and saved into file
│   └── mod.rs                  # Initializer of the directory
├── db/                     # This will handle DB communication
│   └── mod.rs                  # Initializer of the directory
├── lib.rs                  # Place, where you put all new folders in project
│                           # and function, which handles the App running.
└── main.rs                 # Rn there's nothing only calling the library function
```
