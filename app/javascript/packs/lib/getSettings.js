import $ from 'jquery';

export default function getSettings() {

    let response;

    $.ajax({
        url: '/settings.json',
        method: 'GET',
        dataType: 'json',
        success: function(data){
            // console.log(data);
            return data;
        }
    });
/*    let xhr = new XMLHttpRequest();
    xhr.open('GET', document.location.href + '/settings.json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            return xhr.responseText;
        }
        else {
            return xhr;
        }
    };
    xhr.send();*/
}


