/**
 * Terminal Core Logic
 * Handles command execution, navigation, and terminal interactions
 * Requires: terminal-data.js, terminal-modal.js
 */

// Terminal Elements
const outputElement = document.getElementById('terminal-output');
const inputElement = document.getElementById('command-input');
const inputLine = document.getElementById('input-line');
const pathDisplayElement = document.getElementById('current-path-display');
const promptContainer = document.getElementById('prompt-container');
const crtOverlay = document.getElementById('crt-overlay');
const terminalBody = document.querySelector('.terminal-body');

// Terminal State
let currentPath = [];
let commandHistory = [];
let historyIndex = -1;
let tempInput = "";
let isWaitingForPassword = false;

// Available Commands
const commands = Object.keys(manPages);

function getPromptHTML() {
    const pathStr = '~' + (currentPath.length > 0 ? '/' + currentPath.join('/') : '');
    return `<span class="user">matin@parspack</span>:<span class="path">${pathStr}</span>$`;
}

function updatePrompt() {
    const pathStr = '~' + (currentPath.length > 0 ? '/' + currentPath.join('/') : '');
    pathDisplayElement.textContent = pathStr;
}

function printLine(html, delay = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'line';
            div.innerHTML = html;
            outputElement.appendChild(div);
            // Scroll to bottom
            const terminalBody = document.querySelector('.terminal-body');
            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
            resolve();
        }, delay);
    });
}

async function bootSequence() {
    if (SKIP_BOOT) {
        await printLine("Welcome to Matin Abbasi's Portfolio (Isfahan Linux 22.04) [FAST BOOT]", 0);
        await printLine("Type 'help' to see available commands.", 0);
        inputLine.style.display = 'flex';
        inputElement.focus();
        return;
    }

    // BIOS/UEFI Messages
    await printLine("<span style='color:#888'>Matin's Custom Portfolio System v2.0</span>", 100);
    await printLine("<span style='color:#888'>Copyright (C) 2026 Matin Abbasi - Isfahan, Iran</span>", 50);
    await printLine("<span style='color:#888'>BIOS Date: 04/01/2004  Isfahan Standard Time</span>", 50);
    await printLine("", 100);
    
    // GRUB Bootloader
    await printLine("<span style='color:#00ff00'>GNU GRUB  version 2.06</span>", 150);
    await printLine("", 50);
    await printLine("  Isfahan Linux 22.04 LTS (Matin Edition)", 100);
    await printLine("  Advanced options for Isfahan Linux", 80);
    await printLine("  System recovery options", 80);
    await printLine("", 200);
    await printLine("Loading Linux 6.1.0-matin-parspack ...", 400);
    await printLine("Loading initial ramdisk ...", 350);
    await printLine("", 200);

    // Early Boot Messages
    await printLine("<span style='color:#888'>[    0.000000] Linux version 6.1.0-matin (matin@parspack) (gcc 11.3.0) #1 SMP PREEMPT_DYNAMIC Thu Apr 01 2004</span>", 80);
    await printLine("<span style='color:#888'>[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.1.0-matin root=UUID=portfolio-disk ro quiet splash</span>", 60);
    await printLine("<span style='color:#888'>[    0.001234] Isfahan Linux kernel initialized successfully</span>", 60);
    await printLine("<span style='color:#888'>[    0.234567] CPU: Matin Abbasi Core (Isfahan Edition) @ 2004.04 GHz</span>", 80);
    await printLine("<span style='color:#888'>[    0.456789] Memory: 21GB available (Born: April 2004, Iran)</span>", 70);
    await printLine("", 100);

    // systemd Boot Messages  
    await printLine("[ <span class='boot-ok'>OK</span> ] Reached target Local File Systems (Pre).", 90);
    await printLine("[ <span class='boot-ok'>OK</span> ] Listening on udev Kernel Device Manager Socket.", 70);
    await printLine("[ <span class='boot-ok'>OK</span> ] Started Journal Service.", 80);
    await printLine("[ <span class='boot-ok'>OK</span> ] Finished Create System Users.", 60);
    await printLine("[ <span class='boot-ok'>OK</span> ] Started Remount Root and Kernel File Systems.", 90);
    await printLine("[ <span class='boot-ok'>OK</span> ] Finished Load Kernel Modules.", 80);
    await printLine("[ <span class='boot-ok'>OK</span> ] Started Coldplug All udev Devices.", 100);
    await printLine("[ <span class='boot-ok'>OK</span> ] Mounted /sys/kernel/config.", 60);
    await printLine("[ <span class='boot-ok'>OK</span> ] Mounted /sys/fs/fuse/connections.", 60);
    await printLine("[ <span class='boot-ok'>OK</span> ] Finished Set the console keyboard layout.", 80);
    await printLine("[ <span class='boot-ok'>OK</span> ] Reached target Local File Systems.", 90);
    await printLine("[ <span class='boot-ok'>OK</span> ] Started Network Name Resolution.", 100);
    await printLine("[ <span class='boot-ok'>OK</span> ] Started System Logging Service.", 70);
    await printLine("[ <span class='boot-ok'>OK</span> ] Started D-Bus System Message Bus.", 80);
    await printLine("[ <span class='boot-ok'>OK</span> ] Reached target Network is Online.", 90);
    
    // Custom Services
    await printLine("[ <span class='boot-ok'>OK</span> ] Started Pars Pack Infrastructure Service.", 100);
    await printLine("[ <span class='boot-ok'>OK</span> ] Started Python Development Environment.", 80);
    await printLine("[ <span class='boot-ok'>OK</span> ] Started Docker Container Runtime.", 90);
    await printLine("[ <span class='boot-ok'>OK</span> ] Started Isfahan Code Repository Manager.", 70);
    await printLine("[ <span class='boot-ok'>OK</span> ] Started Linux System Administration Tools.", 80);
    await printLine("", 150);

    // Progress Bar for User Environment
    const progressDiv = document.createElement('div');
    progressDiv.className = 'line';
    progressDiv.innerHTML = '         Loading Matin\'s Portfolio Environment: <div class="progress-bar"><div class="progress-fill" id="boot-progress"></div></div>';
    outputElement.appendChild(progressDiv);

    const fill = document.getElementById('boot-progress');
    for (let i = 0; i <= 100; i += 5) {
        fill.style.width = i + '%';
        await new Promise(r => setTimeout(r, 30));
    }
    await printLine("", 100);

    // Final Boot Messages
    await printLine("[ <span class='boot-ok'>OK</span> ] Started User Manager for UID 1000 (matin).", 120);
    await printLine("[ <span class='boot-ok'>OK</span> ] Started Session c1 of user matin.", 100);
    await printLine("[ <span class='boot-ok'>OK</span> ] Reached target Multi-User System.", 90);
    await printLine("[ <span class='boot-ok'>OK</span> ] Reached target Graphical Interface.", 80);
    await printLine("", 200);

    // Welcome Banner
    await printLine("<span style='color:#00ffff;font-weight:bold'>═══════════════════════════════════════════════════════════════</span>", 100);
    await printLine("<span style='color:#00ff00;font-weight:bold'>    Welcome to Isfahan Linux 22.04 LTS (Matin Edition)</span>", 100);
    await printLine("<span style='color:#00ffff;font-weight:bold'>═══════════════════════════════════════════════════════════════</span>", 80);
    await printLine("", 50);
    await printLine("  <span style='color:#ffaa00'>👤 User:</span>       Matin Abbasi", 70);
    await printLine("  <span style='color:#ffaa00'>💼 Position:</span>  System Administrator & Software Developer", 70);
    await printLine("  <span style='color:#ffaa00'>🏢 Company:</span>   Pars Pack (https://parspack.com)", 70);
    await printLine("  <span style='color:#ffaa00'>📍 Location:</span>  Isfahan, Iran", 70);
    await printLine("  <span style='color:#ffaa00'>🎓 Education:</span> Computer Engineering, Azad University", 70);
    await printLine("  <span style='color:#ffaa00'>🌐 Blog:</span>      blog.m4t1n.ir", 70);
    await printLine("", 100);
    await printLine("<span style='color:#00ffff;font-weight:bold'>═══════════════════════════════════════════════════════════════</span>", 80);
    await printLine("", 100);
    await printLine("  💡 <span style='color:#ffff00'>Type <span style='color:#00ff00'>help</span> to see available commands</span>", 100);
    await printLine("  💡 <span style='color:#ffff00'>Type <span style='color:#00ff00'>neofetch</span> to see detailed system info</span>", 100);
    await printLine("  💡 <span style='color:#ffff00'>Type <span style='color:#00ff00'>tree</span> to explore directory structure</span>", 100);
    await printLine("", 150);

    inputLine.style.display = 'flex';
    inputElement.focus();
}

function resolvePathStr(pathStr) {
    if (!pathStr) return currentPath;
    let parts = pathStr.split('/').filter(p => p !== '');
    let resolved = pathStr.startsWith('~') || pathStr.startsWith('/') ? [] : [...currentPath];
    if (pathStr.startsWith('~')) parts = parts.slice(1);
    for (const part of parts) {
        if (part === '.') continue;
        if (part === '..') { if (resolved.length > 0) resolved.pop(); }
        else resolved.push(part);
    }
    return resolved;
}

function getNode(pathArray) {
    let node = fileSystem;
    for (const part of pathArray) {
        if (node.type !== 'dir' || !node.content[part]) return null;
        node = node.content[part];
    }
    return node;
}

function executeCommand(input) {
    const trimmed = input.trim();

    if (isWaitingForPassword) {
        isWaitingForPassword = false;
        inputElement.type = 'text';
        promptContainer.style.display = 'inline';
        
        // Check password
        if (trimmed === SUDO_PASSWORD) {
            printLine(`<span class="success">✓ Authentication successful</span>`);
            printLine('');
            
            // Execute the sudo command that was stored
            const sudoCmd = window.pendingSudoCommand;
            window.pendingSudoCommand = null;
            
            if (sudoCmd === 'help') {
                printLine('<span style="color:#00ffff;font-weight:bold">╔══════════════════════════════════════════════════════════════╗</span>');
                printLine('<span style="color:#00ffff;font-weight:bold">║</span>  <span style="color:#ffaa00;font-size:16px;font-weight:bold">🔐 SUDO Commands (Admin Only)</span>                           <span style="color:#00ffff;font-weight:bold">║</span>');
                printLine('<span style="color:#00ffff;font-weight:bold">╚══════════════════════════════════════════════════════════════╝</span>');
                printLine('');
                printLine('<span style="color:#ff5555">⚠️  CAUTION: You have root access. Be careful!</span>');
                printLine('');
                printLine('<span class="user">sudo shutdown</span>      - Shutdown the system');
                printLine('<span class="user">sudo reboot</span>        - Reboot the system');
                printLine('<span class="user">sudo install [pkg]</span> - Install a package');
                printLine('<span class="user">sudo update</span>        - Update system packages');
                printLine('<span class="user">sudo whoami</span>        - Show current user (root)');
                printLine('<span class="user">sudo secret</span>        - 👀 Reveal a secret...');
            } else if (sudoCmd === 'whoami') {
                printLine('<span style="color:#ff5555;font-weight:bold">root</span>');
            } else if (sudoCmd === 'shutdown') {
                printLine('<span class="boot-ok">[  OK  ]</span> Stopped target Graphical Interface');
                printLine('<span class="boot-ok">[  OK  ]</span> Stopped target Multi-User System');
                printLine('<span style="color:#ffaa00">         Stopping Session Manager...</span>');
                printLine('<span style="color:#ffaa00">         Stopping User Login Management...</span>');
                printLine('<span class="boot-ok">[  OK  ]</span> Stopped target Network');
                printLine('<span style="color:#ff5555;font-weight:bold">System is going down for poweroff NOW!</span>');
                setTimeout(() => {
                    printLine('');
                    printLine('<span style="color:#555">Connection closed by remote host.</span>');
                    inputElement.disabled = true;
                }, 1000);
            } else if (sudoCmd === 'reboot') {
                printLine('<span class="boot-ok">[  OK  ]</span> Reached target Reboot');
                printLine('<span style="color:#ffaa00">         Rebooting...</span>');
                setTimeout(() => {
                    outputElement.innerHTML = '';
                    inputElement.disabled = false;
                    bootSequence();
                }, 1500);
            } else if (sudoCmd && sudoCmd.startsWith('install ')) {
                const pkg = sudoCmd.split(' ')[1];
                printLine(`Reading package lists... Done`);
                printLine(`Building dependency tree... Done`);
                printLine(`Reading state information... Done`);
                printLine(`The following NEW packages will be installed:`);
                printLine(`  ${pkg}`);
                printLine(`0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.`);
                printLine(`<span class="success">✓ Package '${pkg}' installed successfully!</span>`);
            } else if (sudoCmd === 'update') {
                printLine('Hit:1 http://ir.archive.ubuntu.com/ubuntu jammy InRelease');
                printLine('Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]');
                printLine('Get:3 http://ir.archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]');
                printLine('Fetched 229 kB in 2s (114 kB/s)');
                printLine('Reading package lists... Done');
                printLine('<span class="success">✓ System packages updated successfully!</span>');
            } else if (sudoCmd === 'secret') {
                printLine('');
                printLine('<span style="color:#00ffff;font-weight:bold">╔══════════════════════════════════════════════════════════════╗</span>');
                printLine('<span style="color:#00ffff;font-weight:bold">║</span>  <span style="color:#ffaa00;font-size:18px;font-weight:bold">🎉 SECRET UNLOCKED!</span>                                    <span style="color:#00ffff;font-weight:bold">║</span>');
                printLine('<span style="color:#00ffff;font-weight:bold">╚══════════════════════════════════════════════════════════════╝</span>');
                printLine('');
                printLine('<span style="color:#50fa7b">🚀 You found the hidden message!</span>');
                printLine('');
                printLine('<span style="color:#ff79c6">"The best way to predict the future is to invent it."</span>');
                printLine('                                        <span style="color:#8be9fd">- Alan Kay</span>');
                printLine('');
                printLine('<span style="color:#f1fa8c">💡 Fun fact: This terminal was coded with ❤️ in Isfahan!</span>');
            } else {
                printLine(`<span class="error">sudo: ${sudoCmd}: command not found</span>`);
                printLine('Try "sudo help" for available commands.');
            }
        } else {
            printLine(`<span class="error">Sorry, try again.</span>`);
            printLine(`<span class="error">matin is not in the sudoers file. This incident will be reported.</span>`);
        }
        return;
    }

    if (!trimmed) {
        printLine(`${getPromptHTML()}`);
        return;
    }

    if (trimmed.length > 0) {
        commandHistory.push(trimmed);
        historyIndex = -1;
        tempInput = "";
    }

    printLine(`${getPromptHTML()} ${input}`);
    const args = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g).map(arg => arg.replace(/^"|"$/g, ''));
    const cmd = args[0];

    switch (cmd) {
        case 'help':
            printLine('<div class="help-output">Available commands:');
            printLine('  <span class="user">ls</span> [-la]     - List files (color-coded)');
            printLine('  <span class="user">cd</span> [dir]       - Change directory');
            printLine('  <span class="user">cat</span> [file]     - View file');
            printLine('  <span class="user">pwd</span>            - Show current directory path');
            printLine('  <span class="user">tree</span>           - Visualize directories');
            printLine('  <span class="user">clear</span>          - Clear the terminal');
            printLine('');
            printLine('  <span style="color:#ffaa00">System Info:</span>');
            printLine('  <span class="user">whoami</span>         - Show current user');
            printLine('  <span class="user">date</span>           - Show current date');
            printLine('  <span class="user">neofetch</span>       - System information display');
            printLine('  <span class="user">uname -a</span>       - Kernel information');
            printLine('  <span class="user">banner</span>         - Show welcome banner');
            printLine('');
            printLine('  <span style="color:#ffaa00">Personal:</span>');
            printLine('  <span class="user">about</span>          - About Matin Abbasi');
            printLine('  <span class="user">skills</span>         - Technical skills');
            printLine('  <span class="user">contact</span>        - Contact information');
            printLine('');
            printLine('  <span style="color:#ffaa00">Appearance:</span>');
            printLine('  <span class="user">themes</span>         - List available themes 🎨');
            printLine('  <span class="user">theme</span> [name]   - Change terminal theme');
            printLine('                       Available: dracula, monokai, nord,');
            printLine('                       solarized, matrix, cyberpunk, default');
            printLine('  <span class="user">crt</span> [on|off]   - Toggle CRT effect');
            printLine('');
            printLine('  <span style="color:#ffaa00">Misc:</span>');
            printLine('  <span class="user">echo</span> [text]    - Echo text');
            printLine('  <span class="user">man</span> [cmd]      - Manual pages');
            printLine('  <span class="user">sudo</span>           - Administrator access 🔒</div>');
            break;

        case 'crt':
            const state = args[1];
            if (state === 'on') {
                crtOverlay.classList.remove('crt-hidden');
                printLine('CRT overlay enabled.');
            } else if (state === 'off') {
                crtOverlay.classList.add('crt-hidden');
                printLine('CRT overlay disabled.');
            } else {
                printLine('Usage: crt [on|off]');
            }
            break;

        case 'ls':
            let flags = '';
            let pathArg = '';
            for (let i = 1; i < args.length; i++) {
                if (args[i].startsWith('-')) flags += args[i].substring(1);
                else { pathArg = args[i]; break; }
            }
            const showAll = flags.includes('a');
            const showLong = flags.includes('l');
            let targetLsPath = pathArg ? resolvePathStr(pathArg) : currentPath;
            let lsNode = getNode(targetLsPath);

            if (!lsNode) {
                printLine(`<span class="error">ls: cannot access '${pathArg}': No such file or directory</span>`);
            } else if (lsNode.type === 'file') {
                const cls = lsNode.isExec ? 'ls-exec' : 'ls-file';
                printLine(`<span class="${cls}">${pathArg || args[0]}</span>`);
            } else {
                let items = Object.keys(lsNode.content).sort();
                if (showAll) items = ['.', '..', ...items];
                if (showLong) {
                    let tableHtml = '<table class="ls-table">';
                    items.forEach(item => {
                        let isDir = item === '.' || item === '..' || lsNode.content[item].type === 'dir';
                        let isExec = !isDir && lsNode.content[item]?.isExec;
                        let size = isDir ? '4.0K' : (lsNode.content[item]?.size || '0B');
                        let perms = isDir ? 'drwxr-xr-x' : (isExec ? '-rwxr-xr-x' : '-rw-r--r--');
                        let cls = isDir ? 'ls-dir' : (isExec ? 'ls-exec' : 'ls-file');
                        tableHtml += `<tr><td>${perms}</td><td>matin</td><td>${size}</td><td>${BOOT_TIME}</td><td class="${cls}">${isDir && item !== '.' && item !== '..' ? item + '/' : item}</td></tr>`;
                    });
                    printLine(tableHtml + '</table>');
                } else {
                    printLine(items.map(item => {
                        let isDir = item === '.' || item === '..' || lsNode.content[item].type === 'dir';
                        let isExec = !isDir && lsNode.content[item]?.isExec;
                        let cls = isDir ? 'ls-dir' : (isExec ? 'ls-exec' : 'ls-file');
                        return `<span class="${cls}">${item}${isDir && item !== '.' && item !== '..' ? '/' : ''}</span>`;
                    }).join(' '));
                }
            }
            break;

        case 'themes':
            printLine('<span style="color:#00ffff;font-weight:bold">╔══════════════════════════════════════════════════════════════╗</span>');
            printLine('<span style="color:#00ffff;font-weight:bold">║</span>  <span style="color:#ffaa00;font-size:16px;font-weight:bold">🎨 Available Terminal Themes</span>                            <span style="color:#00ffff;font-weight:bold">║</span>');
            printLine('<span style="color:#00ffff;font-weight:bold">╚══════════════════════════════════════════════════════════════╝</span>');
            printLine('');
            
            const currentTheme = localStorage.getItem('terminal-theme') || DEFAULT_THEME;
            for (const [key, theme] of Object.entries(THEMES)) {
                const active = key === currentTheme ? ' <span style="color:#00ff00">✓ (active)</span>' : '';
                printLine(`  <span style="color:#00ffff;font-weight:bold">${theme.name.padEnd(18)}</span> ${theme.description}${active}`);
            }
            printLine('');
            printLine('Use <span class="user">theme [name]</span> to switch themes. Example: <span class="user">theme dracula</span>');
            break;

        case 'theme':
            if (args.length < 2) {
                const currentTheme = localStorage.getItem('terminal-theme') || DEFAULT_THEME;
                printLine(`Current theme: <span class="success">${THEMES[currentTheme].name}</span>`);
                printLine('Use <span class="user">themes</span> to see all available themes.');
                break;
            }
            
            const themeName = args[1].toLowerCase();
            if (THEMES[themeName]) {
                applyTheme(themeName);
                localStorage.setItem('terminal-theme', themeName);
                printLine(`<span class="success">✓ Theme changed to ${THEMES[themeName].name}</span>`);
            } else {
                printLine(`<span class="error">Error: Theme '${themeName}' not found.</span>`);
                printLine('Use <span class="user">themes</span> to see available themes.');
            }
            break;

        case 'clear':
            outputElement.innerHTML = '';
            break;

        case 'sudo':
            if (args.length < 2) {
                printLine('<span class="error">usage: sudo [command]</span>');
                printLine('Try "sudo help" for more information.');
                break;
            }
            
            // Store the command to execute after password
            window.pendingSudoCommand = args.slice(1).join(' ');
            
            printLine(`[sudo] password for matin: `);
            isWaitingForPassword = true;
            inputElement.type = 'password';
            promptContainer.style.display = 'none';
            break;

        case 'neofetch':
            const age = getAge();
            printLine(`
<div class="neofetch-container">
    <div class="ascii-logo">
         _nnnn_
        dGGGGMMb
       @p~qp~~qMb
       M|@||@) M|
       @,----.JM|
      JS^\\__/  qKL
     dZP        qKRb
    dZP          qKKb
   fZP            SMMb
   HZM            MMMM
   FqM            MMMM
 __| ".        |\\dS"qML
 |    '.       | \\' \\Zq
_)      \\.___.,|     .'
\\____   )MMMMMP|   .'
     '-'       '--'
    </div>
    <div class="system-info">
        <div class="info-header">matin@parspack</div>
        <div><span class="info-label">Name</span>: Matin Abbasi</div>
        <div><span class="info-label">Age</span>: ${age} years</div>
        <div><span class="info-label">Location</span>: Isfahan, Iran 🇮🇷</div>
        <div><span class="info-label">Email</span>: matinabbasi788@gmail.com</div>
        <div><span class="info-label">Job</span>: System Administrator & Developer</div>
        <div><span class="info-label">Company</span>: Pars Pack</div>
        <div><span class="info-label">University</span>: Azad University NajafAbad</div>
        <div><span class="info-label">Degree</span>: Computer Engineering (2022-Present)</div>
        <div><span class="info-label">Blog</span>: blog.m4t1n.ir</div>
        <div><span class="info-label">Skills</span>: Linux (80%), Python (90%), DevOps</div>
        <div style="display:flex; gap:2px; margin-top:5px;">
            <div style="background:#000; width:15px; height:15px;"></div>
            <div style="background:#f00; width:15px; height:15px;"></div>
            <div style="background:#0f0; width:15px; height:15px;"></div>
            <div style="background:#ff0; width:15px; height:15px;"></div>
            <div style="background:#00f; width:15px; height:15px;"></div>
            <div style="background:#f0f; width:15px; height:15px;"></div>
            <div style="background:#0ff; width:15px; height:15px;"></div>
            <div style="background:#fff; width:15px; height:15px;"></div>
        </div>
    </div>
</div>`);
            break;

        case 'cd':
            let targetCdPath = !args[1] || args[1] === '~' ? [] : resolvePathStr(args[1]);
            let cdNode = getNode(targetCdPath);
            if (!cdNode) printLine(`<span class="error">cd: ${args[1]}: No such file or directory</span>`);
            else if (cdNode.type !== 'dir') printLine(`<span class="error">cd: ${args[1]}: Not a directory</span>`);
            else { currentPath = targetCdPath; updatePrompt(); }
            break;

        case 'cat':
            if (!args[1]) { printLine(`<span class="error">cat: missing operand</span>`); break; }
            let targetCatPath = resolvePathStr(args[1]);
            let catNode = getNode(targetCatPath);
            if (!catNode) printLine(`<span class="error">cat: ${args[1]}: No such file or directory</span>`);
            else if (catNode.type === 'dir') printLine(`<span class="error">cat: ${args[1]}: Is a directory</span>`);
            else printLine(catNode.content);
            break;

        case 'pwd':
            printLine('~' + (currentPath.length > 0 ? '/' + currentPath.join('/') : ''));
            break;

        case 'whoami': printLine('matin'); break;
        case 'date': printLine(new Date().toString()); break;
        case 'echo': printLine(args.slice(1).join(' ')); break;
        case 'uname': printLine(args[1] === '-a' ? `Linux parspack 6.1.0-matin #1 SMP PREEMPT_DYNAMIC Thu Apr 01 12:00:00 IRDT 2026 x86_64 GNU/Linux` : `Linux`); break;
        case 'man':
            if (!args[1]) {
                printLine(`<span class="error">What manual page do you want?</span>`);
            } else if (manPages[args[1]]) {
                printLine(manPages[args[1]]);
            } else {
                printLine(`<span class="error">No manual entry for ${args[1]}</span>`);
            }
            break;

        case 'tree':
            function printTree(node, prefix = '', isLast = true) {
                const items = Object.keys(node.content || {});
                items.forEach((item, index) => {
                    const isLastItem = index === items.length - 1;
                    const branch = isLastItem ? '└── ' : '├── ';
                    const extension = isLastItem ? '    ' : '│   ';
                    const childNode = node.content[item];
                    const isDir = childNode.type === 'dir';
                    const cls = isDir ? 'ls-dir' : (childNode.isExec ? 'ls-exec' : 'ls-file');
                    printLine(`${prefix}${branch}<span class="${cls}">${item}${isDir ? '/' : ''}</span>`);
                    if (isDir) {
                        printTree(childNode, prefix + extension, isLastItem);
                    }
                });
            }
            if (args[1]) {
                const treePath = resolvePathStr(args[1]);
                const treeNode = getNode(treePath);
                if (!treeNode) {
                    printLine(`<span class="error">tree: ${args[1]}: No such file or directory</span>`);
                } else if (treeNode.type !== 'dir') {
                    printLine(`<span class="error">tree: ${args[1]}: Not a directory</span>`);
                } else {
                    printLine(`<span class="ls-dir">${args[1]}/</span>`);
                    printTree(treeNode);
                }
            } else {
                printLine(`<span class="ls-dir">~${currentPath.length > 0 ? '/' + currentPath.join('/') : ''}/</span>`);
                printTree(getNode(currentPath));
            }
            break;

        case 'about':
            printLine('<span style="color:#00ffff;font-weight:bold">╔══════════════════════════════════════════════════════════════╗</span>');
            printLine('<span style="color:#00ffff;font-weight:bold">║</span>  <span style="color:#ffaa00;font-size:18px;font-weight:bold">About Matin Abbasi</span>                                      <span style="color:#00ffff;font-weight:bold">║</span>');
            printLine('<span style="color:#00ffff;font-weight:bold">╚══════════════════════════════════════════════════════════════╝</span>');
            printLine('');
            printLine('<span style="color:#00ff00">👤 Full Name:</span>     Matin Abbasi');
            printLine(`<span style="color:#00ff00">🎂 Born:</span>          April 01, 2004 (Age: ${getAge()})`);
            printLine('<span style="color:#00ff00">📍 Location:</span>      Isfahan, Iran 🇮🇷');
            printLine('<span style="color:#00ff00">💼 Position:</span>      System Administrator & Software Developer');
            printLine('<span style="color:#00ff00">🏢 Company:</span>       Pars Pack (<span style="color:#3b8eea">parspack.com</span>)');
            printLine('<span style="color:#00ff00">🎓 Education:</span>     Azad University of NajafAbad');
            printLine('                    Computer Engineering (2022 - Present)');
            printLine('<span style="color:#00ff00">🌐 Website:</span>       <a href="https://blog.m4t1n.ir" style="color:#3b8eea">blog.m4t1n.ir</a>');
            printLine('');
            printLine('<span style="color:#ffaa00;font-weight:bold">About Me:</span>');
            printLine("I'm a passionate system administrator and software developer based in Iran.");
            printLine('Currently working at Pars Pack, I balance practical industry experience with');
            printLine('academic exploration in fields like algorithms, operating systems, and AI.');
            printLine('');
            printLine('I build scalable backend systems, compete in coding competitions, and deliver');
            printLine('technical presentations. From intelligent store management systems to');
            printLine('containerized development environments.');
            printLine('');
            printLine("My goal: software that's robust, maintainable, and meaningful.");
            break;

        case 'skills':
            printLine('<span style="color:#00ffff;font-weight:bold">╔══════════════════════════════════════════════════════════════╗</span>');
            printLine('<span style="color:#00ffff;font-weight:bold">║</span>  <span style="color:#ffaa00;font-size:18px;font-weight:bold">Technical Skills</span>                                       <span style="color:#00ffff;font-weight:bold">║</span>');
            printLine('<span style="color:#00ffff;font-weight:bold">╚══════════════════════════════════════════════════════════════╝</span>');
            printLine('');
            printLine('<span style="color:#ffaa00">⚡ Core Expertise:</span>');
            printLine('');
            printLine('  <span style="color:#00ff00">🐧 Linux System Administration</span>     [<span style="color:#00ff00">████████</span><span style="color:#333">██</span>] 80%');
            printLine('     • Server management and configuration');
            printLine('     • Shell scripting and automation');
            printLine('     • System security and monitoring');
            printLine('');
            printLine('  <span style="color:#00ff00">🐍 Python Development</span>              [<span style="color:#00ff00">█████████</span><span style="color:#333">█</span>] 90%');
            printLine('     • Backend development');
            printLine('     • Automation scripts & data processing');
            printLine('     • Algorithm implementation');
            printLine('');
            printLine('  <span style="color:#00ff00">🐳 DevOps & Infrastructure</span>         [<span style="color:#00ff00">███████</span><span style="color:#333">███</span>] 70%');
            printLine('     • Docker containerization');
            printLine('     • CI/CD pipelines');
            printLine('     • Server deployment & optimization');
            printLine('');
            printLine('<span style="color:#ffaa00">🎨 Design & Frontend:</span>');
            printLine('');
            printLine('  <span style="color:#3b8eea">🎨 Web Design</span>                     [<span style="color:#3b8eea">████</span><span style="color:#333">██████</span>] 40%');
            printLine('  <span style="color:#3b8eea">🖼️  Graphic Design</span>                 [<span style="color:#3b8eea">█████</span><span style="color:#333">█████</span>] 50%');
            printLine('  <span style="color:#3b8eea">✨ Branding</span>                        [<span style="color:#3b8eea">█████████</span><span style="color:#333">█</span>] 90%');
            printLine('  <span style="color:#3b8eea">📝 WordPress</span>                      [<span style="color:#3b8eea">█████</span><span style="color:#333">█████</span>] 50%');
            printLine('');
            printLine('<span style="color:#ffaa00">🛠️  Additional Skills:</span>');
            printLine('  • Git & Version Control  • Database Management');
            printLine('  • Network Engineering    • Problem Solving');
            printLine('  • Technical Writing      • Team Collaboration');
            break;

        case 'contact':
            printLine('<span style="color:#00ffff;font-weight:bold">╔══════════════════════════════════════════════════════════════╗</span>');
            printLine('<span style="color:#00ffff;font-weight:bold">║</span>  <span style="color:#ffaa00;font-size:18px;font-weight:bold">Contact Information</span>                                    <span style="color:#00ffff;font-weight:bold">║</span>');
            printLine('<span style="color:#00ffff;font-weight:bold">╚══════════════════════════════════════════════════════════════╝</span>');
            printLine('');
            printLine('<span style="color:#00ff00">📧 Email:</span>       <a href="mailto:matinabbasi788@gmail.com" style="color:#3b8eea">matinabbasi788@gmail.com</a>');
            printLine('<span style="color:#00ff00">📱 Phone:</span>       +98 914 036-2101');
            printLine('<span style="color:#00ff00">🌐 Blog:</span>        <a href="https://blog.m4t1n.ir" style="color:#3b8eea" target="_blank">blog.m4t1n.ir</a>');
            printLine('');
            printLine('<span style="color:#ffaa00">🔗 Social Links:</span>');
            printLine('');
            printLine('  <span style="color:#fff">GitHub:</span>      <a href="https://github.com/matinabbasi788" style="color:#3b8eea" target="_blank">github.com/matinabbasi788</a>');
            printLine('  <span style="color:#fff">LinkedIn:</span>    <a href="https://linkedin.com/in/matinabbasi" style="color:#3b8eea" target="_blank">linkedin.com/in/matinabbasi</a>');
            printLine('');
            printLine('<span style="color:#888">Feel free to reach out for collaboration or opportunities!</span>');
            break;

        case 'banner':
            printLine('<span style="color:#00ffff;font-weight:bold">═══════════════════════════════════════════════════════════════</span>');
            printLine('<span style="color:#00ff00;font-weight:bold">    Welcome to Isfahan Linux 22.04 LTS (Matin Edition)</span>');
            printLine('<span style="color:#00ffff;font-weight:bold">═══════════════════════════════════════════════════════════════</span>');
            printLine('');
            printLine('  <span style="color:#ffaa00">👤 User:</span>       Matin Abbasi');
            printLine('  <span style="color:#ffaa00">💼 Position:</span>  System Administrator & Software Developer');
            printLine('  <span style="color:#ffaa00">🏢 Company:</span>   Pars Pack (https://parspack.com)');
            printLine('  <span style="color:#ffaa00">📍 Location:</span>  Isfahan, Iran');
            printLine('  <span style="color:#ffaa00">🎓 Education:</span> Computer Engineering, Azad University');
            printLine('  <span style="color:#ffaa00">🌐 Blog:</span>      blog.m4t1n.ir');
            printLine('');
            printLine('<span style="color:#00ffff;font-weight:bold">═══════════════════════════════════════════════════════════════</span>');
            printLine('');
            printLine('  💡 <span style="color:#ffff00">Type <span style="color:#00ff00">help</span> to see available commands</span>');
            printLine('  💡 <span style="color:#ffff00">Type <span style="color:#00ff00">about</span> for detailed information</span>');
            printLine('  💡 <span style="color:#ffff00">Type <span style="color:#00ff00">skills</span> to see technical expertise</span>');
            break;

        default:
            printLine(`<span class="error">${cmd}: command not found</span>`);
    }
}

// Input handler
inputElement.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        const currentVal = this.value;
        this.value = '';
        if (isWaitingForPassword) {
            isWaitingForPassword = false;
            this.type = 'text';
            promptContainer.style.display = 'inline';
        }
        printLine(`${isWaitingForPassword ? '' : getPromptHTML()} ${currentVal}^C`);
        historyIndex = -1;
    }
    else if (e.key === 'Enter') {
        const val = this.value;
        this.value = '';
        executeCommand(val);
    }
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (isWaitingForPassword || commandHistory.length === 0) return;
        if (historyIndex === -1) { tempInput = this.value; historyIndex = commandHistory.length - 1; }
        else if (historyIndex > 0) historyIndex--;
        this.value = commandHistory[historyIndex];
        setTimeout(() => this.setSelectionRange(this.value.length, this.value.length), 0);
    }
    else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (isWaitingForPassword || historyIndex === -1) return;
        if (historyIndex < commandHistory.length - 1) { historyIndex++; this.value = commandHistory[historyIndex]; }
        else { historyIndex = -1; this.value = tempInput; }
    }
    else if (e.key === 'Tab') {
        e.preventDefault();
        if (!isWaitingForPassword) handleAutocomplete();
    }
});

function handleAutocomplete() {
    const inputVal = inputElement.value;
    const args = inputVal.split(' ');
    const toComplete = args[args.length - 1];

    if (args.length === 1) {
        const matches = commands.filter(c => c.startsWith(toComplete));
        if (matches.length === 1) inputElement.value = matches[0] + ' ';
        else if (matches.length > 1) {
            printLine(`${getPromptHTML()} ${inputVal}`);
            printLine(matches.join('  '));
        }
    } else if (args[0] === 'theme' && args.length === 2) {
        // Autocomplete theme names
        const themeNames = Object.keys(THEMES);
        const matches = themeNames.filter(t => t.startsWith(toComplete));
        if (matches.length === 1) {
            inputElement.value = 'theme ' + matches[0];
        } else if (matches.length > 1) {
            printLine(`${getPromptHTML()} ${inputVal}`);
            printLine(matches.map(t => `<span style="color:#00ffff">${t}</span>`).join('  '));
        }
    } else {
        const lastSlashPos = toComplete.lastIndexOf('/');
        let dirPathStr = lastSlashPos !== -1 ? toComplete.substring(0, lastSlashPos) : '.';
        let partialName = toComplete.substring(lastSlashPos + 1);
        const resolvedDirPath = resolvePathStr(dirPathStr);
        const dirNode = getNode(resolvedDirPath);

        if (dirNode && dirNode.type === 'dir') {
            const children = Object.keys(dirNode.content);
            const matches = children.filter(c => c.startsWith(partialName));
            if (matches.length === 1) {
                const match = matches[0];
                const isDir = dirNode.content[match].type === 'dir';
                const basePath = lastSlashPos !== -1 ? toComplete.substring(0, lastSlashPos + 1) : '';
                args[args.length - 1] = basePath + match + (isDir ? '/' : ' ');
                inputElement.value = args.join(' ');
            } else if (matches.length > 1) {
                printLine(`${getPromptHTML()} ${inputVal}`);
                printLine(matches.map(m => {
                    const node = dirNode.content[m];
                    const cls = node.type === 'dir' ? 'ls-dir' : (node.isExec ? 'ls-exec' : 'ls-file');
                    return `<span class="${cls}">${m}</span>`;
                }).join('  '));
            }
        }
    }
}

/**
 * Apply theme to terminal
 * @param {string} themeName - Name of the theme to apply
 */
function applyTheme(themeName) {
    const theme = THEMES[themeName];
    if (!theme) return;
    
    // Apply theme colors to terminal body
    terminalBody.style.backgroundColor = theme.background;
    terminalBody.style.color = theme.foreground;
    
    // Apply to input
    inputElement.style.color = theme.foreground;
    inputElement.style.caretColor = theme.user;
    
    // Update CSS custom properties for dynamic elements
    document.documentElement.style.setProperty('--theme-user', theme.user);
    document.documentElement.style.setProperty('--theme-path', theme.path);
    document.documentElement.style.setProperty('--theme-error', theme.error);
    document.documentElement.style.setProperty('--theme-success', theme.success);
    document.documentElement.style.setProperty('--theme-warning', theme.warning);
    document.documentElement.style.setProperty('--theme-info', theme.info);
    document.documentElement.style.setProperty('--theme-prompt', theme.prompt);
    document.documentElement.style.setProperty('--theme-foreground', theme.foreground);
    document.documentElement.style.setProperty('--theme-background', theme.background);
}

function initTerminal() {
    // Load and apply saved theme
    const savedTheme = localStorage.getItem('terminal-theme') || DEFAULT_THEME;
    applyTheme(savedTheme);
    
    bootSequence();
}
