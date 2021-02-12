(function (window) {


    const templateHtml = document.getElementById("template-file-item").innerHTML;
    const fileDisplayList = document.getElementById("ifs-uploader-filelist");
    const upLoadSubmitBtn = document.getElementById('ifs-uploader-submit');
    const section = document.querySelector('.ifs-uploader');
    const maxFileSize = 1048576 * 10; // 10 MB (1MB = 1048576)
    const maxNumberOfFiles = 10;
    const FileUploaderServlet = '/iFinder5/FileUploaderServlet';
    const fileUploadInput = document.getElementById('ifs-uploader');

    document.getElementById('ifs-uploader-submit').addEventListener('click', onUploadFiles, false);
    document.getElementById('ifs-uploader').addEventListener('change', onInputChange, false)



    // EVENTS

    function onInputChange() {
        disablepLoad();
        let FileListHTML = "";
        let fileCount = this.files.length;

        if (fileCount > maxNumberOfFiles) {
            const overDrawn = fileCount - maxNumberOfFiles;
            formNotValidError(`Only ${maxNumberOfFiles} files may be submited at once. You've selected ${overDrawn} too many.`);
            return;
        }

        for (let i = 0; i < this.files.length; i++) {

            let file = this.files[i];

            var dO = {
                name: file.name,
                bytes: file.size,
                size: bytesToSize(file.size),
                type: file.type,
                lastmodifiedDate: formatDate(file.lastModified)
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

    }

    function onUploadFiles() {

        disablepLoad();

        const files = fileUploadInput.files;
        //resetForm();

        let processedFiles = 0;
        

        Array.prototype.forEach.call(files, function (file) {

            let xhr = new XMLHttpRequest();
            let currentFile = file.name;
            xhr.onreadystatechange = function () {

                let statusMessageIcon = "&#x26A0;";

                if (xhr.readyState == 4) { // done

                    ++processedFiles;
                    switch (xhr.status) {
                        case 200:
                            statusMessageIcon = "&check;";
                            fileUploaded(currentFile, statusMessageIcon);
                            if (processedFiles >= files.length) {
                                fileUploadComplete(files.length);
                            }
                            break;
                        case 404:
                            formNotValidError(`Unable to upload files: ${xhr.status}`);
                            break;

                    }


                }
            }

            xhr.open("POST", FileUploaderServlet, true);
            xhr.setRequestHeader("File-Name", file.name);
            xhr.setRequestHeader("File-Size", file.size);
            xhr.setRequestHeader("File-Date", file.lastModified);
            xhr.send(file);

        });

    };

    // HELPERS

    function fileUploaded(currentFile, statusMessage) {
        fileDisplayList.innerHTML.innerHTML += currentFile + " " + statusMessage + "<br>\n";
    }

    function fileUploadComplete(nrOfFiles) {
        fileDisplayList.innerHTML += `<p> $(nrOfFiles) were uploaded. Go to the searchbar and type a asterix (*) in the search field to find all your documents. You may also continue by adding further documents.`;
    }

    function enablepLoad() {
        section.classList.add('ifs-files-selected');
        upLoadSubmitBtn.style.display = "inline";
    };

    function disablepLoad() {
        section.classList.remove('ifs-files-selected');
        upLoadSubmitBtn.style.display = "none";
    };

    function isFileSizeValid(bytes) {
        return !!(bytes <= maxFileSize);
    }

    function resetForm() {
        document.forms['ifs-upload-files'].reset();
    }

    function formNotValidError(message) {
        resetForm();
        fileDisplayList.innerHTML = '<span class="ifs-uploader-error">' + message + '</span>';
    }

    function formatDate(millisecs) {
        let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const date = new Date(millisecs);
        return date.toLocaleString('en-US', options);
    }

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB'];
        if (bytes === 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    }

})(window);