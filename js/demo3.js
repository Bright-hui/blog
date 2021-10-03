
const template =
`() => { 
    const [name, setName] = useState('huihui');
    return (
        <div>
            HelloWorld, {name}
        </div>
    );
}`;

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    createApp(template, container);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
}, false);
