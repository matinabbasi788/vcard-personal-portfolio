/**
 * Terminal Modal Controls
 * Handles opening, closing, minimizing, and maximizing the terminal modal
 */

// Modal Elements
const terminalModal = document.getElementById('terminalModal');
const terminalFab = document.getElementById('terminalFab');
const terminalClose = document.getElementById('terminalClose');
const terminalMinimize = document.querySelector('.terminal-control.minimize');
const terminalMaximize = document.querySelector('.terminal-control.maximize');
const terminalContainer = document.querySelector('.terminal-container');

let isMaximized = false;
let terminalInitialized = false;

// Open terminal
terminalFab.addEventListener('click', () => {
    terminalModal.classList.add('active');
    if (!terminalInitialized) {
        initTerminal();
        terminalInitialized = true;
    } else {
        const inputElement = document.getElementById('command-input');
        inputElement.focus();
    }
});

// Close terminal
terminalClose.addEventListener('click', () => {
    terminalModal.classList.remove('active');
});

// Minimize terminal
terminalMinimize.addEventListener('click', () => {
    terminalModal.classList.remove('active');
});

// Maximize/Restore terminal
terminalMaximize.addEventListener('click', () => {
    isMaximized = !isMaximized;
    if (isMaximized) {
        terminalContainer.classList.add('maximized');
        terminalMaximize.textContent = '❐';
    } else {
        terminalContainer.classList.remove('maximized');
        terminalMaximize.textContent = '□';
    }
});

// Close on background click
terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) {
        terminalModal.classList.remove('active');
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalModal.classList.contains('active')) {
        terminalModal.classList.remove('active');
    }
});
