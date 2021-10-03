
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
                <div>
                    <div id="testCanvas" style="background-color: #000000; width: 500px; height: 500px; margin: auto"></div>
                </div>                
            </div> 
      
        `,
        methods: {
            play() {
                this.player.startAnimation();
            },
            stop() {
                this.player.stopAnimation();
            }
        },
        mounted() {
            const self = this;
            const parser = new SVGA.Parser('#testCanvas')
            const player = new SVGA.Player('#testCanvas')
            parser.load("/blog/json/heartbeat.svga", function (videoItem) {
                // player.setImage('./samples/avatar.png', '99')
                player.setVideoItem(videoItem);
                player.startAnimation();
                self.player = player;
                console.log(player);
                // player.startAnimationWithRange({location: 20, length: 1}, false);
            }, function (error) {
                alert(error.message);
            })

            // const container = document.getElementById('container');
            // const animation = lottie.loadAnimation({
            //     container: container,
            //     renderer: 'svg', // 渲染方式:svg、canvas
            //     loop: true,  //循环播放，默认：false
            //     autoplay: true, //自动播放 ，默认true
            //     path: '/blog/json/77440-graph-diagram-animation.json'  // json 路径
            // });
            // this.animation = animation;
        },

    });
}

document.addEventListener('DOMContentLoaded', () => {
    init();
}, false);
