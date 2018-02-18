import $ from "jquery";
import moment from 'moment'

const functions = {
    truncate(string, nbchar) {
        if (string.length > nbchar)
            return string.substring(0,nbchar).replace(/<(?:.|\n)*?>/gm, '') + '...';
        else return string.replace(/<(?:.|\n)*?>/gm, '');
    },

    toRealDate(value, hms = false) {
        let date = moment(value);
        if(!hms) {
            return date.format('DD / MM / YYYY');
        } else {
            return date.format('DD / MM / YYYY - HH:mm:ss');
        }
    },

    loader(url, callback) {
        $.getJSON(url, (data) => {
            callback(data);
        });
    },

    extractActionName() {
        return document.body.className.split(' ').pop();
    },

    extractAdminActionName() {
        return document.body.className.split(' ').join('_');
    },

    getCSRF() {
        return $('meta[name="csrf-token"]').attr('content');
    },

    getSettings(callback) {
        $.getJSON(window.location.origin + '/settings.json', (data) => {
            /*settings.notice = $("div[title='solomess-notice']").text();
            settings.alert = $("div[title='solomess-alert']").text();*/
            callback(data);
        });
    },

    capitalize(string) {
        if (string !== undefined && string !== null) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },

    basename(string) {
        return string.split(/[\\/]/).pop();
    }
};

export default functions;