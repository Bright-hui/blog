console.log(lottie);

setTimeout(() => {
    const container = document.createElement('div');
    // container.innerText = 'loading...';
    document.body.appendChild(container);

    const animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg', // 渲染方式:svg、canvas
        loop: true,  //循环播放，默认：false
        autoplay: true, //自动播放 ，默认true
        path: '/blog/json/77440-graph-diagram-animation.json'  // json 路径
    });

}, 3000);
