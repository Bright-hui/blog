
function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const app = new Vue({
        el: container,
        template: `
            
            <div style="border: 1px solid #80808029">
                <div style="text-align: center;margin-top: 20px;margin-bottom: 20px;">
                    <button @click="play">play</button>
                    <button @click="stop">stop</button>
                </div>
                <div id="container" ></div>
                
            </div> 
      
        `,
        methods: {
            play() {
                this.animation.play();
            },
            stop() {
                this.animation.stop();
            }
        },
        mounted() {
            const container = document.getElementById('container');
            const animation = lottie.loadAnimation({
                container: container,
                renderer: 'svg', // 渲染方式:svg、canvas
                loop: true,  //循环播放，默认：false
                autoplay: true, //自动播放 ，默认true
                path: '/blog/json/77440-graph-diagram-animation.json'  // json 路径
            });
            this.animation = animation;
        },

    });
}

document.addEventListener('DOMContentLoaded', () => {
    init();
}, false);
