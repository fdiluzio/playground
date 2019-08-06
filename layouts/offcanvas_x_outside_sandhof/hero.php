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

<main>


    <?php
    include('modules/module-header.php');
    ?>

    <div>
        <?php
        include('layouts/layout-hero-pattern.php');
        include('layouts/layout-hero.php');
        include('layouts/layout-hero-pattern-reverse.php');
        ?>
    </div>


</main>


</body>
</html>