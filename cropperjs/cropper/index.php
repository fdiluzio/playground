<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Standalone Cropper</title>

    <?php
    if (strpos($_SERVER['HTTP_HOST'], 'local') !== false) : ?>
        <script src="javascript/cropper.js"></script>
        <script src="javascript/app.js"></script>

        <link href="css/app.css" rel="stylesheet">
        <link href="css/cropper.css" rel="stylesheet">

    <?php else: ?>
        <script src="js/app.min.js"></script>
        <link href="css/app.min.css" rel="stylesheet">
    <?php endif; ?>


</head>
<body>

<div class="cropper-workspace">

    <section class="controlpanel">

        <article class="cropper-preview-field">
            <header><h4>Preview</h4></header>
            <figure class="cropper-preview-area shadow">
                <div id="cropper-preview" class="cropper-preview cropper-preview--hasselblad"></div>
            </figure>
        </article>

        <article id="cropper-result-container" class="cropper-preview-field cropper-result-containe hide">
            <header>
                <h4>Cropped Image</h4>
                <small>(click to open in browser)</small>
            </header>
            <figure class="cropper-preview-area shadow">
                <a id="cropper-result" class="cropper-result" target="_blank" href="#"></a>
            </figure>
        </article>

    </section>

    <div class="row cropper-controls-field">
        <span>Crop</span>
        <button class="button shadow selected" data-action="aspect-ratio" data-action-value="1.5" data-appendix="">Standard</button>
        <button class="button shadow" data-action="aspect-ratio" data-action-value="1" data-appendix="square">Square</button>
        <button class="button shadow" data-action="aspect-ratio" data-action-value="1.7777777778" data-appendix="wide">Landscape</button>
        <button class="button shadow" data-action="aspect-ratio" data-action-value="0.5625" data-appendix="portrait">Portrait</button>
        <button class="button shadow hightlite" data-action="save-server" data-append-to-file>Create Image</button>
    </div>

    <div class="cropper-area shadow">
        <img id="cropper-img" class="cropper-img" src="images/julian_drums.jpg">
    </div>

</div>


</body>
</html>