import { proxy } from '../config';

export const elements = {
    messages: document.querySelector('.messages'),
    message__item: document.querySelector(".message__item"),
    content: document.querySelector(".content"),
    email: document.querySelector(".user-nav__user-name"),
    title: document.getElementById("title"),
    description: document.getElementById("textarea"),
    dropdown: document.getElementById("dropdown"),
    box: document.querySelector(".box_div"),
    side_msgs: document.getElementById("side-nav-msgs"),
    sidebar: document.querySelector(".sidebar")
};

export const isEmail = email => {
    var re = new RegExp("/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/");
    return re.test(email);
};


export const containsString = (string, array) => {
    var found = false;
    for (var i = 0; i < array.length && !found; i++) {
        if (array[i] === string) {
            found = true;
            break;
        }
    }
    return found;
};

export const refreshToken = () => {
    $.ajax({
        'url': proxy + "oauth/token",
        'type': 'POST',
        'content-Type': 'x-www-form-urlencoded',
        headers: { "Authorization": "Basic bXktY2xpZW50Og==" },
        data: {
            refresh_token: sessionStorage.refresh_token,
            grant_type: 'refresh_token'
        },
        'success': function(result) {
            sessionStorage.access_token = result.access_token;
            sessionStorage.refresh_token = result.refresh_token;
        },
        'error': function(XMLHttpRequest, textStatus, errorThrown) {
            sessionStorage.clear();
            window.location.replace("login.html");
        }
    });
}

const logout = () => {
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
};