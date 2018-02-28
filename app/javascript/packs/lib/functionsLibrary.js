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

    setTitle(base, title = null) {
        document.title = base + ' | ' + title
    },

    extractAdminActionName() {
        return document.body.className.split(' ').join('_');
    },

    getCSRF() {
        return $('meta[name="csrf-token"]').attr('content');
    },

    getSettings(callback) {
        $.getJSON(window.location.origin + '/settings.json', (data) => {
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
    },

    getTitle(pathname) {

        let titles = {
            '/admin': 'Dashboard',
            '/admin/portfolio': 'Portfolio'
        }

        return titles[pathname];
    }
};

export default functions;