---
layout: '../../layouts/PostLayout.astro'
title: My working environment
description: Setup working environment with Kitty,Tmux, Neovim.
date: 2024-01-27T00:00:00Z
thumbnail: '/src/pages/posts/my-working-environment/thumbnail.jpg'
---

## OS (Manjaro)

**yay**

```bash
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

**Nerd font (Iosevka)**

[https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/IosevkaTerm/Regular](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/IosevkaTerm/Regular)

## Terminal (kitty)

```bash
yay -S kitty
```

**kitty.conf** (~/.config/kitty/kitty.conf)

Theme: [**catppuccin**](https://github.com/catppuccin/kitty)

```bash
font_family      IosevkaTerm Nerd Font
bold_font        auto
italic_font      auto
bold_italic_font auto

font_size 12.0

background_opacity 1
hide_window_decorations true
shell_integration no-cursor
window_margin_width 10

# The basic colors
foreground              #CDD6F4
background              #1E1E2E
selection_foreground    #1E1E2E
selection_background    #F5E0DC

# Cursor colors
cursor                  #F5E0DC
cursor_text_color       #1E1E2E
cursor_shape            block

# URL underline color when hovering with mouse
url_color               #F5E0DC

# Kitty window border colors
active_border_color     #B4BEFE
inactive_border_color   #6C7086
bell_border_color       #F9E2AF

# OS Window titlebar colors
wayland_titlebar_color system
macos_titlebar_color system

# Tab bar colors
active_tab_foreground   #11111B
active_tab_background   #CBA6F7
inactive_tab_foreground #CDD6F4
inactive_tab_background #181825
tab_bar_background      #11111B

# Colors for marks (marked text in the terminal)
mark1_foreground #1E1E2E
mark1_background #B4BEFE
mark2_foreground #1E1E2E
mark2_background #CBA6F7
mark3_foreground #1E1E2E
mark3_background #74C7EC

# The 16 terminal colors

# black
color0 #45475A
color8 #585B70

# red
color1 #F38BA8
color9 #F38BA8

# green
color2  #A6E3A1
color10 #A6E3A1

# yellow
color3  #F9E2AF
color11 #F9E2AF

# blue
color4  #89B4FA
color12 #89B4FA

# magenta
color5  #F5C2E7
color13 #F5C2E7

# cyan
color6  #94E2D5
color14 #94E2D5

# white
color7  #BAC2DE
color15 #A6ADC8
```

## Terminal multiplexer (Tmux)

```bash
yay -S tmux
```

**Tmux Plugin Manager (tpm)**

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

**.tmux.conf** (~/.tmux.conf)

```bash
# Configuration
set -g mouse on
set -g default-terminal "screen-256color"
set -g terminal-overrides ",xterm-256color*:Tc"
set -g status-style bg=default
set-option -sg escape-time 10
set-option -g focus-events on
set-window-option -g mode-keys vi

# Key binding
set-option -g prefix C-a
bind-key C-a send-prefix

bind-key -T copy-mode-vi 'v' send -X begin-selection
bind-key -T copy-mode-vi 'r' send -X rectangle-toggle

unbind \"
unbind %
bind-key e split-window -h -c '#{pane_current_path}'
bind-key v split-window -v -c '#{pane_current_path}'
bind-key c new-window -c "#{pane_current_path}"

bind-key -r -T prefix k select-pane -U
bind-key -r -T prefix j select-pane -D
bind-key -r -T prefix h select-pane -L
bind-key -r -T prefix l select-pane -R
bind-key r source-file ~/.tmux.conf \; display-message "Reloaded"

# Plugin
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-open'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @plugin 'tmux-plugins/tmux-yank'

set -g @resurrect-dir '~/.tmux/sessions'
set -g @continuum-restore 'on'
set -g @yank_selection_mouse 'clipboard'

# Status line
set -g status-left-length 30
set -g status-left "#[fg=#181825,bg=#89B4FA,bold]  #S  "
set -g status-right '#{?client_prefix,#[fg=#89b4fa],}'
setw -g window-status-format "#[fg=#585B70,bg=#181825]  #I #W  "
setw -g window-status-current-format "#[fg=#89B4FA,bg=#45475A]  #I #[fg=#CDD6F4,bg=#45475A]#W  "
setw -g window-status-separator ""

run '~/.tmux/plugins/tpm/tpm'
```

Install plugins:

- https://github.com/tmux-plugins/tmux-open: open highlighted selection directly from tmux copy mode.
- https://github.com/tmux-plugins/tmux-resurrect: Restore and save tmux session
- https://github.com/tmux-plugins/tmux-continuum: Restore session when tmux is started.
- https://github.com/tmux-plugins/tmux-yank: copy to system clipboard.

```bash
~/.tmux/plugins/tpm/bin/install_plugins
```

## Shell (zsh)

**oh-my-zsh**

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**zsh-autosuggestions**

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

**asdf**

```bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
```

```bash
asdf plugin add nodejs
asdf plugin add yarn
asdf plugin add pnpm

asdf install nodejs 20.11.0
asdf install yarn 1.22.19
asdf install pnpm 8.14.3
```

**.tool-versions** (~/.tool-versions)

```bash
nodejs 20.11.0
yarn 1.22.19
pnpm 8.14.3
```

**.zshrc** (~/.zshrc)

```bash
ZSH_THEME="robbyrussell"
plugins=(
  asdf
  vi-mode
  zsh-autosuggestions
)

alias v='nvim'

export ZSH=$HOME/.oh-my-zsh
export EDITOR=nvim

source $ZSH/oh-my-zsh.sh
```

Reload config

```bash
source .zshrc
```

## Editor (Neovim)

```bash
yay -S neovim
```

```bash
~/.config/nvim
├── init.lua
├── lazy-lock.json
├── lua
│   ├── bootstrap.lua
│   ├── keymap.lua
│   ├── option.lua
│   └── plugins
│       ├── code.lua
│       ├── editor.lua
│       ├── lsp.lua
│       ├── theme.lua
│       └── ui.lua
├── package.json
├── prettier.config.js
├── snippets
│   ├── common.json
│   ├── css.json
│   ├── html.json
│   ├── javascript.json
│   └── react.json
└── stylua.toml
```

The full config: [https://github.com/1612492/dotfiles/tree/main/nvim](https://github.com/1612492/dotfiles/tree/main/nvim)

Installation script: (copy kitty, tmux, zsh, neovim config)

```lua
sh -c "$(curl -fsSL https://raw.githubusercontent.com/1612492/dotfiles/main/install.sh)"
```
