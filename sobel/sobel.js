const GX = [
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1],
    GY = [
        -1, -2, -1,
        0, 0, 0,
        1, 2, 1
    ];

class Sobel {
    constructor(image) {
        this._image = image;

        this._start();
    }

    getResult() {
        return this._result;
    }

    _start() {
        const horiz = this._getData(GY),
            vert = this._getData(GX),
            img = document.createElement('canvas').getContext('2d').createImageData(this._image.width, this._image.height);

        for (let i = 0; i < img.data.length; i += 4) {
            img.data[i] = img.data[i + 1] = img.data[i + 2] = Math.sqrt(Math.pow(horiz[i], 2) + Math.pow(vert[i], 2));
            img.data[i + 3] = 255;
        }

        this._result = img;
    }

    _getData(matr) {
        const src = this._image.data,
            width = this._image.width,
            height = this._image.height,
            side = Math.round(Math.sqrt(matr.length)),
            half = Math.floor(side / 2),

            result = new Float32Array(width * height * 4);

        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                const dst = (y * width + x) * 4;

                let r = 0,
                    g = 0,
                    b = 0;

                for (let _y = 0; _y < side; _y++) {
                    for (let _x = 0; _x < side; _x++) {
                        let miny = Math.min(height - 1, Math.max(0, y + _y - half));
                        let minx = Math.min(width - 1, Math.max(0, x + _x - half));

                        let off = (minx + miny * width) * 4;
                        let w = matr[_x + _y * side];

                        r += src[off] * w;
                        g += src[off + 1] * w;
                        b += src[off + 2] * w;
                    }
                }

                result[dst] = r;
                result[dst + 1] = g;
                result[dst + 2] = b;
                result[dst + 3] = 255;
            }
        }

        return result;
    }
}