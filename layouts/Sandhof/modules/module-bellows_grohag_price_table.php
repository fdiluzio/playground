<?php
/**
 * Created by PhpStorm.
 * User: diluziof
 * Date: 28.06.18
 * Time: 16:04
 */

?>

<link rel="stylesheet" href="css/bellows.css">


<div class="abstand-top abstand-bottom">


    <div class="constrainer--inner layout-padding-sides--full">

        <!-- Bellows Group -->
        <section class="bellows layout-page-column--body" data-bellow-group="price-table">

            <!-- Bellows Element -->
            <?php $bellowID = rand(); ?>

            <div class="bellows-element-wrp">

                <div class="bellows-tab" data-bellow-tab="<?= $bellowID ?>" data-bellow-state=>
                    <i class="bellows-sign"></i>
                    <h5 class="font-bold">Doppelzimmer Preise</h5>
                </div>

                <div class="bellows-content" data-bellow-content="<?= $bellowID ?>" data-listener="<?= $bellowID ?>">
                    <div class="content-spacing">
                        <!-- Create a module name here so we can call easily call it from here -->

                        <?php $mount1 = $mountModuleName = 'pkw'; ?>
                        <?php include('modules/module-table_grohag.php') ?>

                    </div>
                </div>

            </div><!-- Bellows Element END -->


        </section><!-- Bellows Group END-->

    </div>
</div>

<script>

    (function () {

        var moduleName = 'bellow_price_table_module'; // naming convention XXX_module

        if (typeof selt === 'undefined') {
            selt = {
                modules: {}
            };
        } else if (!selt.modules) {
            selt.modules = {};
        }

        selt.modules[moduleName] = {

            name: moduleName,
            require: ['javascript/base/anime.min.js', 'javascript/project/selt-bellows.js'],

            init: function () {

                //
                selt.bellows.apply({
                    groupId: 'price-table',
                    autoClose: true
                });

                // add event to a specific bellows element
                // bellowsopened and bellowsclosed events are sent to the content element
                document.querySelector('[data-listener="<?= $bellowID ?>"]').addEventListener('bellowsopened', function (e) {
                    selt.modules.mount('<?=$mount1?>');
                }, {once: true, capture: false})

            }

        };

    }());//EOS


</script>
