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

    <?php
//    include('include_header.php');
    ?>

    <script src="javascript/base/selt_tools.js"></script>
    <script src="javascript/base/selt-module-controller.js"></script>
    <script src="javascript/app.js"></script>

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