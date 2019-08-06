<?php
/**
 * Created by PhpStorm.
 * User: diluziof
 * Date: 2019-02-13
 * Time: 11:56
 */


function cropImage($imagePath, $startX, $startY, $width, $height, $mimeType = 'jpg')
{
    $image = new Imagick(realpath($imagePath));
    $image->cropImage($width, $height, $startX, $startY);
    $image->setImageFormat($mimeType);
    return $image;
}

if (isset($_REQUEST['crop'])) {

    $cropData = json_decode($_REQUEST['crop']);

    $x = $cropData->x;
    $y = $cropData->y;
    $w = $cropData->width;
    $h = $cropData->height;
    $scaleX = $cropData->scaleX;
    $scaleY = $cropData->scaleY;
    $rotate = $cropData->rotate;



    $croppedImage = cropImage($_REQUEST['file'], $x, $y, $w, $h, $_REQUEST['mimetype']);

    // file name
    $croppedImageFileName = 'crops/' . $_REQUEST['filename'];

    // build url to image
    $path_parts = pathinfo($_SERVER['REQUEST_URI']);
    echo $_SERVER['HTTP_HOST'] . $path_parts['dirname'] . '/' . $croppedImageFileName;


    $croppedImage->writeImage($croppedImageFileName);


} else {
    echo 'error';
}
