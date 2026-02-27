import { getDataUri } from '~/common/utils.js'
import { MAP_BASE_URL } from '~/endpoints.js'

/**
 * imageData 	string | HTMLImageElement | HTMLCanvasElement | Uint8Array 	

imageData as base64 encoded DataUrl or Image-HTMLElement or Canvas-HTMLElement
format 	string 	

format of file if filetype-recognition fails or in case of a Canvas-Element needs to be specified (default for Canvas is JPEG), e.g. 'JPEG', 'PNG', 'WEBP'
x 	number 	x Coordinate (in units declared at inception of PDF document) against left edge of the page
y 	number 	y Coordinate (in units declared at inception of PDF document) against upper edge of the page
width 	number 	width of the image (in units declared at inception of PDF document)
height 	number 	height of the Image (in units declared at inception of PDF document)
alias 	string 	alias of the image (if used multiple times)
compression 	string 	compression of the generated JPEG, can have the values 'NONE', 'FAST', 'MEDIUM' and 'SLOW'
rotation 	number
 */


export default {
    methods: {
        pdfMapDownload({ downloadURL , docName = null }) {
            var request = new XMLHttpRequest();
            request.open("GET", `${MAP_BASE_URL}/${downloadURL}`, true); 
            request.responseType = "blob";
            request.onload = function (e) {
                if (this.status === 200) {
                    // `blob` response
                    console.log(this.response);
                    // create `objectURL` of `this.response` : `.pdf` as `Blob`
                    var file = window.URL.createObjectURL(this.response);
                    var a = document.createElement("a");
                    a.href = file;
                    a.download = docName || "geoperu.pdf";
                    document.body.appendChild(a);
                    a.click();
                    // remove `a` following `Save As` dialog, 
                    // `window` regains `focus`
                    window.onfocus = function () {                     
                        document.body.removeChild(a)
                    }
                };
            };
            request.send();
        },
        imageToPdf(imgDataUri, page = "a3", margin = "0.5", orientation='l') {
            if (process.browser) {
                const jsPDF = require("jspdf")
                
                let options = {
                    page: page,
                    margin: margin,
                    orientation: orientation
                }                
                let pdf = new jsPDF(options.orientation, "cm", options.page, true)

                pdf.addImage(
                    imgDataUri,
                    'PNG',
                    parseFloat(options.margin),
                    parseFloat(options.margin),
                    pdf.internal.pageSize.getWidth() - parseFloat(options.margin * 2),
                    pdf.internal.pageSize.getHeight() - parseFloat(options.margin * 2),
                    '',
                    'FAST'
                )
                
                return pdf//.save(`${outputName}.pdf`)
            }
        }
    }
}