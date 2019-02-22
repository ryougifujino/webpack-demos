// function getComponent() {
//     return import(/* webpackChunkName: "lodash-alias" */ "lodash")
//         .then(function ({default: _}) {
//             let element = document.createElement('div');
//             element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//             return element;
//         })
//         .catch(() => "An error occurred while loading the component!");
// }

async function getComponent() {
    let element = document.createElement('div');
    const {default: _} = await import(/* webpackChunkName: "lodash-alias" */ "lodash");
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
}

getComponent().then(component => document.body.appendChild(component));
