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
    include('layouts/layout-page.php');
    include('layouts/layout-text-teaser.php');
    include('layouts/layout-page-h2.php');
    include('layouts/layout-page-image.php');
    include('layouts/block-quote.php');
    include('modules/module-gallery.php');
    ?>

    <div class="background--grey background--padded">
    <?php
    include('layouts/layout-page-h2.php');
    include('layouts/index-offer-teaser.php');
    ?>
    </div>


</main>

<?php
include('layouts/layout-footer.php');
?>



<?php
include('modules/sticky-bottom.php');
?>


</body>
</html>