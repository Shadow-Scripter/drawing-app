document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("drawCanvas");
    const ctx = canvas.getContext("2d");
    const colorPicker = document.getElementById("colorPicker");
    const brushSize = document.getElementById("brushSize");
    const clearButton = document.getElementById("clearButton");
    const saveButton = document.getElementById("saveButton");
    const bgColorPicker = document.getElementById("bgColorPicker");
    const applyBgColorButton = document.getElementById("applyBgColorButton");
    const canvasWidthInput = document.getElementById("canvasWidth");
    const canvasHeightInput = document.getElementById("canvasHeight");
    const applySizeButton = document.getElementById("applySizeButton");
    const drawRectButton = document.getElementById("drawRectButton");
    const drawCircleButton = document.getElementById("drawCircleButton");
    const drawLineButton = document.getElementById("drawLineButton");

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveDrawing() {
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement("a");
        link.href = image;
        link.download = "drawing.png";
        link.click();
    }

    function applyBackgroundColor() {
        ctx.fillStyle = bgColorPicker.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function applyCanvasSize() {
        const newWidth = parseInt(canvasWidthInput.value);
        const newHeight = parseInt(canvasHeightInput.value);
        canvas.width = newWidth;
        canvas.height = newHeight;
        clearCanvas();
    }

    function drawRectangle() {
        ctx.fillStyle = colorPicker.value;
        ctx.fillRect(100, 100, 200, 150); // Example coordinates and size
    }

    function drawCircle() {
        ctx.beginPath();
        ctx.fillStyle = colorPicker.value;
        ctx.arc(300, 300, 50, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawLine() {
        ctx.beginPath();
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSize.value;
        ctx.moveTo(50, 50);
        ctx.lineTo(200, 200);
        ctx.stroke();
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
    clearButton.addEventListener("click", clearCanvas);
    saveButton.addEventListener("click", saveDrawing);
    applyBgColorButton.addEventListener("click", applyBackgroundColor);
    applySizeButton.addEventListener("click", applyCanvasSize);
    drawRectButton.addEventListener("click", drawRectangle);
    drawCircleButton.addEventListener("click", drawCircle);
    drawLineButton.addEventListener("click", drawLine);
});
