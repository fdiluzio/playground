function initApp() {

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Extend Cropper
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Cropper.prototype.getFileName = function (appendix, mimetype) {
        var appendix = appendix ? ('-' + appendix) : '';
        return (/[^\\\/]+(?=\.[\w]+$)|[^\\\/]+$/.exec(this.originalUrl)[0]) + appendix + '.' + mimetype;
    };

    Cropper.prototype.exec = function (appendix, mimetype, callback) {

        cropper.getData(true)

        var formData = new FormData();
        formData.append('crop', JSON.stringify( cropper.getData(true)) );
        formData.append('file', this.originalUrl );
        formData.append('filename', this.getFileName(appendix, mimetype));
        formData.append('mimetype', mimetype);

        var url      = new Request('imgmagik.php');

        fetch(url, {
            method: 'POST',
            // credentials: 'include',
            body: formData
        }).then(function (response) {
            if(response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        }).then(function (response) {

            if ( typeof callback === 'function'){
                callback(response);
            }

        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    };


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    Cropper.setDefaults({
        aspectRatio: 3 / 2,
        viewMode: 2,
        background: false,
        zoomable: false,
        preview: document.getElementById('cropper-preview')
    });

    var cropper = new Cropper('#cropper-img');
    var resultImage = document.getElementById('cropper-result');
    var resultImageContainer = document.getElementById('cropper-result-container');
    var ratioButtons = document.querySelectorAll('[data-action="aspect-ratio"]');

    function actionHandler(e) {

        var target = e.target,
            action = target.dataset.action,
            actionValue, appendix;


        switch (action) {

            case 'save-local':
                appendix = e.target.dataset.appendToFile;
                cropper.saveToDisk(appendix);
                break;
            case 'aspect-ratio':
                actionValue = e.target.dataset.actionValue;
                ratioButtons.forEach(function (el) {
                    el.classList.remove('selected');
                });
                e.target.classList.add('selected');
                cropper.setAspectRatio(parseFloat(actionValue));
                document.querySelectorAll('[data-append-to-file]').forEach(function (el) {
                    el.dataset.appendToFile = e.target.dataset.appendix;
                })
                break;
            case 'save-server':
                target.classList.add('hide');
                resultImageContainer.classList.remove('hide');

                appendix = e.target.dataset.appendToFile;
                cropper.exec(appendix, 'jpg', function (imageURL) {
                    imageURL = '//' + imageURL;
                    resultImage.style.backgroundImage = 'url(' + imageURL + ')';
                    resultImage.setAttribute('href', imageURL);
                    target.classList.remove('hide');
                });
                console.log( 'CROP DATA:', cropper.getData(true));
                break;
        }

    }

    document.querySelectorAll('[data-action]').forEach(function (el) {
        el.addEventListener('click', actionHandler, false);
    });


};


if (document.readyState === "loading") {  // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", initApp);
} else {  // `DOMContentLoaded` has already fired
    initApp();
}