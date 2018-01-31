//= require tinymce/tinymce
//= require tinymce/themes/modern/theme.min.js
//= require jquery
//= require cocoon
//= require rails-ujs
//= require turbolinks
//= require_tree .

$(document).ready(function(){
    $('#social_networks')
        .on('cocoon:before-insert', function(e,task_to_be_added) {
            console.log("nouveau truc");
    })
});

tinymce.init({
    selector: '#content',
    branding: false,
    plugins: "code",
    entity_encoding : "raw",
    menu: {
        edit: {
            title: 'Edit',
            items: 'undo redo | cut copy paste pastetext | selectall'
        },
        format: {
            title: 'Format',
            items: 'bold italic underline strikethrough superscript subscript code | removeformat'
        },
    }
});