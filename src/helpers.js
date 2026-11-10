import { PAPERSIZE, targetHeight } from "./config";

export const computeArtworkBoundingBox = () => {
    const artworkHeight = PAPERSIZE.height - PAPERSIZE.margin;
    return {
        x: convertInchesToPixels(PAPERSIZE.margin),
        y: convertInchesToPixels(PAPERSIZE.margin),
        w: convertInchesToPixels(PAPERSIZE.width - PAPERSIZE.margin - PAPERSIZE.margin),
        h: convertInchesToPixels(PAPERSIZE.height - PAPERSIZE.margin * 2),
    };
};

export const convertInchesToPixels = (inches) => (targetHeight / PAPERSIZE.height) * inches;

export function withInkColor(poly, ink) {
    poly[0].ink = ink;
    return poly;
}

export function drawPoly(poly) {
    if (poly[0].ink) stroke(poly[0].ink);
    beginShape();
    poly.forEach((p) => vertex(p.x, p.y));
    endShape();
}

export function saveCanvasToFile(filename = 'generative-sketch', refresh = true, type = 'png') {
    const btn = document.createElement('a');
    document.body.appendChild(btn);

    if (type === 'png') {
        const canvas = document.querySelector('#defaultCanvas0');

        btn.setAttribute('download', `${filename}.png`);
        btn.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        btn.click();
    }
    else if (type === 'svg') {
        let svg = document.querySelector('svg');
        let svgData = new XMLSerializer().serializeToString(svg);
        let svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        btn.setAttribute('href', URL.createObjectURL(svgBlob));
        btn.setAttribute('download', `${filename}.svg`);
        btn.click();
    }

    if (refresh) {
        setTimeout(() => {
            location.reload();
        }, 100);
    }
    else {
        setTimeout(() => btn.remove(), 50);
    }
}

export function linesIntersect(a, b, c, d, p, q, r, s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
};