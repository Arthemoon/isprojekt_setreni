import Search from './models/Search';
import Document from './models/Document';
import User from './models/User';
import Group from './models/User';
import * as documentView from './views/documentView';
import * as groupView from './views/groupView';
import * as userView from './views/userView';
import "jquery";
import { isEmail, refreshToken, containsString } from './views/base';
import { passwordCheck } from './views/base';
import { proxy } from './config';
import * as xssFilters from "./xssFilters";


var state;

$(document).ready(function() {

    const intializeApp = () => {
        state = {};

        // for test@seznam.cz   sessionStorage.access_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0ZXN0QHNlem5hbS5jeiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwianRpIjoiMjcyNDY0MGEtYmJkYS00YTZmLTgzN2ItNDNmNGFiZjUyZjg1IiwiY2xpZW50X2lkIjoibXktY2xpZW50Iiwic2NvcGUiOlsid3JpdGUiLCJyZWFkIl19.WHy9YFgVEqY17AkCm0mGgSxh5GqUCzmUGhHniaD5ozeBQs1E0mVM_FYifgkKkucdhZRy7Ls80Giij13lT68X--7sV6J7PlER2tprvOd7csOhtZw2VoONWF422McRUvgPwllvqtptq3U_YA4hehbXnD0FPux3j5cI2bok9-rkhzXeh34aaU44qJiB8mD5gfAB6eidcvZUw_7Y3lggrCrByIzDyn9ULjeq5W1OIc6M8FQOqMmyaMqLP41Yy2bu5RcXwAn6-SkUhIeN2TX86nLcl9L6INVu1PHz__Oi6eEeUl32kd44t6J9HmYpxtfvdEKc3UZOPMRQZDeSb7pO5PKgpQ";
        // for patrikmaryska@gmail.com   sessionStorage.access_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJwYXRyaWttYXJ5c2thQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiIsIlJPTEVfQ0FTRV9DUkVBVE9SIl0sImp0aSI6ImMzOWNkMTBiLTllODAtNGYxMC1iZGJiLWVlM2ViNjA2OTNjNCIsImNsaWVudF9pZCI6Im15LWNsaWVudCIsInNjb3BlIjpbIndyaXRlIiwicmVhZCJdfQ.Qohst2uCrQ6pxqqV6n88oH90qqX05y02A54fM4jXlh76Ocj9EZcJmSZhi42uwLOTAmiZ3Ld-eDkvZg7oFUTrKdUldmxMisGkMwJCJtDugz_28N9akNLYRvHo0AB-aS5lUq_NkTDZu1Kja6wqS7lzmnt_a513MnMXxilMocr8ruo5pALbpru1m7YKjh9Fbrd97lpmXQRB1IJTdr6Cv3YEq1mteoXvzDnun93tZqPThciDLk8mQ7y8Of0Vxj8rJxai3IgnHe5yFBHqDe5sb1SnCpHEzddIStzcO42JTvcSGjtxOotOuRH0wkk6fsaZPW5BAxv89cNKif3WiaUU4NR96g"
        // for arthemoone // tj user sessionStorage.accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhcnRoZW1vb25lQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiIwYmZiOWY5Ni02YWU4LTQ4ZTAtOWEwYy04NjA3MGI0OWZjODUiLCJjbGllbnRfaWQiOiJteS1jbGllbnQiLCJzY29wZSI6WyJ3cml0ZSIsInJlYWQiXX0.WoSJ8Nib4k-b6gZElf0limDWqwHGY97a3vDte0OmQ-CtRvDXAm_i4dcloCC2rGMkZtseWrGLm2QJzgeR8pCGc-wXgetJTUWT5UPw6Vp2xqM2qgnCCEbZt_oQGBy3qwtHfM520wRes38xkAGWKn8cj-2axhGru8hPYwrjJ27nq3NrJhcyUBJDJMWDVVe_vhsHFoOoXfUEtO2QC0FWsRTOzq8aXXZykrIozLk2W5lPvP_vpM1ntLZDgvIJ3iFihrrrXR3BBQ3BiDmytl0N3GaUNCR3MFv0Q1PhMqkBr6qouPnKOt6U4Z_4ULBep7HjDaOzVNk3bHCMTiZrNwIZ0J75fQ"

        //   sessionStorage.access_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0ZXN0QHNlem5hbS5jeiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwianRpIjoiMjcyNDY0MGEtYmJkYS00YTZmLTgzN2ItNDNmNGFiZjUyZjg1IiwiY2xpZW50X2lkIjoibXktY2xpZW50Iiwic2NvcGUiOlsid3JpdGUiLCJyZWFkIl19.WHy9YFgVEqY17AkCm0mGgSxh5GqUCzmUGhHniaD5ozeBQs1E0mVM_FYifgkKkucdhZRy7Ls80Giij13lT68X--7sV6J7PlER2tprvOd7csOhtZw2VoONWF422McRUvgPwllvqtptq3U_YA4hehbXnD0FPux3j5cI2bok9-rkhzXeh34aaU44qJiB8mD5gfAB6eidcvZUw_7Y3lggrCrByIzDyn9ULjeq5W1OIc6M8FQOqMmyaMqLP41Yy2bu5RcXwAn6-SkUhIeN2TX86nLcl9L6INVu1PHz__Oi6eEeUl32kd44t6J9HmYpxtfvdEKc3UZOPMRQZDeSb7pO5PKgpQ";
        if (sessionStorage.access_token) {
            state.search = new Search();
            const decodedJWT = parseJwt(sessionStorage.access_token);
            state.currentUser = new User(decodedJWT.user_name, decodedJWT.authorities);
            hide();
            userView.setInitialInformation(state.currentUser);
            state.currentPage = 1;
            state.search.getData(myCallback, "documents?page=" + state.currentPage);
            state.documentState = 1;
            state.currentMenuItem = "newDocs";
            sessionStorage.currentString = "";
            sessionStorage.currentSurname = "";
            $(".search").submit();
        } else {
            window.location.replace("login.html");
        }

    }
    intializeApp();
});


// init app

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

$(".content").on("click", "#miss", function() {
    $(".admin_box").hide();
    $(".content").css("grid-column", "1/3");
});

$(".nav__item").on("click", function() {
    documentView.removeActiveClassFromNavigation();

    var targetElement = event.target || event.srcElement;
    const id = targetElement.id;
    let object = targetElement;

    changePageNumber();
    sessionStorage.currentString = "";
    $("#main-input").val("");


    if (id !== "nav__item--id") {
        if (id === "newDocs" || id === "createGroup" || id === "seeYourGroups" || id == "documentCreation" || id == "showYourDocs" || id == "history" || id == "userCreation" || id == "updateForm" || id == "deleteDocument" || id == "changePass") {
            object = targetElement.parentElement;
        } else if (id === "svg__icon" || id === "nav__item--span") {
            object = targetElement.parentElement.parentElement;
        } else {

        }
    }

    var link = object.querySelector(".side-nav__link");
    state.currentMenuItem = link.id;
    object.classList.add("side-nav__item--active");

    var width = $(window).width();

    if (width <= 429) {
        $("#a_box").hide();
        $("#main_content").css("grow-column", "1/3");
    }
});


$(".messages").on('click', '.msg-item', function(e) {

    documentView.removeActiveClassFromMessages();

    if (!state.usersByEmail) {
        documentView.clearContent();
    }

    var targetElement = event.target || event.srcElement;
    const id = targetElement.id;
    let object = targetElement;

    if (id !== "msg_item") {
        if (id === "msg_link") {
            object = targetElement.parentElement;
        } else if (id === "msg_icon") {
            object = targetElement.parentElement.parentElement;
        } else if (id === "msg_data") {
            object = targetElement.parentElement.parentElement;
        } else {
            object = targetElement.parentElement.parentElement.parentElement;
        }
    }

    state.currentDocumentId = parseInt(object.dataset.id);
    object.classList.add("side-nav__item--active");

    if (state.documentState === 8) {
        $("#u_delete").show();
        state.search.method("GET", "users/roles", "", creationOfUpdateForm, "");
    }

    if (state.documentState === 1) {
        var docs = state.docs;
        var objectClicked = docs.find(el => el.id === state.currentDocumentId);
        objectClicked.currentUser = state.currentUser;
        documentView.renderDocument(objectClicked);
    }

    if (state.documentState === 2) {
        state.search.method("GET", "documents/owner/" + state.currentDocumentId, "", usersForDoc, "");

        setTimeout(() => {
            var docs = state.usersDocs;
            var objectClicked = docs.find(el => el.id === state.currentDocumentId);
            documentView.clearContent();
            documentView.renderYourDocument(objectClicked);
        }, 50);
    }

    if (state.documentState === 3) {
        // update user

        $("#u_delete").show();

        state.search.method("GET", "users/roles", "", creationOfUpdateForm, "");

    }

    if (state.documentState === 4) {
        var docs = state.docs;
        var objectClicked = docs.find(el => el.id === state.currentDocumentId);
        objectClicked.email = state.currentUser.email;
        documentView.clearContent();
        documentView.renderYourHistoricalDocument(objectClicked);
    }

    if (state.documentState === 5) {
        var users = state.usersByEmail;

        var objectClicked = users.find(el => el.id === state.currentDocumentId);
        var groupObject = state.group.find(el => el.id === objectClicked.id);

        if (!groupObject) {
            state.group.push(objectClicked);
            groupView.addUserToGroup(objectClicked);
        }
    }

    if (state.documentState === 6) {
        if (state.usersByEmail) {
            var objectClicked = state.usersByEmail.find(el => el.id === state.currentDocumentId);
            var counter = 0;
            $.each($('.group_user'), function(index, value) {
                if (parseInt(value.dataset.id) === objectClicked.id) {
                    counter++;
                }
            });
            if (counter === 0) {
                groupView.addUserToGroup(objectClicked);
                $('.gc_img2').show();
            }
        } else {
            var objectClicked = state.personalGroups.find(el => el.id === state.currentDocumentId);

            groupView.renderYourGroup(objectClicked);
        }
    }

    if (state.documentState === 7) {
        // delete doc
        var docs = state.docs;
        var objectClicked = docs.find(el => el.id === state.currentDocumentId);
        objectClicked.deleteForm = true;
        documentView.clearContent();
        documentView.renderYourDocument(objectClicked);
    }
});

const creationOfUpdateForm = result => {
    documentView.clearUpdateForm();
    var users = state.usersByEmail;

    var userForUpdate = users.find(el => el.id === state.currentDocumentId);
    state.userForUpdate = userForUpdate;
    userForUpdate.rolesb = result;

    userView.showRestOfTheForm(userForUpdate);


    $("#firstName").val(xssFilters.inDoubleQuotedAttr(state.userForUpdate.firstName));
    $("#surname").val(xssFilters.inDoubleQuotedAttr(state.userForUpdate.surname));
    $("#email").val(xssFilters.inDoubleQuotedAttr(state.userForUpdate.email));

    for (var i = 0; i < userForUpdate.roles.length; i++) {
        $(`#roles option[value="${xssFilters.inDoubleQuotedAttr(userForUpdate.roles[i].authority)}"]`).attr("selected", "selected");
    }
    //   documentView.clearMessages();
};

var isSameSet = function(arr1, arr2) {
    return $(arr1).not(arr2).length === 0 && $(arr2).not(arr1).length === 0;
}

$(".content").on("submit", "#doc-form", function() {
    var data = new FormData();
    var input = document.getElementById('file');

    var name = $("#name").val();
    var surname = $("#surname").val();
    var RC = $("#rc").val();

    const description = $("#textarea").val();
    const approvalSharing = $("#dropdown").val();
    const readers = $("#dropdown_").val();

    let approvalEndDate = $("#cre_startapp").val();
    let approvalEndTime = $("#cre_starttimeapp").val();
    const approvalTime = approvalEndDate + " " + approvalEndTime;

    let startOfReading = $("#cre_start").val();
    let startOfReadingTime = $("#cre_starttime").val();
    const dateTimeStart = startOfReading + " " + startOfReadingTime;

    let endOfReading = $("#cre_end").val();
    let endOfReadingTime = $("#cre_endtime").val();
    const dateTimeEnd = endOfReading + " " + endOfReadingTime;

    var readersArray = readers.split(",");
    var approvalArray = approvalSharing.split(",");

    if (name !== "" && name.length >= 1 && name.length <= 50 && name.trim() !== "" && surname !== "" && surname.length >= 1 && surname.length <= 50 && surname.trim() !== "" &&
        description !== "" && description.length >= 3 && description.length <= 255 && description.trim() !== "" && approvalSharing !== "" &&
        readers !== "" && approvalEndDate !== "" && approvalEndTime !== "" && startOfReading !== "" && startOfReadingTime !== "" &&
        endOfReading !== "" && endOfReadingTime !== "") {

        data.append("file", input.files[0]);;
        data.append("name", name);
        data.append("surname", surname);
        data.append("pid", RC);
        data.append("desc", description);
        data.append("ApprovalGroups", approvalSharing);
        data.append("readers", readers);
        data.append("approvalTime", approvalTime);
        data.append("startOfReading", dateTimeStart);
        data.append("endOfReading", dateTimeEnd);

        if (isSameSet(readersArray, approvalArray)) {
            $("#group-error").show();
            $("#group-error").text("Groups cannot consist of the same users.")

            $("#conf-error").show();
            $("#conf-error").text("Groups cannot consist of the same users.")

            $("#dropdown_").addClass("border-red");
            $("#dropdown").addClass("border-red");
            return;
        }

        // porovnej časy 
        $(".border-red").removeClass();

        if (checkDates(dateTimeStart, dateTimeEnd, approvalTime)) {
            ajaxFiles(data);

            return true;
        }
    }

    return false;
});

const checkDates = (dateTimeStart, dateTimeEnd, approvalTime) => {
    var counter = 0;

    $(".border-red").removeClass(".border-red");
    $(".doc-error").text("");
    $(".doc-error").hide();

    if (new Date(dateTimeStart).getTime() < new Date().getTime()) {
        $("#cre_start").addClass("border-red");
        $("#cre_starttime").addClass("border-red");

        $("#start-error").show();
        $("#start-error").append(`Start of the document activity must be bigger than current time. `);
        counter++;
    }

    if (new Date(dateTimeEnd).getTime() < new Date().getTime()) {
        $("#cre_end").addClass("border-red");
        $("#cre_endtime").addClass("border-red");

        $("#end-error").show();
        $("#end-error").append("End of the document activity must be bigger than current time. ")

        counter++;
    }

    if (new Date(approvalTime).getTime() < new Date().getTime()) {
        $("#cre_startapp").addClass("border-red");
        $("#cre_starttimeapp").addClass("border-red");

        $("#app-error").show();
        $("#app-error").append("End of the approving activity must be bigger than current time. ");

        counter++;
    }


    if (new Date(dateTimeStart).getTime() > new Date(dateTimeEnd).getTime()) {
        $("#cre_start").addClass("border-red");
        $("#cre_starttime").addClass("border-red");

        $("#cre_end").addClass("border-red");
        $("#cre_endtime").addClass("border-red");

        $("#start-error").show();
        $("#start-error").append("Start of the sharing activity must be lower than the end of the activity. ");

        $("#end-error").show();
        $("#end-error").append("Start of the sharing activity must be lower than the end of the activity. ")

        counter++;
    }

    if (new Date(approvalTime).getTime() > new Date(dateTimeStart).getTime()) {
        $("#cre_start").addClass("border-red");
        $("#cre_starttime").addClass("border-red");
        $("#cre_startapp").addClass("border-red");
        $("#cre_starttimeapp").addClass("border-red");

        $("#start-error").show();
        $("#start-error").append("Approval time must be lower than start of the sharing document with readers. ");

        $("#app-error").show();
        $("#app-error").append("Approval time must be lower than start of the sharing document with readers. ");

        counter++;
    }

    if (new Date(approvalTime).getTime() > new Date(dateTimeEnd).getTime()) {
        $("#cre_end").addClass("border-red");
        $("#cre_endtime").addClass("border-red");
        $("#cre_startapp").addClass("border-red");
        $("#cre_starttimeapp").addClass("border-red");

        $("#end-error").show();
        $("#end-error").append("Approval time must be lower than the end of the sharing document with readers. ");

        $("#app-error").show();
        $("#app-error").append("Approval time must be lower than the end of the sharing document with readers. ");

        counter++;
    }

    if (counter === 0) {
        return true;
    } else {
        return false;
    }
}


const ajaxFiles = (data) => {
    $.ajax({
        method: 'POST',
        enctype: 'multipart/form-data',
        url: `${proxy}documents`,
        data: data,
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'bearer ' + sessionStorage.access_token
        },
        success: function(data) {
            documentView.clearContent();
            location.reload();
            documentView.removeActiveClassFromNavigation();
        },
        error: function(xhr, ajaxOptions, thrownError) {
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
                    ajaxFiles(data);
                }, 300);
            }
        }
    });
}


$("#doc_id").on("click", function() {
    state.documentState = 1;
    documentView.clearMessages();

    documentView.fillDocuments(state.docs); // undefined 
});

function myCallback(data) {
    state.docs = data;
}


$(".content").on("click", "#btn-approval", function() {
    var value = $(".form__radio-input:checked").val();

    var datas = {};
    datas.approval = value;
    datas.doc_id = state.currentDocumentId;

    putRequest(JSON.stringify(datas));
});

const putRequest = json => {
    $.ajax({
        url: `${proxy}documents`,
        type: "PUT",
        contentType: "application/json",
        headers: {
            'Authorization': 'bearer ' + sessionStorage.access_token
        },
        data: json,
        success: function(data) {
            documentView.deleteMessage(state.currentDocumentId);
            documentView.clearContent();
            documentView.removeActiveClassFromNavigation();
        },
        error: function(xhr, textStatus, errorThrown) {
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
            401: function(response) {
                refreshToken();
                setTimeout(() => {
                    putRequest(json);
                }, 300);
            }
        }
    });
};


// NAČTENÍ FORMY PRO TVORBU DOKUMENTU

const creationOfDocumentForm = (data) => {
    documentView.clearMessages();
    documentView.createDocumentForm(data);
}

$("#documentCreation").on("click", function() {
    $("#site__title").text("Šetření");
    documentView.clearContent();

    $(".content").css("background-color", "#add8e6;");
    state.search.method("GET", "groups", "", creationOfDocumentForm, "");
});

$("#createGroup").on("click", function() {
    $("#site__title").text("Uživatelé");
    documentView.clearMessages();
    documentView.clearContent();
    groupView.createGroupForm();
    $(".content").css("background-color", "#add8e6");
    state.documentState = 5;
    sessionStorage.currentSurname = "";
    state.currentPage = 1;
    changePageNumber();
    state.group = [];
});


// MAIN BTN SEARCH
$(".search").on("submit", function() {
    doSearchFunction();
});

const doSearchFunction = () => {
    $("#site__title").text("Šetření");
    var title = $("#main-input").val();
    var regex = new RegExp("^[a-zá-žA-ZÁ-Ž0-9\)\(\!\?\s]+$");

    if (sessionStorage.currentString != title) {
        state.currentPage = 1;
        changePageNumber();
    }

    if (title.length >= 3 && title.length <= 15 && title != "" && regex.test(title)) {
        state.search.method("GET", "documents/find?name=" + xssFilters.uriFragmentInHTMLData(title) + "&page=" + state.currentPage, "", myCallbackForFind, "");
    } else {
        //  alert("Vstup může být minimálně 3 znaky dlouhý.");
    }

    documentView.clearMessages();
    state.currentMenuItem = "search";
    sessionStorage.currentString = title;

    return false;
}

const myCallbackForFind = result => {
    state.docs = result;
    state.docs.forEach(el => {
        el.owner = true;
    });
    documentView.fillDocuments(result);
}

const myCallbackForHistory = result => {
    state.docs = result;

    documentView.clearMessages();
    documentView.fillDocuments(result);
    state.documentState = 4;

    result.forEach(el => {
        el.history = true
    });
};

// USER CREATION BUTTON

$("#userCreation").on("click", function() {
    $("#site__title").text("Uživatelé");
    documentView.clearMessages();
    documentView.clearContent();
    state.search.method("GET", "users/roles", "", myGroups, "");
})

const myGroups = result => {
    userView.userCreationForm(result);
};

$('.content').on('submit', '#u_cf', function(e) {

    e.preventDefault();

    let name = $("#firstName").val();
    let surname = $("#surname").val();
    let email = $("#email").val();
    let pass1 = $("#psw1").val();
    let pass2 = $("#psw2").val();
    let roles_ = $("#roles_user").val();


    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (name.length > 0 && surname.length > 0 && roles_.length > 0) {
        if (regex.test(pass1) && regex.test(pass2) && pass1 == pass2) {
            const data = {
                firstName: name,
                surname: surname,
                email: email,
                password: pass1,
                roles: roles_
            };
            state.search.method("POST", "users", JSON.stringify(data), "", "USER");

        } else {
            $("#psw_error").show();
        }
    }
    return false;
});


// USER UPDATE FORM

$("#updateForm").on("click", function() {
    $("#site__title").text("Uživatelé");
    sessionStorage.currentSurname = "";
    documentView.clearMessages();
    documentView.clearContent();
    userView.createUpdateForm();
    state.currentPage = 1;
    state.documentState = 8;
    state.search.method("GET", "users?page=" + state.currentPage, "", getCallback, "");
    changePageNumber();
});

$(".content").on("click", "#update_btn", function() {

    const value = $("#update_input").val();
    state.documentState = 3;

    if (value !== "" && value.length > 3) {
        if (sessionStorage.currentSurname != value) {
            sessionStorage.currentSurname = value;
            state.currentPage = 1;
            changePageNumber();
        }
        documentView.clearMessages();
        state.search.method("GET", "users/finds?email=" + xssFilters.uriFragmentInHTMLData(sessionStorage.currentSurname) + "&page=" + state.currentPage, "", getCallback, "");
    }
});


$(".content").on("submit", "#user-form", function() {
    var firstNamej = $("#firstName").val();
    var surnamej = $("#surname").val();
    var emailj = $("#email").val();
    var rolesj = $("#roles").val();

    const data = {
        firstName: firstNamej,
        surname: surnamej,
        email: emailj,
        roles: rolesj,
        id: state.userForUpdate.id,
        password: "123456AB#"
    };

    state.search.method("PUT", "users", JSON.stringify(data), "", "USER");

    // documentView.clearContent();

    return false;
});



$(".content").on("change", "#event_dropdown", function() {
    eventView.clearAdditional();
    var value = $(this).val();

    eventView.handleClickOnDropdown(value);
});

$(".content").on("click", "#plus", function() {

    eventView.createPoolingOption();
});


$(".content").on("click", "#confirm_delete", function() {
    state.search.method("DELETE", "users/" + state.userForUpdate.id, "", "", "");
    documentView.clearContent();
});


// LOGOUT

$("#logout").on("click", function() {
    state.search.logout();
    sessionStorage.clear();
});


const getCallback = (result) => {
    state.usersByEmail = result;
    documentView.renderUser(result);
};

$(".content").on("click", "#u_delete", function() {
    state.search.method("DELETE", "users/" + state.userForUpdate.id, "", "", "");
    documentView.clearContent();
    documentView.clearMessages();
});

// HIDE ACCORDING TO ROLES
const hide = () => {
    const array = state.currentUser.role;
    var hasAdmin = containsString("ROLE_ADMIN", array);
    var hasDocumentCreator = containsString("ROLE_CASE_CREATOR", array);


    if (hasDocumentCreator) {
        $(".dc").show();
    }
    if (hasAdmin) {
        $(".dc").show();
        $(".ad").show();
    }

};


// USER PLACE YOUR DOCS

$("#showYourDocs").on("click", function() {
    $("#site__title").text("Vaše šetření");
    documentView.clearMessages();
    documentView.clearContent();
    // $(".content").css("background-color", "#f4f2f2");
    // $(".content").css("background-color", "#00719c");

    documentView.renderHistoryForm(2);

    //  $(".detail").css("background-color", "#009db6");
    $(".description").css("background-color", "#009bd6");

    state.documentState = 2;
    state.currentPage = 1;
    sessionStorage.historyMonth = $("#month").val();
    sessionStorage.historyYear = $("#year").val();
});

const yourDocs = (result) => {
    state.usersDocs = result;
    documentView.clearMessages();
    documentView.fillYourDocuments(result);
};

const usersForDoc = (result) => {
    state.usersDocs.users = result;
};

// adding user to group
$(".messages").on("click", "#plus_imgx", function() {
    var users = state.usersByEmail;

    var objectClicked = users.find(el => el.id === state.currentDocumentId);

    state.group.push(objectClicked);
});

const userCallback = result => {
    state.usersByEmail = result;
    documentView.renderUser(result);
};

// group creation confirm groupCreation

$('.content').on('click', '#groupCreations', function() {

    var title_ = $("#title").val();
    var array = state.group;
    var array_ = [];

    if (title_ !== "" && title_.length >= 3 && title_.length <= 40) {
        array.forEach(el => array_.push(el.id));

        array_.push(500);

        const data = {
            name: title_,
            ids: array_
        };

        state.search.method("POST", "groups", JSON.stringify(data), "", "");

        documentView.clearMessages();
        documentView.clearContent();
    }
});

$(".content").on("submit", "#cgf", function() {
    var title_ = $("#title").val();
    var array = state.group;
    var array_ = [];

    if (array.length === 0) {
        alert("You need to have someone in the group");
        return;
    }


    var regex = new RegExp("^[a-zá-žA-ZÁ-Ž0-9\\)\\(\\!\\?\\s\\,\\(\\)\\\"]+$");

    if (title_ !== "" && title_.length >= 3 && title_.length <= 40 && regex.test(title_)) {
        array.forEach(el => array_.push(el.id));

        const data = {
            name: title_,
            ids: array_
        };

        state.search.method("POST", "groups", JSON.stringify(data), "", "");

        documentView.clearMessages();
        documentView.clearContent();
        documentView.removeActiveClassFromNavigation();

    } else {
        alert("Group can contain only alphanumeric characters and ? ! () , characters.");
    }

    return false;
});

// GROUPS SEE

//seeYourGroups

$("#seeYourGroups").on("click", function() {
    state.currentPage = 1;
    seeYourGroupFunction();
});

const seeYourGroupFunction = () => {
    $("#site__title").text("Skupiny");
    delete state.usersByEmail;
    state.documentState = 6;
    documentView.clearContent();
    documentView.clearMessages();
    state.search.method("GET", "groups?page=" + state.currentPage, "", yourPersonalGroups, "");
};

const yourPersonalGroups = data => {
    state.personalGroups = data;
    groupView.fillGroups(data);
};


$(".content").on("click", "#gc_delete", function() {
    const data = {
        id: state.currentDocumentId
    };

    state.search.method("DELETE", "groups", JSON.stringify(data), "", "");
    documentView.clearContent();
    documentView.deleteMessage(state.currentDocumentId);
    documentView.removeActiveClassFromNavigation();
});

$(".content").on("click", "#gc_update", function() {

    $("#gc_title").attr("readonly", false);
    $('.gc_img2').show();
    $("#btn_update_group").show();
    $(".gc_search_div").css("display", "flex");
    state.currentMenuItem = "updateForm";
});

$(".content").on("click", "#find_user", function() {
    var x = $("#gc_email").val();

    if (x !== "" && x.trim().length > 1) {
        if (sessionStorage.currentSurname !== x) {
            state.currentPage = 1;
            changePageNumber();
            documentView.clearMessages();
        }
        sessionStorage.currentSurname = x;
        state.search.method("GET", "users/finds/active?email=" + x + "&page=" + state.currentPage, "", cb, "");
    }
});

const cb = (data) => {
    state.usersByEmail = data;
    //  documentView.clearMessages();
    documentView.renderUser(data);
};

// delete_user_group

$(".content").on("click", "#delete_user_group", function() {

    var targetElement = event.target || event.srcElement;
    const id = targetElement.parentElement.dataset.id;

    $.each($('.group_user'), function(index, value) {
        if (parseInt(value.dataset.id) === parseInt(id)) {
            value.remove();
            var index = state.group.map(x => {
                return x.Id;
            }).indexOf(id);
            state.group.splice(index, 1);
        }
    });
});


$(".content").on("submit", "#ugf_", function() {

    var title = $("#gc_title").val();
    var users = [];
    var groupId = $("#group_content_").attr("data-id");
    var regex = new RegExp("^[a-zá-žA-ZÁ-Ž0-9\\)\\(\\!\\?\\s\\,\\(\\)\\\"]+$");
    $.each($('.group_user'), function(index, value) {
        users.push(value.dataset.id);
    });

    if (title !== "" && title.length >= 3 && title.length <= 40 && users.length > 0 && regex.test(title)) {
        const data = {
            id: groupId,
            name: title,
            ids: users
        };

        state.search.method("PUT", "groups", JSON.stringify(data), "", "");

        documentView.clearContent();
        documentView.clearMessages();
        documentView.removeActiveClassFromNavigation();

        return false;
    } else {
        alert("Group can support only ? ! () , whitespace chars and alphanumeric chars.");
    }

    return false;

});



$(".content").on("submit", "#yourdocs-form", function() {
    var year = $("#year").val();
    var month = $("#month").val();
    state.currentPage = 1;
    changePageNumber();

    if (year !== "" && month !== "") {
        state.search.method("GET", "documents/owner?year=" + year, "&month=" + month + "&page=" + state.currentPage, yourDocs);
    }

    return false;
});



// history

$("#history").on("click", function() {
    $("#site__title").text("Historie");
    documentView.clearMessages();
    documentView.clearContent();
    documentView.renderHistoryForm(1);
    $(".description").css("background-color", "#009bd6");
    sessionStorage.historyMonth = 1;
    sessionStorage.historyYear = 1;
    state.currentPage = 1;
    changePageNumber();
});

$(".content").on("submit", "#history-form", function() {
    var year = $("#year").val();
    var month = $("#month").val();
    state.currentPage = 1;
    sessionStorage.historyYear = year;
    sessionStorage.historyMonth = month;

    if (year !== "" && month !== "") {
        state.search.method("GET", "documents/history?year=" + year, "&month=" + month + "&page=" + state.currentPage, myCallbackForHistory, "");
    }

    return false;

})

$("#refresh").on("click", function() {
    documentView.clearMessages();
    state.search.getData(myCallback, "documents?page=1");
    state.documentState = 1;
});

$(".content").on("change", "#gc_title", function() {
    var value = $("#gc_title").val();
    $("#group_name").text(xssFilters.inHTMLData(value));
});

$(".content").on("change", "#title", function() {

    var value = $("#title").val();
    $("#group_name").text(xssFilters.inHTMLData(value));
})


$("#newDocs").on("click", function() {
    state.currentPage = 1;
    getNewDocs();
});

const getNewDocs = () => {
    $("#site__title").text("Nová šetření");
    documentView.clearMessages();
    documentView.clearContent();
    state.search.getData(myCallback, "documents?page=" + state.currentPage);
    state.documentState = 1;
};

$("#menu").on("click", function() {
    documentView.clearContent();
    $("#a_box").show();
    $("#a_box").css("grid-column", "1/3");
});

$(".content").on("click", "#deactiveUser", function() {

    state.search.method("DELETE", "users/" + state.userForUpdate.id, "", "", "");
    documentView.clearContent();
    documentView.clearMessages();
});

$("#deleteDocument").on("click", function() {

    state.documentState = 7;
    documentView.clearContent();
    documentView.clearMessages();
    documentView.renderHistoryForm(3);
    $(".description").css("background-color", "#009bd6");
    state.currentPage = 1;
    changePageNumber();
    sessionStorage.historyYear = $("#year").val();
    sessionStorage.historyMonth = $("#month").val();

    $("#site__title").text("Šetření");
});

$(".content").on("submit", "#delete-doc-form", function() {

    var year = $("#year").val();
    var month = $("#month").val();
    state.currentPage = 1;
    changePageNumber();

    if (year !== "" && month !== "") {
        state.search.method("GET", "documents/all?year=" + year, "&month=" + month + "&page=" + state.currentPage, myCallbackForDocumentDelete, "");
    }

    return false;
});

$(".minus").on("click", function() {
    if (state.currentPage !== 1) {
        state.currentPage -= 1;
    }
    doPagination();
});

$(".plus").on("click", function() {
    if (state.currentPage !== 0) {
        state.currentPage += 1;
    }
    doPagination();
});

const doPagination = () => {
    var menuItem = state.currentMenuItem;
    if (menuItem == "newDocs") {
        getNewDocs();
    } else if (menuItem == "showYourDocs") {
        state.search.method("GET", "documents/owner?year=" + sessionStorage.historyYear, "&month=" + sessionStorage.historyMonth + "&page=" + state.currentPage, yourDocs);
    } else if (menuItem == "search") {
        doSearchFunction();
    } else if (menuItem == "history") {
        var year = sessionStorage.historyYear;
        var month = sessionStorage.historyMonth;
        state.search.method("GET", "documents/history?year=" + year, "&month=" + month + "&page=" + state.currentPage, myCallbackForHistory, "");
    } else if (menuItem == "deleteDocument") {
        state.search.method("GET", "documents/all?year=" + sessionStorage.historyYear, "&month=" + sessionStorage.historyMonth + "&page=" + state.currentPage, myCallbackForDocumentDelete, "");
    } else if (menuItem == "createGroup") {
        documentView.clearMessages();
        state.search.method("GET", "users/finds/active?email=" + sessionStorage.currentSurname + "&page=" + state.currentPage, "", cb, "");
    } else if (menuItem == "seeYourGroups") {
        seeYourGroupFunction();
    } else if (menuItem == "updateForm") {
        documentView.clearMessages();
        var title = $("#surname").val();
        if (sessionStorage.currentSurname != "") {
            $("#update_btn").click();
        } else {
            state.search.method("GET", "users?page=" + state.currentPage, "", cb, "");
        }
        // state.search.method("GET", "users/finds?email=" + xssFilters.uriFragmentInHTMLData(sessionStorage.currentSurname) + "&page=" + state.currentPage, "", getCallback, "");
    }

    changePageNumber();
}

const changePageNumber = () => {
    $(".pageNumber").text(state.currentPage);
}
const myCallbackForDocumentDelete = result => {
    state.docs = result;

    documentView.clearMessages();
    result.deleteDoc = true;
    documentView.fillDocuments(result);
    state.documentState = 7;
};

$(".content").on("click", "#delete_document", function() {
    state.search.method("DELETE", "documents/" + state.currentDocumentId, "", "", "DELETE_DOC");

});

// change password

$("#changePass").on("click", function() {

    documentView.clearContent();
    documentView.clearMessages();
    userView.changePassword();
});


$(".content").on("submit", "#changePassword", function() {

    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const oldPsw1 = $("#previousPsw1").val();
    const oldPsw2 = $("#previousPsw2").val();
    const newPsw1 = $("#newPsw1").val();
    const newPsw2 = $("#newPsw2").val();

    if (oldPsw1 == oldPsw2 && newPsw1 == newPsw2) {
        if (newPsw1.match(regex) && newPsw2.match(regex)) {
            const data = {
                oldPassword: oldPsw1,
                newPassword: newPsw1
            };
            state.search.method("POST", "users/password", JSON.stringify(data), "", "PASSWORD");

        } else {
            alert("New passwords require at least 8 characters, 1 special char, 1 upper-case letter, 1 lower case letter and 1 digit.");
        }
    } else {
        alert("Your passwords do not match. Please try again.");

    }
});