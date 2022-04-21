import { proxy } from '../config';
import * as documentView from '../views/documentView';
import "jquery";
import { refreshToken } from '../views/base';
import * as xssFilters from "../xssFilters";

export default class Search {
    constructor() {
        this.result = {};
    }

    getData(callback, url) {
        $.ajax({
            'url': proxy + url,
            'type': 'GET',
            'content-Type': 'application/json',
            'dataType': 'json',
            'headers': {
                'Authorization': 'bearer ' + sessionStorage.access_token
            },
            'success': function(result) {
                documentView.fillDocuments(result);
                callback(result);
            },
            'error': function(xhr, textStatus, errorThrown) {
                if (xhr.status === 0) {
                    alert("Could not contact the server. Try it later please.");
                    return;
                }
                var object = JSON.parse(xhr.responseText);
                if (object.status !== 401) {
                    if (typeof object.message !== 'undefined') {
                        alert(object.message);
                    }
                }
            },
            statusCode: {
                401: (response) => {
                    refreshToken();
                    setTimeout(() => {
                        this.getData(callback, url);
                    }, 300);
                }
            }
        });
    }

    method(type_, url_, data_, callback, type) {
        $.ajax({
            url: proxy + url_,
            type: type_,
            contentType: "application/json",
            headers: {
                'Authorization': 'bearer ' + sessionStorage.access_token
            },
            data: data_,
            success: function(result) {
                if (callback !== "") {
                    callback(result);
                }
                if (type == "USER") {
                    documentView.clearContent();
                    documentView.removeActiveClassFromNavigation();
                }
                if (type === "DELETE_DOC") {
                    documentView.clearContent();
                    documentView.clearMessages();
                    documentView.removeActiveClassFromNavigation();
                }
                if (type === "PASSWORD") {
                    documentView.clearContent();
                    documentView.removeActiveClassFromNavigation();
                }

            },
            error(xhr, textStatus, errorThrown) {
                if (xhr.status === 0) {
                    alert("Could not contact the server. Try it later please.");
                    return;
                }
                var object = JSON.parse(xhr.responseText);
                if (object.status !== 401) {
                    if (typeof object.message !== 'undefined') {
                        alert(object.message);
                    }
                }
            },
            statusCode: {
                401: (response) => {
                    refreshToken();
                    setTimeout(() => {
                        this.method(type_, url_, data_, callback, type);
                    }, 300);
                }
            }
        });
    }

    logout() {
        $.ajax({
            'url': proxy + "oauth/revoke-token",
            'type': 'POST',
            'headers': {
                'Authorization': 'Bearer ' + sessionStorage.access_token
            },
            contentType: "application/json",
            'success': function(result) {
                window.location.replace("login.html");
                sessionStorage.clear();
            },
            'error': function(XMLHttpRequest, textStatus, errorThrown) {
                sessionStorage.clear();
                window.location.replace("login.html");
            }
        });
    }
};