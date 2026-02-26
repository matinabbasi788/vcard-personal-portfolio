/**
 * Terminal Data & Configuration
 * Contains file system structure and personal information
 */

// Calculate age dynamically
function getAge() {
    const birthDate = new Date('2004-04-01');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age.toString();
}

// File System Structure
const fileSystem = {
    type: 'dir',
    content: {
        'about': {
            type: 'dir',
            content: {
                'name': { type: 'file', content: 'Matin Abbasi', size: '12B' },
                'email': { type: 'file', content: 'matinabbasi788@gmail.com', size: '25B' },
                'phone': { type: 'file', content: '+98 914 036-2101', size: '17B' },
                'birthday': { type: 'file', content: 'April 01, 2004', size: '14B' },
                'age': { type: 'file', content: getAge(), size: '2B' },
                'location': { type: 'file', content: 'Isfahan, Iran', size: '13B' },
                'job': { type: 'file', content: 'System Administrator & Software Developer', size: '42B' },
                'company': { type: 'file', content: 'Pars Pack (https://parspack.com)', size: '33B' },
                'bio.txt': { 
                    type: 'file', 
                    content: `I'm a passionate system administrator and software developer based in Iran.\n\nCurrently working at Pars Pack, I balance practical industry experience with\nacademic exploration in fields like algorithms, operating systems, and AI.\n\nI build scalable backend systems, compete in coding competitions, and deliver\ntechnical presentations. From intelligent store management systems to\ncontainerized development environments.\n\nMy goal: software that's robust, maintainable, and meaningful.`, 
                    size: '512B' 
                }
            }
        },
        'contact': {
            type: 'dir',
            content: {
                'github': { type: 'file', content: 'https://github.com/matinabbasi788', size: '36B' },
                'linkedin': { type: 'file', content: 'https://www.linkedin.com/in/matinabbasi', size: '43B' },
                'blog': { type: 'file', content: 'https://blog.m4t1n.ir', size: '22B' },
                'email': { type: 'file', content: 'matinabbasi788@gmail.com', size: '25B' },
                'phone': { type: 'file', content: '+98 914 036-2101', size: '17B' }
            }
        },
        'skills': {
            type: 'dir',
            content: {
                'linux': { type: 'file', content: 'Linux System Administration (Advanced 80%)\n• Server management and configuration\n• Shell scripting and automation\n• System security and monitoring', size: '25B' },
                'python': { type: 'file', content: 'Python Development (Expert 90%)\n• Backend development\n• Automation scripts\n• Data processing\n• Algorithm implementation', size: '25B' },
                'devops': { type: 'file', content: 'DevOps & Infrastructure\n• Docker containerization\n• CI/CD pipelines\n• Server deployment\n• System optimization', size: '22B' },
                'web_dev': { type: 'file', content: 'Web Development (40%)\n• HTML, CSS, JavaScript\n• Frontend frameworks\n• Responsive design', size: '18B' },
                'networking': { type: 'file', content: 'Network Engineering\n• Network configuration\n• Troubleshooting\n• Security practices', size: '20B' },
                'version_control': { type: 'file', content: 'Git & Version Control\n• Repository management\n• Branching strategies\n• Collaboration workflows', size: '16B' },
                'databases': { type: 'file', content: 'Database Management\n• SQL databases\n• Data modeling\n• Query optimization', size: '18B' }
            }
        },
        'education': {
            type: 'dir',
            content: {
                'university': { 
                    type: 'file', 
                    content: "Azad University of NajafAbad\nBachelor's Degree in Computer Engineering\n2022 - Present\n\nFocusing on practical and research-oriented learning\nin computer science fundamentals.", 
                    size: '150B' 
                },
                'certifications': {
                    type: 'dir',
                    content: {
                        'linux_admin': { type: 'file', content: 'Linux System Administration', size: '26B' },
                        'python_dev': { type: 'file', content: 'Python Development & Scripting', size: '30B' },
                        'networking': { type: 'file', content: 'Network Engineering Fundamentals', size: '32B' }
                    }
                }
            }
        },
        'experience': {
            type: 'dir',
            content: {
                'pars_pack': { 
                    type: 'file', 
                    content: 'Pars Pack - System Administrator & Software Developer\nCurrent Position\n\n• Managing and maintaining server infrastructure\n• Developing automation tools and scripts\n• Implementing scalable backend solutions\n• Supporting development workflows\n• System optimization and troubleshooting', 
                    size: '200B' 
                },
                'projects': {
                    type: 'dir',
                    content: {
                        'store_management': { type: 'file', content: 'Intelligent Store Management System\nBuilt with modern backend architecture', size: '65B' },
                        'docker_env': { type: 'file', content: 'Containerized Development Environments\nUsing Docker for consistent dev setups', size: '68B' },
                        'automation_tools': { type: 'file', content: 'Various system automation tools\nPython-based scripts for daily tasks', size: '60B' }
                    }
                }
            }
        },
        'interests': {
            type: 'dir',
            content: {
                'algorithms': { type: 'file', content: 'Algorithm Design & Analysis\nCompetitive programming enthusiast', size: '30B' },
                'operating_systems': { type: 'file', content: 'Operating Systems Architecture\nSystem-level programming', size: '28B' },
                'artificial_intelligence': { type: 'file', content: 'AI & Machine Learning\nExploring intelligent systems', size: '25B' },
                'competitive_programming': { type: 'file', content: 'National Coding Competitions\nProblem solving & optimization', size: '32B' }
            }
        },
        'README.md': { 
            type: 'file', 
            content: `# Welcome to Matin Abbasi's Terminal Portfolio

## Quick Start
Type 'help' to see available commands
Type 'neofetch' to see system info
Type 'tree' to explore the directory structure

## Navigation
cd [directory]  - Navigate to a directory
ls              - List directory contents
cat [file]      - Read file contents
pwd             - Show current directory

## About Me
I'm a System Administrator and Software Developer passionate about
building robust, scalable solutions. Currently working at Pars Pack
and studying Computer Engineering at Azad University.

Visit my blog: https://blog.m4t1n.ir
GitHub: @matinabbasi788

Happy exploring! 🚀`, 
            size: '650B' 
        },
        'startup.sh': { 
            type: 'file', 
            isExec: true, 
            content: '#!/bin/bash\necho "Loading Matin Abbasi personal environment..."\necho "System Administrator | Software Developer | Isfahan, Iran"\necho "Ready! Type help for available commands."', 
            size: '150B' 
        }
    }
};

// Manual Pages
const manPages = {
    'ls': 'ls - list directory contents. Options: -l (long format), -a (all files).',
    'cd': 'cd [dir] - change the current working directory.',
    'cat': 'cat [file] - concatenate files and print on the standard output.',
    'echo': 'echo [text] - display a line of text.',
    'help': 'help - display information about available commands.',
    'pwd': 'pwd - print name of current/working directory.',
    'clear': 'clear - clear the terminal screen.',
    'whoami': 'whoami - print effective userid.',
    'date': 'date - print or set the system date and time.',
    'tree': 'tree - list contents of directories in a tree-like format.',
    'sudo': 'sudo - execute a command as another user, usually the superuser.',
    'neofetch': 'neofetch - a CLI system information tool.',
    'theme': 'theme [name] - change terminal appearance. Themes: ubuntu, dracula, classic.',
    'uname': 'uname - print system information. Option: -a (all information).',
    'man': 'man [command] - format and display the on-line manual pages.',
    'crt': 'crt [on|off] - toggles the CRT scanline effect.',
    'about': 'about - display detailed information about Matin Abbasi.',
    'skills': 'skills - show technical skills and expertise levels.',
    'contact': 'contact - display contact information.',
    'banner': 'banner - show welcome banner.'
};

// Configuration
const BOOT_TIME = "Feb 26 11:30";
const SKIP_BOOT = false;
