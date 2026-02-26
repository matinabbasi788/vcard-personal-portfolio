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
        printLine(`<span class="error">Sorry, try again.</span>`);
        printLine(`<span class="error">matin is not in the sudoers file. This incident will be reported.</span>`);
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
            printLine(`Available commands:
  <span class="user">ls</span> [-la]     - List files (color-coded)
  <span class="user">cd</span> [dir]       - Change directory
  <span class="user">cat</span> [file]     - View file
  <span class="user">pwd</span>            - Show current directory path
  <span class="user">tree</span>           - Visualize directories
  <span class="user">clear</span>          - Clear the terminal
  
  <span style="color:#ffaa00">System Info:</span>
  <span class="user">whoami</span>         - Show current user
  <span class="user">date</span>           - Show current date
  <span class="user">neofetch</span>       - System information display
  <span class="user">uname -a</span>       - Kernel information
  <span class="user">banner</span>         - Show welcome banner
  
  <span style="color:#ffaa00">Personal:</span>
  <span class="user">about</span>          - About Matin Abbasi
  <span class="user">skills</span>         - Technical skills
  <span class="user">contact</span>        - Contact information
  
  <span style="color:#ffaa00">Misc:</span>
  <span class="user">echo</span> [text]    - Echo text
  <span class="user">man</span> [cmd]      - Manual pages
  <span class="user">crt</span> [on|off]   - Toggle CRT effect
  <span class="user">sudo</span>           - Administrator access 🔒
  `);
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

        case 'theme':
            printLine(`Terminal themes are fixed in this modal version.`);
            break;

        case 'clear':
            outputElement.innerHTML = '';
            break;

        case 'sudo':
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
            printLine(`
<div style="margin: 10px 0;">
<span style="color:#00ffff;font-weight:bold">╔══════════════════════════════════════════════════════════════╗</span>
<span style="color:#00ffff;font-weight:bold">║</span>  <span style="color:#ffaa00;font-size:18px;font-weight:bold">About Matin Abbasi</span>                                      <span style="color:#00ffff;font-weight:bold">║</span>
<span style="color:#00ffff;font-weight:bold">╚══════════════════════════════════════════════════════════════╝</span>

<span style="color:#00ff00">👤 Full Name:</span>     Matin Abbasi
<span style="color:#00ff00">🎂 Born:</span>          April 01, 2004 (Age: ${getAge()})
<span style="color:#00ff00">📍 Location:</span>      Isfahan, Iran 🇮🇷
<span style="color:#00ff00">💼 Position:</span>      System Administrator & Software Developer
<span style="color:#00ff00">🏢 Company:</span>       Pars Pack (<a href="https://parspack.com" style="color:#3b8eea">parspack.com</a>)
<span style="color:#00ff00">🎓 Education:</span>     Azad University of NajafAbad
                    Computer Engineering (2022 - Present)
<span style="color:#00ff00">🌐 Website:</span>       <a href="https://blog.m4t1n.ir" style="color:#3b8eea">blog.m4t1n.ir</a>

<span style="color:#ffaa00;font-weight:bold">About Me:</span>
I'm a passionate system administrator and software developer based in Iran.
Currently working at Pars Pack, I balance practical industry experience with
academic exploration in fields like algorithms, operating systems, and AI.

I build scalable backend systems, compete in coding competitions, and deliver
technical presentations. From intelligent store management systems to
containerized development environments.

My goal: software that's robust, maintainable, and meaningful.
</div>
`);
            break;

        case 'skills':
            printLine(`
<div style="margin: 10px 0;">
<span style="color:#00ffff;font-weight:bold">╔══════════════════════════════════════════════════════════════╗</span>
<span style="color:#00ffff;font-weight:bold">║</span>  <span style="color:#ffaa00;font-size:18px;font-weight:bold">Technical Skills</span>                                       <span style="color:#00ffff;font-weight:bold">║</span>
<span style="color:#00ffff;font-weight:bold">╚══════════════════════════════════════════════════════════════╝</span>

<span style="color:#ffaa00">⚡ Core Expertise:</span>

  <span style="color:#00ff00">🐧 Linux System Administration</span>     [<span style="color:#00ff00">████████</span><span style="color:#333">██</span>] 80%
     • Server management and configuration
     • Shell scripting and automation
     • System security and monitoring

  <span style="color:#00ff00">🐍 Python Development</span>              [<span style="color:#00ff00">█████████</span><span style="color:#333">█</span>] 90%
     • Backend development
     • Automation scripts & data processing
     • Algorithm implementation

  <span style="color:#00ff00">🐳 DevOps & Infrastructure</span>         [<span style="color:#00ff00">███████</span><span style="color:#333">███</span>] 70%
     • Docker containerization
     • CI/CD pipelines
     • Server deployment & optimization

<span style="color:#ffaa00">🎨 Design & Frontend:</span>

  <span style="color:#3b8eea">🎨 Web Design</span>                     [<span style="color:#3b8eea">████</span><span style="color:#333">██████</span>] 40%
  <span style="color:#3b8eea">🖼️  Graphic Design</span>                 [<span style="color:#3b8eea">█████</span><span style="color:#333">█████</span>] 50%
  <span style="color:#3b8eea">✨ Branding</span>                        [<span style="color:#3b8eea">█████████</span><span style="color:#333">█</span>] 90%
  <span style="color:#3b8eea">📝 WordPress</span>                      [<span style="color:#3b8eea">█████</span><span style="color:#333">█████</span>] 50%

<span style="color:#ffaa00">🛠️  Additional Skills:</span>
  • Git & Version Control  • Database Management
  • Network Engineering    • Problem Solving
  • Technical Writing      • Team Collaboration
</div>
`);
            break;

        case 'contact':
            printLine(`
<div style="margin: 10px 0;">
<span style="color:#00ffff;font-weight:bold">╔══════════════════════════════════════════════════════════════╗</span>
<span style="color:#00ffff;font-weight:bold">║</span>  <span style="color:#ffaa00;font-size:18px;font-weight:bold">Contact Information</span>                                    <span style="color:#00ffff;font-weight:bold">║</span>
<span style="color:#00ffff;font-weight:bold">╚══════════════════════════════════════════════════════════════╝</span>

<span style="color:#00ff00">📧 Email:</span>       <a href="mailto:matinabbasi788@gmail.com" style="color:#3b8eea">matinabbasi788@gmail.com</a>
<span style="color:#00ff00">📱 Phone:</span>       +98 914 036-2101
<span style="color:#00ff00">🌐 Blog:</span>        <a href="https://blog.m4t1n.ir" style="color:#3b8eea" target="_blank">blog.m4t1n.ir</a>

<span style="color:#ffaa00">🔗 Social Links:</span>

  <span style="color:#fff">GitHub:</span>      <a href="https://github.com/matinabbasi788" style="color:#3b8eea" target="_blank">github.com/matinabbasi788</a>
  <span style="color:#fff">LinkedIn:</span>    <a href="https://linkedin.com/in/matinabbasi" style="color:#3b8eea" target="_blank">linkedin.com/in/matinabbasi</a>

<span style="color:#888">Feel free to reach out for collaboration or opportunities!</span>
</div>
`);
            break;

        case 'banner':
            printLine(`
<div style="margin: 10px 0;">
<span style="color:#00ffff;font-weight:bold">═══════════════════════════════════════════════════════════════</span>
<span style="color:#00ff00;font-weight:bold">    Welcome to Isfahan Linux 22.04 LTS (Matin Edition)</span>
<span style="color:#00ffff;font-weight:bold">═══════════════════════════════════════════════════════════════</span>

  <span style='color:#ffaa00'>👤 User:</span>       Matin Abbasi
  <span style='color:#ffaa00'>💼 Position:</span>  System Administrator & Software Developer
  <span style='color:#ffaa00'>🏢 Company:</span>   Pars Pack (https://parspack.com)
  <span style='color:#ffaa00'>📍 Location:</span>  Isfahan, Iran
  <span style='color:#ffaa00'>🎓 Education:</span> Computer Engineering, Azad University
  <span style='color:#ffaa00'>🌐 Blog:</span>      blog.m4t1n.ir

<span style="color:#00ffff;font-weight:bold">═══════════════════════════════════════════════════════════════</span>

  💡 <span style='color:#ffff00'>Type <span style='color:#00ff00'>help</span> to see available commands</span>
  💡 <span style='color:#ffff00'>Type <span style='color:#00ff00'>about</span> for detailed information</span>
  💡 <span style='color:#ffff00'>Type <span style='color:#00ff00'>skills</span> to see technical expertise</span>
</div>
`);
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

function initTerminal() {
    bootSequence();
}
