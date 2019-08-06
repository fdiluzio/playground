<?php
/**
 * Created by PhpStorm.
 * User: diluziof
 * Date: 28.06.18
 * Time: 16:04
 */

?>
<div class="abstand-top abstand-bottom">


    <div class="constrainer--inner layout-padding-sides--full">

        <!-- Bellows Group -->
        <section class="bellows layout-page-column--body" data-bellow-group="groupID">

            <!-- Bellows Element -->
            <div class="bellows-element-wrp">

                <?php $triggerID = rand(); ?>

                <div class="bellows-tab" data-bellow-tab="<?= $triggerID ?>" data-bellow-state=>
                    <i class="bellows-sign"></i>
                    <h5 class="font-bold">Ermässigungen</h5>
                </div>

                <div class="bellows-content" data-bellow-content="<?= $triggerID ?>">
                    <div class="content-spacing">
                        <ul>
                            <li>Kinder bis 2 Jahre kostenlos</li>
                            <li>Kinder von 3-7 Jahre €&nbsp;45,- inkl. Kinderhalbpension</li>
                            <li>Kinder von 8-12 Jahre €&nbsp;55,- inkl. Kinderhalbpension</li>
                        </ul>
                    </div>
                </div>

            </div><!-- Bellows Element END -->

            <!-- Bellows Element -->
            <div class="bellows-element-wrp">

                <?php $triggerID = rand(); ?>

                <div class="bellows-tab" data-bellow-tab="<?= $triggerID ?>" data-bellow-state=>
                    <i class="bellows-sign"></i>
                    <h5 class="font-bold">Hotel Sandhof Geheimtipp - Skiverleih Lech</h5>
                </div>

                <div class="bellows-content" data-bellow-content="<?= $triggerID ?>">
                    <div class="content-spacing">
                        "Rent at Sigi" - Romantikhotel Krone<br/>
                        office@sigis-ski.at<br/>
                        Tel: +43 5583 2251523<br/>
                    </div>
                </div>

            </div><!-- Bellows Element END -->

            <!-- Bellows Element -->
            <div class="bellows-element-wrp">

                <?php $triggerID = rand(); ?>

                <div class="bellows-tab" data-bellow-tab="<?= $triggerID ?>" data-bellow-state=>
                    <i class="bellows-sign"></i>
                    <h5 class="font-bold">Neuer Skiverleih - unser Nachbar – SKIBEX</h5>
                </div>

                <div class="bellows-content" data-bellow-content="<?= $triggerID ?>" data-listener="<?= $triggerID ?>">
                    <div class="content-spacing">
                        <ul>
                            <li>Hang Man II (Single Trail)</li>
                            <li>Riders Playground</li>
                            <li>Riders Playground</li>
                            <li>Hot Shots – fired by GoPro (Flow Trail)</li>
                        </ul>
                    </div>
                </div>

            </div><!-- Bellows Element END -->
        </section><!-- Bellows Group END-->

    </div>
</div>

<script>

    (function () {

        var moduleName = 'bellow_module'; // naming convention XXX_module

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

                selt.bellows.apply({
                    groupId: 'groupID',
                    autoClose: true
                });

                // add event to a specific bellows element
                // bellowsopened and bellowsclosed events are sent to the content element
                document.querySelector('[data-listener="<?= $triggerID ?>"]').addEventListener('bellowsopened', function (e) {
                    console.log('module-bellows', e);
                }, {once: true, capture: false})

            }

        };

    }());//EOS


</script>
