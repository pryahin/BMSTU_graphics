function sobel(img) {
    const canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, img.width, img.height),
        sobel = new Sobel(imgData),
        sobelCanvas = document.getElementById('sobelCanvas');

    sobelCanvas.width = img.width;
    sobelCanvas.height = img.height;
    sobelCanvas.getContext('2d').putImageData(sobel.getResult(), 0, 0);
}

document.getElementById('fileToLoad').addEventListener('change', event => {
    const reader = new FileReader();

    reader.addEventListener('load', event => {
        const img = new Image();

        img.addEventListener('load', () => {
            sobel(img);
        });

        img.src = event.target.result;
    });

    reader.readAsDataURL(event.target.files[0]);
});