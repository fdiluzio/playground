<?php
/**
 * Created by PhpStorm.
 * User: diluziof
 * Date: 2019-02-26
 * Time: 12:07
 */

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Layout Entry Point</title>


    <script src="javascript/base/selt_tools.js"></script>
    <script src="javascript/base/selt-module-controller.js"></script>
    <script src="javascript/app.js"></script>

    <link rel="stylesheet" href="css/responsive-table.css">
    <link rel="stylesheet" href="css/gallery.css">
    <link rel="stylesheet" href="css/gallery-theme.css">
    <link rel="stylesheet" href="css/bellows.css">

</head>
<body>


<?php
//include('modules/module-header.php');
?>

<main>

        <?php
        include('modules/module-bellows_grohag_price_table.php');
        ?>


</main>


</body>
</html>