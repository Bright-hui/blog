
// const template =
// `const Header = styled.div\`
// color: palevioletred;
// font-size:18px;
// \`
// render(<Header>{headerProps.text}</Header>)`;

const template =
`const Header = styled.div\`
color: blue;
\`;

render(<Header>Hello World!</Header>)
`


function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    createApp(template, container, {
        noInline: true
    });
}

document.addEventListener('DOMContentLoaded', () => {
    init();
}, false);
