function component() {
    let element = document.createElement('div');
    let btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    element.appendChild(btn);

    btn.onclick = async () => {
        const {default: print} = await import(/* webpackChunkName: "print" */ './print.js');
        print();
    };
    return element;
}

document.body.appendChild(component());
