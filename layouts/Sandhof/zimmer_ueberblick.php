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
    <div class="background--grey">
    <?php
    include('layouts/index-offer-teaser.php');
    ?>
    </div>
    <?php
    include('modules/module-table.php');
    include('modules/module-gallery.php');
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