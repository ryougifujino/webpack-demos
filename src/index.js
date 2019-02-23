import {file, parse} from './globals.js';

function component() {
    let element = document.createElement('div');
    element.innerHTML = join(['Hello', 'webpack'], ' ');
    return element;
}

document.body.appendChild(component());

console.log(file);
parse();