import html2canvas from "html2canvas";

export default {
    methods: {
        formatSvgThenScreenShot(SVG_ELEM, SCREENSHOT_ELEMENT) {
            if (process.browser) {
                var canvg = require("canvg");
            }
            return new Promise((resolve, reject) => {
                let nodesToRecover = [];
                let nodesToRemove = [];

                let svgElem = SVG_ELEM

                svgElem.each(function (index, node) {
                    let parentNode = node.parentNode;
                    let svg = parentNode.innerHTML;

                    let canvas = document.createElement("canvas");

                    //convert SVG into a XML string
                    let xml = new XMLSerializer().serializeToString(this);

                    // Removing the name space as IE throws an error
                    xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, "");

                    //draw the SVG onto a canvas
                    //canvg(canvas, xml);

                    canvg(canvas, xml, { ignoreMouse: true, ignoreAnimation: true });

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
                    x: 0, // this are our custom x y properties
                    y: 0,
                    allowTaint: false,
                    backgroundColor: null,
                    useCORS: true,
                    onclone: function (clonedDoc) {
                        let ele = clonedDoc.getElementById("page-a3");
                        //$(ele).css("transform", "scale(1)");
                        //ele.style.transform = "scale(1)";
                    }
                }).then(canvas => {
                    let ctx = canvas.getContext("2d");

                    canvas.toBlob(function (blob) {
                        nodesToRemove.forEach(function (pair) {
                            pair.parent.removeChild(pair.child);
                        });

                        nodesToRecover.forEach(function (pair) {
                            pair.parent.appendChild(pair.child);
                        });
                        //saveAs(blob, 'screenshot_'+ moment().format('YYYYMMDD_HHmmss')+'.png');
                    });
                    return canvas.toDataURL("image/png", 1.0);
                })
                
                resolve(reportPDF)
            })
        }
    }
}