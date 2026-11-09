---
layout: '../../layouts/PostLayout.astro'
title: My terminal and editor setup
description: A tour of a Manjaro, Kitty, tmux, zsh, and Neovim setup, with the configuration choices that matter most.
date: 2024-01-27T00:00:00Z
thumbnail: '/src/pages/posts/my-working-environment/thumbnail.jpg'
---

This is a snapshot of the development environment I used when I first wrote this post in **2024**, not a list of current or required tool versions. My setup combines a terminal, a multiplexer, a shell, and an editor so I can stay in one workflow across projects.

## Manjaro and a Nerd Font

I used Manjaro and installed packages from its repositories or the AUR with `yay`. If you need `yay`, follow its [current installation instructions](https://github.com/Jguer/yay#installation); AUR packages are community-maintained, so review them before installing.

For terminal glyphs and icons, I used [IosevkaTerm Nerd Font](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/IosevkaTerm). Install the font on your system before setting it as your terminal font.

## Kitty: the terminal

Kitty handles rendering, fonts, and the color theme. My configuration lives in `~/.config/kitty/kitty.conf`:

```text
font_family IosevkaTerm Nerd Font
font_size 12.0
background_opacity 1
cursor_shape block
window_margin_width 10
```

For the palette, I used [Catppuccin for Kitty](https://github.com/catppuccin/kitty). Keeping the theme separate from the small set of personal settings makes it easier to change colors later without touching the rest of the configuration.

## tmux: persistent sessions and panes

tmux keeps a session running when I detach from the terminal. I changed the prefix to `Ctrl-a`, enabled mouse support, and made new panes inherit the current working directory:

```text
# ~/.tmux.conf
set -g mouse on
set -g default-terminal "screen-256color"
set -g prefix C-a
bind-key C-a send-prefix

bind-key e split-window -h -c '#{pane_current_path}'
bind-key v split-window -v -c '#{pane_current_path}'
bind-key c new-window -c '#{pane_current_path}'

set-window-option -g mode-keys vi
bind-key -T copy-mode-vi v send -X begin-selection
bind-key r source-file ~/.tmux.conf \; display-message "Reloaded"
```

The `-c '#{pane_current_path}'` part saves a small but frequent annoyance: a new pane opens in the directory I am already using.

I managed plugins with [TPM](https://github.com/tmux-plugins/tpm), including [tmux-resurrect](https://github.com/tmux-plugins/tmux-resurrect) for saving sessions, [tmux-continuum](https://github.com/tmux-plugins/tmux-continuum) for automatic persistence, and [tmux-yank](https://github.com/tmux-plugins/tmux-yank) for clipboard integration. After declaring plugins in `.tmux.conf`, TPM installs them with `~/.tmux/plugins/tpm/bin/install_plugins`.

## zsh: shortcuts and versions

My shell setup used [Oh My Zsh](https://ohmyz.sh/), [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions), and a few small settings:

```sh
# ~/.zshrc (excerpt)
export EDITOR=nvim
alias v='nvim'

plugins=(
  vi-mode
  zsh-autosuggestions
)
```

I used [asdf](https://asdf-vm.com/) to pin project tools. At the time, my `~/.tool-versions` looked like this:

```text
nodejs 20.11.0
yarn 1.22.19
pnpm 8.14.3
```

Those versions document the 2024 setup; they are **not** recommendations for new projects. Check each tool's current installation instructions and use the versions your project requires.

## Neovim: the editor

I keep Neovim's configuration in `~/.config/nvim`. `init.lua` loads settings and Lua modules for keymaps, options, plugins, and language tooling:

```text
~/.config/nvim/
├── init.lua
├── lazy-lock.json
├── lua/
│   ├── bootstrap.lua
│   ├── keymap.lua
│   ├── option.lua
│   └── plugins/
└── snippets/
```

The full configuration is in my [dotfiles repository](https://github.com/1612492/dotfiles/tree/main/nvim). Read and adapt configuration files before copying them into your own setup; a terminal workflow is most useful when it fits how **you** work.
