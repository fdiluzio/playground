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
    include('include_header.php');
    ?>

</head>
<body>


<?php
include('modules/module-header.php');
?>

<main>

    <?php
    include('layouts/layout-hero-pattern.php');
    ?>

    <?php
    include('layouts/index-teaser.php');
    include('layouts/layout-page.php');
    include('modules/module-gallery.php');
    ?>

    <link rel="stylesheet" href="css/bellows.css">
    <link rel="stylesheet" href="css/responsive-table.css">
    <link rel="stylesheet" href="css/gallery.css">
    <link rel="stylesheet" href="css/gallery-theme.css">

    <?php
    include('modules/module-bellows.php');
    include('modules/module-bellows_price_table.php');
    include('modules/module-table.php');
    ?>

    <?php
    include('layouts/block-quote.php');
    include('layouts/index-offer-teaser.php');
    ?>


</main>

<?php
include('layouts/layout-footer.php');
?>



<?php
include('modules/sticky-bottom.php');
?>


</body>
</html>