(() => {
    const container = document.getElementById('app');
    container.innerHTML = '无框架原生应用';

    console.log('app1 mounted');

    window.addEventListener('unmount', function () {
        // 卸载应用
        console.log('app1 unmount');
    })
})();