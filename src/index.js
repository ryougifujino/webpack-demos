document.body.appendChild((() => {
    let element = document.createElement('div');

    const [hello, webpack] = ['Hello', 'webpack'];
    element.innerHTML = [hello].concat([webpack]).join(' ');

    Object.assign({}, {});
    return element;
})());
