import html2canvas from "html2canvas";

export default {
    methods: {
        formatSvgThenScreenShot(svgElements, SCREENSHOT_ELEMENT) {
            return new Promise((resolve, reject) => {
                let nodesToRecover = [];
                let nodesToRemove = [];

                // svgElements is a NodeList from querySelectorAll
                svgElements.forEach(function (node) {
                    let parentNode = node.parentNode;

                    let canvas = document.createElement("canvas");

                    // Convert SVG into XML string
                    let xml = new XMLSerializer().serializeToString(node);

                    // Removing the name space as IE throws an error
                    xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, "");

                    // Draw SVG onto canvas using built-in approach
                    let svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
                    let url = URL.createObjectURL(svgBlob);
                    let img = new Image();
                    img.onload = function() {
                        canvas.width = img.width || 100;
                        canvas.height = img.height || 100;
                        canvas.getContext('2d').drawImage(img, 0, 0);
                        URL.revokeObjectURL(url);
                    };
                    img.src = url;

                    nodesToRecover.push({
                        parent: parentNode,
                        child: node
                    });
                    parentNode.removeChild(node);

                    nodesToRemove.push({
                        parent: parentNode,
                        child: canvas
                    });

                    parentNode.appendChild(canvas);
                });

                let reportPDF = html2canvas(SCREENSHOT_ELEMENT, {
                    scale: 1.5,
                    x: 0,
                    y: 0,
                    allowTaint: false,
                    backgroundColor: null,
                    useCORS: true,
                    onclone: function (clonedDoc) {
                        let ele = clonedDoc.getElementById("page-a3");
                    }
                }).then(canvas => {
                    canvas.toBlob(function (blob) {
                        nodesToRemove.forEach(function (pair) {
                            pair.parent.removeChild(pair.child);
                        });

                        nodesToRecover.forEach(function (pair) {
                            pair.parent.appendChild(pair.child);
                        });
                    });
                    return canvas.toDataURL("image/png", 1.0);
                })

                resolve(reportPDF)
            })
        }
    }
}
