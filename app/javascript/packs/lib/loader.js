import React from 'react';
import $ from 'jquery';

export default function loader(url, callback) {

    let response;

    $.getJSON(url, (data) => {
        response = data;
        callback(response);
    });
}