import { getDataUri } from '~/common/utils.js'
import { jsPDF } from 'jspdf'

export default {
    methods: {
        pdfMapDownload(mapLocationData, docName = null) {
            const downloadURL = mapLocationData?.downloadURL || mapLocationData
            const config = useRuntimeConfig()
            const mapBaseUrl = config.public.mapBaseUrl

            return new Promise((resolve, reject) => {
                var request = new XMLHttpRequest();
                request.open("GET", `${mapBaseUrl}/${downloadURL}`, true);
                request.responseType = "blob";
                request.onload = function (e) {
                    if (this.status === 200) {
                        var file = window.URL.createObjectURL(this.response);
                        var a = document.createElement("a");
                        a.href = file;
                        a.download = docName || "geoperu.pdf";
                        document.body.appendChild(a);
                        a.click();
                        window.onfocus = function () {
                            document.body.removeChild(a)
                        }
                        resolve()
                    }
                };
                request.send();
            })
        },
        imageToPdf(imgDataUri, page = "a3", margin = "0.5", orientation='l') {
            if (import.meta.client) {
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

                return pdf
            }
        }
    }
}
