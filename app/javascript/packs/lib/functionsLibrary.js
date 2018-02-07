import $ from "jquery";

const functions = {
    truncate(string, nbchar) {
        if (string.length > nbchar)
            return string.substring(0,nbchar)+'...';
        else return string;
    },

    toRealDate(value) {
        let date = new Date(value);
        return date.getDate() + ' / ' + (date.getMonth()+1) + ' / ' + date.getFullYear();
    },

    loader(url, callback) {
        $.getJSON(url, (data) => {
            let response = data;
            callback(response);
        });
    },

    extractActionName() {
        return document.body.className.split(' ').pop();
    },

    getCSRF() {
        return $('meta[name="csrf-token"]').attr('content');
    }
};

export default functions;