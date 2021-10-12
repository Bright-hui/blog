(() => {
    if (!window.parent || parent === self) {
        return;
    }

    var iframeId = parseInt(Math.random() * 99999999);

    try {
        iframeId = (self.frameElement && self.frameElement.getAttribute('src')) || iframeId;
    } catch (e) {}

    function postCurrentHeight() {
        postHeight(getDocumentHeight());
    }

    function getDocumentHeight() {
        var D = document;

        var matches = navigator.userAgent.match(/MSIE (\d)/);
        if (matches && parseInt(matches[1], 10) <=10) {

            return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight);
        }

        return Math.min(
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(
                Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
                Math.max(D.body.clientHeight, D.documentElement.clientHeight)
            )
        );
    }

    function postHeight(height) {
        if (parent.postMessage) {
            parent.postMessage('setIframeHeight::{ "iframeSrc": "'+document.location.href+'", "iframeId": "'+iframeId+'", "iframeReferrer": "'+document.referrer+'", "height":'+height+' }', '*');

            // amp-iframe resize request (https://github.com/ampproject/amphtml/blob/master/extensions/amp-iframe/amp-iframe.md#-amp-iframe)
            parent.postMessage({
                sentinel: 'amp',
                type: 'embed-size',
                height: height,
                iframeId,
            }, '*');
        }
    }

    window.postCurrentHeight = postCurrentHeight;

    function debounce(fn, delay){
        let timer = null //借助闭包
        return function() {
            if(timer){
                clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
                timer = setTimeout(fn,delay)
            }else{
                timer = setTimeout(fn,delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
            }
        }
    }

    const resizeDebounced = debounce(() => {
        postCurrentHeight();
    }, 500);
    window.addEventListener('resize', resizeDebounced , false);


    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            postCurrentHeight();
        }, 0);

        const observer = new ResizeObserver(() => {
            postCurrentHeight();
        });
        observer.observe(document.body);
    }, false);
})();
