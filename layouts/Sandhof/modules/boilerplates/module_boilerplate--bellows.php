<?php
/**
 * Created by PhpStorm.
 * User: diluziof
 * Date: 28.06.18
 * Time: 16:04
 */

?>

<link rel="stylesheet" href="css/bellows.css">

<h2>Bellow Module Boilerplate</h2>

<!-- Bellows Group -->
<section class="bellows" data-bellow-group="GROUPNAME">

    <!-- Bellows Element -->
    <?php $bellowID = rand(); ?>

    <div class="bellows-element-wrp">

        <div class="bellows-tab" data-bellow-tab="<?= $bellowID ?>" data-bellow-state=>
            <i class="bellows-sign"></i>
            <h5 class="font-bold">Tab Title</h5>
        </div>

        <div class="bellows-content" data-bellow-content="<?= $bellowID ?>" data-listener="<?= $bellowID ?>">
            <div class="content-spacing">
                ###########################<br/>
                TAB CONTENT<br/>
                ###########################
            </div>
        </div>

    </div><!-- Bellows Element END -->


</section><!-- Bellows Group END-->


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
            require: ['javascript/project/selt-bellows.js'],

            init: function () {

                // Group name connects all bellows elements to control closing all in group to only
                // show one opened content per group
                selt.bellows.apply({
                    groupId: 'GROUPNAME',
                    autoClose: true
                });

                // add event to a specific bellows element
                // bellowsopened and bellowsclosed events are sent to the content element
                document.querySelector('[data-listener="<?= $bellowID ?>"]').addEventListener('bellowsopened', function (e) {
                    console.log('EVENT ONLY ONCE: ', e.type);
                }, {once: true, capture: false});

            }

        };

    }());//EOS


</script>
