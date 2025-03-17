import { sendImageToServer } from './api';

/**
 * Initializes the HandToTex editor plugin.
 * @param {string} elementId - The ID of the editor element.
 */
export function init(elementId) {
    const editor = document.getElementById(elementId);
    if (!editor) {
        M.util.jslog('Editor not found:', elementId);
        return;
    }

    const handToTexButton = document.createElement('button');
    handToTexButton.textContent = 'Draw Equation';
    handToTexButton.type = 'button';
    handToTexButton.classList.add('atto_handtotex_button');
    handToTexButton.onclick = () => openDrawingBoard(editor);

    editor.parentElement.appendChild(handToTexButton);
}

/**
 * Handles the drawing area for LaTeX generation.
 * @param {HTMLElement} editor - The editor container element.
 */
function openDrawingBoard(editor) {
    const drawingBoard = document.createElement('div');
    drawingBoard.classList.add('handtotex-drawing-board');
    document.body.appendChild(drawingBoard);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    drawingBoard.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let drawing = false;
    canvas.addEventListener('mousedown', () => (drawing = true));
    canvas.addEventListener('mouseup', () => (drawing = false));
    canvas.addEventListener('mousemove', (e) => {
        if (!drawing){ return; }
        const rect = canvas.getBoundingClientRect();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 2, 0, 2 * Math.PI);
        ctx.fill();
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Convert to LaTeX';
    submitButton.onclick = async () => {
        const imageData = canvas.toDataURL('image/png');
        const latexCode = await sendImageToServer(imageData);
        if (latexCode) {
            editor.value += `
${latexCode}
`;
        } else {
            alert('Failed to convert image to LaTeX.');
        }
        document.body.removeChild(drawingBoard);
    };
    drawingBoard.appendChild(submitButton);
}
