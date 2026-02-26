# Terminal Module Documentation

This terminal simulator is split into three modular files for better organization and maintainability.

## File Structure

### 1. `terminal-data.js` 
**Purpose:** Data and Configuration
- File system structure with all directories and files
- Personal information (contact, skills, education, experience)
- Manual pages for all commands
- Configuration constants (BOOT_TIME, SKIP_BOOT)
- Age calculation function

**Why separate:** Easy to update personal information without touching the logic

### 2. `terminal.js`
**Purpose:** Core Terminal Logic
- Command execution and parsing
- Navigation (cd, ls, pwd, tree)
- File operations (cat, echo)
- System commands (whoami, date, uname, neofetch)
- Personal commands (about, skills, contact, banner)
- Boot sequence with detailed logs
- Command history and autocomplete
- Input handling

**Why separate:** Contains all the terminal functionality in one organized place

### 3. `terminal-modal.js`
**Purpose:** UI Modal Controls
- Open/close terminal modal
- Minimize/maximize functionality
- Keyboard shortcuts (Escape key)
- Background click handling
- Initialization state management

**Why separate:** Separates UI concerns from terminal logic

## Loading Order

Files must be loaded in this specific order in `index.html`:

```html
<script src="./assets/js/terminal-data.js"></script>   <!-- 1. Data first -->
<script src="./assets/js/terminal.js"></script>        <!-- 2. Logic second -->
<script src="./assets/js/terminal-modal.js"></script>  <!-- 3. UI last -->
```

## Available Commands

### Navigation & File System
- `ls [-la]` - List directory contents (with color coding)
- `cd [dir]` - Change directory
- `cat [file]` - Display file contents
- `pwd` - Print working directory
- `tree` - Display directory tree structure

### System Information
- `whoami` - Display current user
- `date` - Show current date and time
- `neofetch` - Display detailed system information with ASCII art
- `uname -a` - Show kernel information
- `banner` - Display welcome banner

### Personal Information (Custom Commands)
- `about` - Display detailed information about Matin Abbasi
- `skills` - Show technical skills with progress bars
- `contact` - Display contact information and social links

### Utilities
- `echo [text]` - Echo text to terminal
- `clear` - Clear terminal screen
- `man [command]` - Display manual page for command
- `help` - Show all available commands
- `crt [on|off]` - Toggle CRT scanline effect
- `sudo` - Attempt administrator access (for fun!)

## Boot Sequence

The terminal features a realistic Linux boot sequence with:

1. **BIOS/UEFI Messages** - Custom system information
2. **GRUB Bootloader** - GNU GRUB with Isfahan Linux
3. **Kernel Loading** - Linux kernel initialization messages
4. **systemd Boot** - System service startup messages
5. **Custom Services** - Personalized services (Pars Pack, Python, Docker, etc.)
6. **Welcome Banner** - Beautiful ASCII art welcome screen

All boot messages are personalized with Matin's information and Isfahan/Iran context.

## How to Customize

### Update Personal Information
Edit `terminal-data.js`:
- `fileSystem.content.about` - Personal details
- `fileSystem.content.contact` - Social links
- `fileSystem.content.skills` - Technical skills
- `fileSystem.content.education` - University info
- `fileSystem.content.experience` - Work experience

### Modify Boot Sequence
Edit `bootSequence()` function in `terminal.js`:
- Change boot messages
- Adjust timing delays
- Customize progress bar
- Modify welcome banner

### Add New Commands
1. Add command to `manPages` object in `terminal-data.js`
2. Add case in `executeCommand()` switch statement in `terminal.js`
3. Update help command output

### Modify UI Behavior
Edit `terminal-modal.js`:
- Change animation triggers
- Add new keyboard shortcuts
- Modify modal behavior

## Dependencies

- **HTML:** Terminal modal structure in `index.html`
- **CSS:** Terminal styles in `assets/css/style.css`
- **Icons:** Ionicons for terminal icon in floating button

## Features

✅ Full Linux-like file system navigation
✅ 19+ working commands (including custom personal commands)
✅ Realistic boot sequence with 40+ boot messages
✅ Command history with arrow keys
✅ Tab autocomplete for commands and paths
✅ Boot sequence animation with progress bar
✅ CRT overlay effect (toggleable)
✅ Neofetch system information with ASCII art
✅ Custom personal commands (about, skills, contact, banner)
✅ Beautiful formatted output with colors and emojis
✅ Minimizable/maximizable modal
✅ Fully personalized content
✅ Responsive design
✅ Easter eggs (sudo command)

## Personalization Details

### Isfahan Linux Edition
- Custom kernel: `6.1.0-matin-parspack`
- Build date: April 01, 2004 (Matin's birthday)
- Location: Isfahan, Iran
- Company: Pars Pack
- Custom services reflecting Matin's tech stack

### Color Scheme
- Green (`#00ff00`) - Success messages, headers
- Cyan (`#00ffff`) - Borders, decorations
- Yellow (`#ffaa00`) - Labels, warnings
- Blue (`#3b8eea`) - Links, paths
- White (`#cccccc`) - Regular text
- Gray (`#888`) - Secondary text

### Emojis Used
- 👤 User - 💼 Position - 🏢 Company
- 📍 Location - 🎓 Education - 🌐 Website
- 📧 Email - 📱 Phone - 🔗 Links
- 🐧 Linux - 🐍 Python - 🐳 Docker
- ⚡ Core Skills - 🎨 Design - 🛠️ Tools
- 💡 Tips - ✅ Success

---

**Created for:** Matin Abbasi's Portfolio  
**Location:** Isfahan, Iran  
**Last Updated:** February 2026  
**Version:** 2.0 (Isfahan Edition)
