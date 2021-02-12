(function (window) {


    const templateHtml = document.getElementById("template-file-item").innerHTML;
    const fileDisplayList = document.getElementById("ifs-uploader-filelist");
    const upLoadSubmitBtn = document.getElementById('ifs-uploader-submit');
    const maxFileSize = 1048576 * 1; // 10 MB (1MB = 1048576)
    const FileUploaderServlet = '/iFinder5/FileUploaderServlet';
    const fileUploadInput = document.getElementById('ifs-uploader');

    function enablepLoad() {
        upLoadSubmitBtn.style.display = "inline";
    };

    function disablepLoad() {
        upLoadSubmitBtn.style.display = "none";
    };

    function isFileSizeValid(bytes) {
        return !!(bytes <= maxFileSize);
    }

    function formNotValidError(message){
        document.forms['ifs-upload-files'].reset();
        fileDisplayList.innerHTML =  message;
    }


    document.getElementById('ifs-uploader-submit').addEventListener('click', function () {
        uploadFiles();
    }, false);

    document.getElementById('ifs-uploader').addEventListener('change', function () {
        disablepLoad();
        let FileListHTML = "";
        let fileCount = this.files.length;

        if (fileCount > 10) {
            const overDrawn = fileCount - 10;
            formNotValidError(`Only 10 files may be submited as once. You've selected ${overDrawn} too many.`);
            return;
        }

        for (let i = 0; i < this.files.length; i++) {

            let file = this.files[i];

            var dO = {
                name: file.name,
                bytes: file.size,
                size: bytesToSize(file.size),
                type: file.type,
                lastmodifiedDate: (new Date(file.lastModified)).toLocaleString()
            };

            if (isFileSizeValid(dO.bytes)) {
                FileListHTML += templateHtml.replace(/{{name}}/g, dO.name)
                    .replace(/{{size}}/g, dO.size)
                    .replace(/{{type}}/g, dO.type)
                    .replace(/{{lastmodifiedDate}}/g, dO.lastmodifiedDate);

                fileDisplayList.innerHTML = FileListHTML;
                enablepLoad();
            } else {
                formNotValidError(`Please try again. File ${dO.name} is greater than 10 MB (${dO.size}).`);
                return;
            }

        }

        

        

    }, false);

    function uploadFiles() {

        var files = fileUploadInput.files;
       
        var results = "";
        var progress = String.fromCharCode(9675);
        var sumReadyState = 0;
        var processedFiles = 0;
        var timeOutMs = 2000;
        let statusMessage = "&#x26A0;";

        for (file of files) {

            let xhr = new XMLHttpRequest();
            let currentFile = file.name;
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {

                    if (xhr.status = 200) statusMessage = "&check;";
                   

                    document.getElementById("ifs-uploader-filelist").innerHTML += currentFile + " " + statusMessage + "<br>\n";
                    ++processedFiles;
                    if (processedFiles >= files.length) {
                        document.getElementById("ifs-uploader-filelist").innerHTML += "<p>" + files.length + " Dateien verarbeitet. Versuchen Sie eine Suche nach * in einem Such-Tab, um ihre Dokumente zu finden, oder laden Sie weitere Dokumente hoch.</p>";
                        //document.getElementById('ifs-uploader-submit').setAttribute('disabled', true);
                        document.getElementById('ifs-uploader-submit').style.display = "none";
                        document.getElementById('ifs-uploader-select').style.display = "inline";
                    }
                }
                sumReadyState += xhr.readyState;
            }

            xhr.open("POST", FileUploaderServlet, true);
            xhr.setRequestHeader("File-Name", file.name);
            xhr.setRequestHeader("File-Size", file.size);
            xhr.setRequestHeader("File-Date", file.lastModified);
            xhr.send(file);

        };
    };

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB'];
        if (bytes === 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    }

})(window);