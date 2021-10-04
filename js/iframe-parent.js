(() => {

    function onMessage(e) {
        var data = e.data;
        if (data && data.type === 'embed-size') {
            const height = data.height || 200;
            const id = data.iframeId;
            const iframe = findIframeBySrc(id);
            if(iframe) {
                iframe.style.height = height + 'px';
            }
        }
    }

    window.addEventListener('message', onMessage);


    /************** PRIVATE VARS AND FUNCTIONS **************/

    function findIframeBySrc(src) {
        var bestMatchingIframe = null;

        document.querySelectorAll('iframe').forEach(function (iframe) {
            var iframeSrc = iframe.dataset.iframeAutoHeightCurrentSrc || iframe.src;
            if (iframeSrc) {
                iframeSrc = absolutizeUrl(iframeSrc);
                // if (iframeSrc === src) {
                if ( iframeSrc.indexOf(src) > 0 ) {
                    bestMatchingIframe = iframe;

                    return false; //break loop
                }
            }
        });

        return bestMatchingIframe;
    }

    function findIframeById(iframeId) {
        var bestMatchingIframe = null;

        document.querySelectorAll('iframe').forEach(function (iframe) {
            if (!bestMatchingIframe && iframe.dataset.setIframeHeightId === iframeId) {
                bestMatchingIframe = iframe;
            }
        });

        return bestMatchingIframe;
    }

    function absolutizeUrl(url) {
        if (url.indexOf('/') === 0) {
            url = getHostForUrl(document.location.href) + url;
        }

        return url;
    }

    function getHostForUrl(url) {
        var matches = url.match(/https?:\/\/.[^/]+/) || [];
        return matches[0];
    }

    function normalizeUrl(url) {
        return url.replace(/^https?:\/\//, '//');
    }

    function onSetIframeHeight(e) {
        var data = e.detail;
        var iframe;

        iframe = findIframeById(data.iframeId);

        if (!iframe) {
            iframe = findIframeBySrc(data.iframeSrc);
        }

    }


})();