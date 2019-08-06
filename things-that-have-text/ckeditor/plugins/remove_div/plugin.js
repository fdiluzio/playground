
CKEDITOR.plugins.add('remove_div',
    {

        init: function (editor) {

            editor.addCommand( 'removeDiv', {

                exec: function( editor ) {

                    var selectedHTML, selection, range;

                    selectedHTML = editor.getSelectedHtml().getHtml();
                    selectedHTML = selectedHTML.replace(/<(div|\/div)[^>]{0,}>/g, '');

                    selection = editor.getSelection();

                    range = selection.getRanges()[0];
                    range.deleteContents();
                    range.select();


                    editor.insertHtml(selectedHTML);
                }
            });

            editor.ui.addButton( 'rmdiv', {
                label: 'Remove DIV',
                command: 'removeDiv',
                toolbar: 'document',
                icon: CKEDITOR.plugins.getPath('remove_div') + 'icons/remove_div.png'
            });

        }
    });

