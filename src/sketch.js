import { PAPERSIZE, targetHeight } from "./config";
import { computeArtworkBoundingBox, convertInchesToPixels, saveCanvasToFile } from "./helpers";
import project from './../package.json';



const urlParams = new URLSearchParams(window.location.search);
const SAVE_CANVAS = urlParams.has('saveCanvas') && urlParams.get('saveCanvas') === 'true'



window.setup = () => {
    const ratio = PAPERSIZE.width / PAPERSIZE.height;
    if (SAVE_CANVAS) createCanvas(targetHeight * ratio, targetHeight, SVG);
    else createCanvas(targetHeight * ratio, targetHeight);
}

window.draw = () => {
    background(240);


    const bounds = computeArtworkBoundingBox();

    rect(bounds.x, bounds.y, bounds.w, bounds.h);

    for (let i = 0; i < 10; i++) {
        fill(random(255), random(255), random(255));
        const radius = convertInchesToPixels(.5);
        circle(random(bounds.x, bounds.w), random(bounds.y, bounds.h), radius);
    }

    // Start doing cool stuff here 8^)

    noLoop();
    if (SAVE_CANVAS) {
        saveCanvasToFile(`${project.name}`, false, "svg");
    }
}



