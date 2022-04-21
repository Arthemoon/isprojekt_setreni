import { elements } from './base';
import * as xssFilters from "../xssFilters";
import { proxy, PAGE_SIZE } from "../config";
import { refreshToken } from './base';

export const fillDocuments = (data) => {

    for (var i = 0; i < data.length; i++) {

        var numOfData = data.length;
        const state = data[i].caseState.id;
        const documentsForUsers = data[i].documentsForUsers;
        const approval = documentsForUsers[0].approval;

        var img = "";

        if (state === 2) {
            img = "img/decision.svg";
        } else if (state === 1) {
            img = "img/agree.svg";
        } else if (state === 1 && approval === 2) {
            img = "img/unread.svg";
        } else {
            // disapproved
            img = "img/disagree.svg";
        }
        var email = parseJwt(sessionStorage.access_token).user_name;
        var object = data[i].documentsForUsers.find(el => el.user.email == email);

        var sharingType;

        if (data.deleteDoc) {
            sharingType = 1;
        } else {
            sharingType = object.sharingType.id;
        }

        var time = sharingType === 1 ? data[i].uploadDatetime : data[i].activeStartTime;


        const markup = `<li class="side-nav__item msg-item" id="msg_item" data-id="${xssFilters.inDoubleQuotedAttr(data[i].id)}">
      <a href="#" class="side-nav__link" id="msg_link">
          <img src="${img}" class="side-nav__icon" id="msg_icon">
          </img>
          <div class="msg-data" id="msg_data">
          <div class="msg-title" id="msg_title">${xssFilters.inHTMLData(data[i].csurname)}</div>
          <div class="msg-date" id="msg_date">${formatTimeForMessages(xssFilters.inHTMLData(time))}</div>
          </div>
      </a>
  </li>`;

        const pagination = `<div class="pagination"><a class="paginationForNewDocuments minus" id="-" href="#">-</a>
    <a class="paginationForNewDocuments plus" id="+" href="#">+</a></div>"`

        elements.side_msgs.insertAdjacentHTML("beforeend", markup);
        //   elements.messages.insertAdjacentHTML("beforeend", pagination);
    }
};


export const fillYourDocuments = (data) => {

    for (var i = 0; i < data.length; i++) {

        const state = data[i].caseState.id;
        const documentsForUsers = data[i].documentsForUsers;
        const approval = documentsForUsers[0].approval;

        var img = "";

        if (state === 2) { // approval
            img = "img/decision.svg";
        } else if (state === 1) {
            // approved
            img = "img/agree.svg";
        } else if (state === 1 && approval === 2) {
            img = "img/unread.svg";

        } else {
            // disapproved
            img = "img/disagree.svg";
        }

        const markup = `< li class = "side-nav__item msg-item" id = "msg_item" data - id = "${xssFilters.inDoubleQuotedAttr(data[i].id)}" >
            <
            a href = "#"
        class = "side-nav__link"
        id = "msg_link" >
            <
            img src = "${img}"
        class = "side-nav__icon"
        id = "msg_icon" >
            <
            /img> <
            div class = "msg-data"
        id = "msg_data" >
            <
            span class = "msg-title"
        id = "msg_title" > $ { xssFilters.inHTMLData(data[i].title) } < /span> <
            span class = "msg-date"
        id = "msg_date" > $ { xssFilters.inHTMLData(formatTimeForMessages(data[i].uploadDatetime)) } < /span> <
            /div> <
            /a> <
            /li>`;

        const markup2 = `<li class="side-nav__item msg-item" id="msg_item" data-id="${xssFilters.inDoubleQuotedAttr(data[i].id)}">
      <a href="#" class="side-nav__link" id="msg_link">
          <img src="${img}" class="side-nav__icon" id="msg_icon">
          </img>
          <div class="msg-data" id="msg_data">
          <div class="msg-title" id="msg_title">${xssFilters.inHTMLData(data[i].csurname)}</div>
          <div class="msg-date" id="msg_date">${formatTimeForMessages(xssFilters.inHTMLData(data[i].uploadDatetime))}</div>
          </div>
      </a>
  </li>`;

        elements.side_msgs.insertAdjacentHTML("beforeend", markup2);
    }
};


export const renderYourDocument = (data) => {
    var approve = "";
    var disapprove = "";

    var stateOfDocument = data.caseState.state;
    var users = data.documentsForUsers;
    var approvals = users.filter(el => el.sharingType.id === 1);
    var readers = users.filter(el => el.sharingType.id === 2);

    var approves = 0;
    var disapproves = 0;
    var nons = 0;
    var non = "";

    for (var i = 0; i < approvals.length; i++) {
        if (approvals[i].approval === 1) {
            approve += approvals[i].user.firstName + " " + approvals[i].user.surname;
            approves++;
            if (i !== approvals.length - 1) {
                approve += ", ";
            }
        } else if (approvals[i].approval === 0) {
            disapprove += approvals[i].user.firstName + " " + approvals[i].user.surname;
            disapproves++;
            if (i !== approvals.length - 1) {
                disapprove += ", ";
            }
        } else if (approvals[i].approval == 2) {
            non += approvals[i].user.firstName + " " + approvals[i].user.surname;
            nons++;
            if (i !== approvals.length - 1) {
                non += ", ";
            }
        }
    }

    if (approves === 0) approve += "Nikdo neschválil toto šetření.";
    if (disapproves === 0) disapprove += "Nikdo nezamítl toto šetření.";
    if (nons === 0) non += "Všichni potvrdili toto šetření.";


    var approvesR = 0;
    var noRc = 0;
    var approveR = "";
    var nonR = "";

    for (var i = 0; i < readers.length; i++) {
        if (readers[i].approval === 1) {
            approveR += readers[i].user.firstName + " " + readers[i].user.surname;
            approvesR++;
            if (i !== readers.length - 1) {
                approveR += ", ";
            }
        } else if (readers[i].approval == 2) {
            nonR += readers[i].user.firstName + " " + readers[i].user.surname;
            noRc++;
            if (i !== readers.length - 1) {
                nonR += ", ";
            }
        }
    }

    if (approvesR === 0) approveR += "Nikdo nepotvrdil seznámení se s šetřením.";
    if (noRc === 0) nonR += "Všichni potvrdili seznámení se s šetřením.";

    const markup2 = `
    <h4 class="heading-2 mbs">Uživatelé, kteří potvrdily šetření. </h4><p class="paragraph flex"><img src="img/book.svg" class="side-nav__icon"/> ${xssFilters.inHTMLData(approveR)}</p>
        <h4 class="heading-2 mbs">Uživatelé, kteří dosud neodpověděli.</h4>
        <p class="paragraph flex"><img src="img/unread.svg" class="side-nav__icon"/> ${xssFilters.inHTMLData(nonR)}</p>
    </div></div>
    `;

    const markup1 = `<p class="paragraph">Šetření nebylo prozatím schváleno</p>`;

    const markupx = `
    <div class="overview">
    <h1 class="overview__heading" id="doc_title">
        ${xssFilters.inHTMLData(data.csurname)} <span class="subtitle">[${xssFilters.inHTMLData(stateOfDocument)}]</span>
    </h1>

    <div class="overview__date" id="doc_uploadDate">
        <span>${formatTimeForPost(xssFilters.inHTMLData(data.uploadDatetime))}</span>
    </div>

    <div class="overview__postedBy">
        <svg class="overview__icon-location">
            <use xlink:href="img/sprite.svg#icon-location-pin"></use>
        </svg>
        <button class="btn-inline" id="createdBy">${xssFilters.inHTMLData(data.user.firstName)} ${xssFilters.inHTMLData(data.user.surname)}</button>
    </div>
</div>

<div class="detail"  id="doc_detail">
    <div class="description border-left">
        <h4 class="heading-2 mbs">Rodné číslo žadatele</h4>
        <p class="paragraph" id="doc_description">
            ${xssFilters.inHTMLData(data.pid)}
        </p>
        <h4 class="heading-2 mbs">Popis šetření</h4>
        <p class="paragraph" id="doc_description">
            ${xssFilters.inHTMLData(data.description)}
        </p>
        <h4 class="heading-2 mbs">Dostupnost přístupu k šetření</h4>
        <p class="paragraph">
            Sociální šetření bude k vidění od <b><span id="date_start">${xssFilters.inHTMLData(formatTimeForPost(data.activeStartTime))}</span> - <span id="date_end">${xssFilters.inHTMLData(formatTimeForPost(data.activeEndTime))}.</span></b>
        </p>
        <h4 class="heading-2 mbs">Přístup k šetření</h4>
        <p class="paragraph">
            <a href="#" class="btn-inline no-inline" target="_blank" id="pdf-link">Klikněte zde pro čtení šetření</a>
        </p>
    </div>
    </div>    
<div class="detail">
    <div class="description noflex border-left">
    <h2 class="heading-2 mbb">Schvalování</h2>
    <h4 class="heading-2 mbs">Uživatelé, kteří schválili šetření</h4>
    <p class="paragraph flex"><img src="img/agree.svg" class="side-nav__icon"/> ${xssFilters.inHTMLData(approve)}</p>
    <h4 class="heading-2 mbs">Uživatlé, kteří zamítli šetření. </h4>
    <p class="paragraph flex"><img src="img/disagree.svg" class="side-nav__icon"/> ${xssFilters.inHTMLData(disapprove)}</p>
    <h4 class="heading-2 mbs">Uživatelé, kteří se zatím nevyjádřili</h4>
    <p class="paragraph flex"><img src="img/unread.svg" class="side-nav__icon"/> ${xssFilters.inHTMLData(non)}</p>
</div> 
</div>
<div class="detail" id="readers_detail">
    <div class="description border-left noflex">
    <h3 class="heading-2 mbb">Čtenáři</h3>
        ${data.caseState.id !== 1 ? markup1 : markup2}
    
        </div>
        </div>
        <div class="detail" id="btn_detail">
        
        </div>`;

    const markupy = `
    <button class="btn" id="delete_document">Smazat</button>
`;

    getPdfById(data.id);
    elements.content.insertAdjacentHTML("beforeend", markupx);

    if (data.deleteForm) {
        $("#btn_detail").append(markupy);
    }
};


export const renderDocument = (data) => {
    var subtitle = data.caseState.state;
    var process = data.caseState.id;

    const appMarkup = `
    <div class="form__radio-group">
    <input type="radio" class="form__radio-input" id="large" name="size" value="1">
            <label for="large" class="form__radio-label">
                <span class="form__radio-button"></span>
                Souhlasím
            </label>
</div>
<div class="form__radio-group">
    <input type="radio" class="form__radio-input" id="small" name="size" value="0">
    <label for="small" class="form__radio-label">
        <span class="form__radio-button"></span>
        Nesouhlasím
    </label>
</div>
    `;

    const baseMarkup = `
    <div class="form__radio-group">
    <input type="radio" class="form__radio-input" id="large" name="size" value="1">
            <label for="large" class="form__radio-label">
                <span class="form__radio-button" id="btn-name"></span>
                Potvrdit
            </label>
</div>
    `;

    var email = parseJwt(sessionStorage.access_token).user_name;

    var object = data.documentsForUsers.find(el => el.user.email == email);
    var app = object.approval;

    let approvalx;

    if (process === 2 && app === 2) {
        approvalx = `Sociální šetření musí být schváleno do <b><span id="approval_endtime">${formatTimeForPost(xssFilters.inHTMLData(data.approvalEndTime))}</span></b>`;
    } else if (process === 1 && app === 2) {
        approvalx = `Sociální šetření musí být přečteno a potvrzeno do <b><span id="approval_endtime">${formatTimeForPost(xssFilters.inHTMLData(data.activeEndTime))}</span></b>`;
    } else if (process === 1 && app === 1) {
        approvalx = `Souhlasil/a jste s tímto sociálním šetřením.`;
    } else if (process === 2 && app === 0) {
        approvalx = `Nesouhlasil jste s tímto sociálním šetřením`;
    } else if (process === 3) {
        approvalx = `Toto sociální šetření bylo zrušeno. Mělo být schváleno do <b><span id="approval_endtime">${xssFilters.inHTMLData(formatTimeForPost(data.approvalEndTime))}</span></b>.`;
    } else if (process === 2 && app === 1) {
        approvalx = "Potvrdil jste toto šetření.";
    } else {
        approvalx = ``;
    }

    const markupx = `
    <div class="overview">
    <h1 class="overview__heading" id="doc_title" >
        ${xssFilters.inHTMLData(data.csurname)} ${xssFilters.inHTMLData(data.cname)}
    </h1>

    <div class="overview__date" id="doc_uploadDate">
        <span>${formatTimeForPost(xssFilters.inHTMLData(data.uploadDatetime))}</span>
    </div>

    <div class="overview__postedBy">
        <svg class="overview__icon-location">
            <use xlink:href="img/sprite.svg#icon-location-pin"></use>
        </svg>
        <button class="btn-inline" id="createdBy">${xssFilters.inHTMLData(data.user.firstName)} ${xssFilters.inHTMLData(data.user.surname)}</button>
    </div>
</div>

<div class="detail">
    <div class="description border-left">
        <h4 class="heading-2 mbs">Rodné číslo žadatele</h4>
        <p class="paragraph" id="doc_description">
            ${xssFilters.inHTMLData(data.pid)}
        </p>
        <h4 class="heading-2 mbs">Popis sociálního šetření</h4>
        <p class="paragraph" id="doc_description">
            ${xssFilters.inHTMLData(data.description)}
        </p>
        <h4 class="heading-2 mbs">Dostupnost šetření</h4>
        <p class="paragraph">
            Sociální šetření bude dostupné do <b><span id="date_start">${formatTimeForPost(xssFilters.inHTMLData(data.activeStartTime))}</span> - <span id="date_end">${formatTimeForPost(xssFilters.inHTMLData(data.activeEndTime))}.</span></b>
        </p>
        <h4 class="heading-2 mbs">Přiložené šetření</h4>
        <p class="paragraph">
            <a href="#" class="btn-inline no-inline" id="pdf-link">Zobrazit šetření</a>
        </p>
    </div>
    </div>    
<div class="detail">
    <div class="description border-left">
    <h4 class="heading-2 mbs">Schválení</h4>
        <p class="paragraph">
            ${approvalx}
        </p>
        <div class="approval">
        ${data.caseState.id === 2 ? appMarkup : baseMarkup}
        <div class="form__radio-group" id="btn-approvald">
                <button class="btn btn--green" id="btn-approval">Odeslat</button>
            </div>
    </div>
</div>  
    `;

    if (data.caseState.id === 2) {
        $(".btn").css("margin-left", "3rem");
    }

    getPdfById(data.id);
    elements.content.insertAdjacentHTML("beforeend", markupx);

    if (data.owner) {
        $(".approval").hide();
    }

};

export const clearContent = () => {
    elements.content.innerHTML = "";
};

export const deleteMessage = id => {
    $('li[data-id="' + id + '"]').remove();
};

export const createDocumentForm = (data) => {

    const markup = `
    <form onsubmit="return false;" id="doc-form">
                            <div class="detail">
                                <div class="description">
                                    <label for="title"><h4 class="mbs heading-2">Jméno</h4></label>
                                    <p class="paragraph"><input type="text" placeholder="Jméno žadatele" id="name" class="search__inputg" required minlength="3" maxlength="15" autocomplete="off"/></p>
                                    <label for="title"><h4 class="mbs heading-2">Příjmení</h4></label>
                                    <p class="paragraph"><input type="text" placeholder="Příjmení žadatele" id="surname" class="search__inputg" required minlength="3" maxlength="15" autocomplete="off"/></p>
                                    <label for="title"><h4 class="mbs heading-2">Rodné číslo</h4></label>
                                    <p class="paragraph"><input type="text" placeholder="Rodné číslo" id="rc" class="search__inputg" required minlength="3" maxlength="15" autocomplete="off" pattern="^[0-9]{6}\/[0-9]{4}$"/></p>
                                    <label for="textarea"><h4 class="mbs heading-2">Popis</h4></label>
                                    <p class="paragraph" id="doc_description">
                                        <textarea rows="5" cols="75" placeholder="Popis případu" id="textarea" class="textareag" required minlength="3" maxlength="255"></textarea>
                                    </p>
                                    <label class="mbs" for="cre_endtime"><h4 class="heading-2 mbs">Dostupnost šetření</h4></label>
                                    <p class="paragraph">
                                    <p class="paragraph flex2"><img src="img/start.svg" class="side-nav__icon"/> <span><input type="date" id="cre_start"  class="date__input" required /> <input type="time" class="date__input" id="cre_starttime" required/></span></p>
                                    <p class="paragraph doc-error" id="start-error"></p>
                                    <p class="paragraph flex2"><img src="img/stop.svg" class="side-nav__icon"/> <span> <input type="date" class="date__input" id="cre_end" required /> 
                                    <input type="time" class="date__input" id="cre_endtime" required/></span>
                                    <p class="paragraph doc-error" id="end-error"></p>
                                    </p>
                                    
                                    </p>
                                    <label class="mbs" for="file"><h4 class="heading-2 mbs">Přilozené šetření</h4></label>
                                    <p class="paragraph">
                        
                                        <input type="file" id="file" accept="application/pdf" required/>
                                    </p>
                                    <label class="mbs" for="cre_startapp"><h4 class="heading-2 mbs">Schvalování do:</h4></label>
                                    <p class="paragraph">
                                    <p class="paragraph flex2"><img src="img/stop.svg" class="side-nav__icon"/> <span><input type="date"  class="date__input" id="cre_startapp" required/> <input type="time" class="date__input" id="cre_starttimeapp" required/></span></p>
                                    <p class="paragraph doc-error" id="app-error"></p>
                                    </p>
                                    <p class="paragraph">
                                        <label class="mbs" for="aprovalls"><h2 class="heading-2 mbs">Vyberte schvalovatele případu </h2></label>
                    
                                        <select name="approvalls" id="dropdown" required class="selectg">
 
                                        </select>
                                        <p class="paragraph doc-error" id="group-error"></p>
                                    </p>
                                    <p class="paragraph">
                                            <label class="mbs" for="dropdown_"><h2 class="heading-2 mbs">Vyberte, kdo se má s případem seznámit</h2></label>
                                            <select name="readers" id="dropdown_" required class="selectg">
  
                                            </select>
                                            <p class="paragraph doc-error" id="conf-error"></p>
                                        </p>
                                    <p class="paragraph">
                                        <div class="btn-layer">
                                            <button class="btn btn-doc btn--green">Potvrdit</button>
                                        </div>
                                    </p>                            
                                </div>
                            </div>    
                        </form>

    `;

    elements.content.insertAdjacentHTML("beforeend", markup);

    for (var i = 0; i < data.length; i++) {
        $('#dropdown').append(`<option value="${xssFilters.inDoubleQuotedAttr(data[i].id)}">${xssFilters.inHTMLData(data[i].name)}</option>`);
        $('#dropdown_').append(`<option value="${xssFilters.inDoubleQuotedAttr(data[i].id)}">${xssFilters.inHTMLData(data[i].name)}</option>`);
    }
    //  $("#dropdown_").prepend(`<option value="0">Všichni</option>`);
};

const formatTimeForMessages = time => {
    var localeDate = new Date(time).toLocaleDateString();

    return localeDate.replace(/ +/g, "");;
};

const formatTimeForPost = time => {
    var year = time.substring(0, 4);
    var month = time.substring(5, 7);
    var day = time.substring(8, 10);

    var hours = time.substring(11, 13);
    var mins = time.substring(14, 16);

    var final = day + "/" + month + "/" + year + " " + hours + ":" + mins;
    var final2 = new Date(time).toLocaleDateString() + " " + new Date(time).toLocaleTimeString();
    var final3 = final2.slice(0, -3);


    return final3;
};

const getPdfById = id => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', proxy + "documents/" + parseInt(id), true);
    xhr.responseType = 'arraybuffer';
    xhr.setRequestHeader("Authorization", 'bearer ' + sessionStorage.access_token);
    xhr.onload = function(e) {
        if (this.status === 200) {
            var blob = new Blob([this.response], { type: "application/pdf" });
            var link = document.getElementById("pdf-link");
            link.href = window.URL.createObjectURL(blob);

        }
        if (this.status === 401) {
            refreshToken();
            setTimeout(() => {
                getPdfById(id);
            }, 300);
        }
    };
    xhr.send();
};

export const clearMessages = () => {
    $("#side-nav-msgs").empty();
};


export const removeElementById = id => {
    const url = `div[data-id=${id}]`;


    $(url).remove();
};



export const createGroupForm = () => {
    const markup = `<div class="doc_form" id="doc-form">
    <label for="search" id="search-label">Search</label>
    <input type="text" id="search" required placeholder="Email of user" autocomplete="off">
    <button class="btn btn--green" id="groupCreation-btn">Send</button>

    <label for="title" id="title-label">Title</label>
    <input type="text" id="title" required placeholder="Title" autocomplete="off">
    <h3 id="users_in_g">Users in group</h3>
    <div class="users_in_group">
        
    </div>

    <button class="btn" id="groupCreation">Potvrdit</button>

  </div>`;

    elements.content.insertAdjacentHTML("beforeend", markup);
};

export const renderUser = (data) => {
    for (var i = 0; i < data.length; i++) {
        const markup = `<li class="side-nav__item msg-item" id="msg_item" data-id="${xssFilters.inDoubleQuotedAttr(data[i].id)}">
      <a href="#" class="side-nav__link" id="msg_link">
          <img src="img/plus.svg" class="side-nav__icon" id="msg_icon">
          </img>
          <div class="msg-data" id="msg_data">
          <span class="msg-title" id="msg_title">${xssFilters.inHTMLData(data[i].surname)} ${xssFilters.inHTMLData(data[i].firstName)}</span>
          </div>
      </a>
  </li>`;

        elements.side_msgs.insertAdjacentHTML("beforeend", markup);
    }
};

export const addUserToGroup = (objectClicked, group) => {
    let markup = "";
    if (group.length > 1) {
        markup = `<span>${xssFilters.inHTMLData(objectClicked.firstName)} ${xssFilters.inHTMLData(objectClicked.surname)}, </span>`;
    } else if (group.length === 1) {
        markup = `<span>${xssFilters.inHTMLData(objectClicked.firstName)} ${xssFilters.inHTMLData(objectClicked.surname)}</span>`;
    }

    $(".users_in_group").prepend(markup);
};

export const renderHistoryForm = (type) => {

    const currentYear = new Date().getFullYear();
    const max = currentYear + 100;
    const min = currentYear - 100;
    const currentMonth = new Date().getMonth() + 1;

    let id = "";
    let markup = "";

    if (type === 2) {
        id = "yourdocs-form";
        markup = `<label for="title" class="hf_label"><h4>Vyhledávání nahraných šetření</h4>
        <p class="paragraph margin-top">Zde lze provést vyhledávání Vašich nahraných sociálních šetření</p>`;
    } else if (type === 1) {
        id = "history-form";
        markup = `<label for="title" class="hf_label"><h4>Hledáte předešlá šetření?</h4>
        <p class="paragraph margin-top">Zde můžete vyhledat všechna předešla šetření, která byla s Vámi sdílena.</p>`;
    } else {
        id = "delete-doc-form";
        markup = `<label for="title" class="hf_label"><h4>Hledáte všechna šetření?</h4>
        <p class="paragraph margin-top">Zde můžete vyhledávat mezi všema vytvořenými šetřeními.</p>`;
    }

    const markupy = `
    <form onsubmit="return false;" id="${id}">
                            <div class="detail">
                                <div class="description">
                                        ${markup}
                                   <p class="paragraph double">
                                   <span class="hf_title">Zvolte rok</span> <input class="hf_input date__input"  type="number" min="${min}" max="${max}" step="1" value="${currentYear}" id="year" required/> 
                                   </p>
                                   <p class="paragraph double">
                                   <span class="hf_title">Zvolte měsíc</span>  <input type="number" id="month" class="hf_input date__input" min="1" max="12" step="1" value="${currentMonth}" required /> 
                                   </p>
                                    <p class="paragraph">
                                        <div class="btn-layer">
                                            <button class="btn btn-doc">Potvrdit</button>
                                        </div>
                                    </p>                            
                                </div>
                            </div>    
                        </form>

    `;


    $(".content").append(markupy);
};


export const renderDeleteDocumentForm = (type) => {
    const markupy = `
    <form onsubmit="return false;" id="${id}">
                            <div class="detail">
                                <div class="description">
                                        ${markup}
                                   <p class="paragraph double">
                                   <span class="hf_title">Vyberte rok</span> <input class="hf_input date__input"  type="number" min="${min}" max="${max}" step="1" value="${currentYear}" id="year" required/> 
                                   </p>
                                   <p class="paragraph double">
                                   <span class="hf_title">Select month</span>  <input type="number" id="month" class="hf_input date__input" min="1" max="12" step="1" value="${currentMonth}" required /> 
                                   </p>
                                    <p class="paragraph">
                                        <div class="btn-layer">
                                            <button class="btn btn-doc">Potvdit</button>
                                        </div>
                                    </p>                            
                                </div>
                            </div>    
                        </form>

    `;
};

export const renderYourHistoricalDocument = data => {

    var dfu = data.documentsForUsers;

    var user = dfu.find(el => el.user.email == data.email);

    let app = "";

    if (user.approval === 1 && user.sharingType.id === 1) {
        app = `<img src="img/agree.svg" class="side-nav__icon "/> Šetření bylo Vámi schváleno.`;
    } else if (user.approval === 0 && user.sharingType.id === 1) {
        app = `<img src="img/disagree.svg" class="side-nav__icon "/> Šetření bylo Vámi neschváleno.`
    } else if (user.approval === 1 && user.sharingType.id === 2) {
        app = `<img src="img/book.svg" class="side-nav__icon "/> Toto šetření bylo Vámi potvrzeno.`;
    } else {
        app = `<img src="img/unread.svg" class="side-nav__icon "/> Na toto šetření jste nereagoval/a.`
    }

    const markupx = `
    <div class="overview">
    <h1 class="overview__heading" id="doc_title">
        ${xssFilters.inHTMLData(data.csurname)}
    </h1>

    <div class="overview__date" id="doc_uploadDate">
        <span>${xssFilters.inHTMLData(formatTimeForPost(data.uploadDatetime))}</span>
    </div>

    <div class="overview__postedBy">
        <svg class="overview__icon-location">
            <use xlink:href="img/sprite.svg#icon-location-pin"></use>
        </svg>
        <button class="btn-inline" id="createdBy">${xssFilters.inHTMLData(data.user.firstName)} ${xssFilters.inHTMLData(data.user.surname)}</button>
    </div>
</div>

<div class="detail">
    <div class="description border-left noflex">
        <h4 class="heading-2 mbs">Rodné číslo žadatele</h4>
        <p class="paragraph" id="doc_description">
            ${xssFilters.inHTMLData(data.pid)}
        </p>
        <h4 class="heading-2 mbs">Popis šetření</h4>
        <p class="paragraph" id="doc_description">
            ${xssFilters.inHTMLData(data.description)}
        </p>
        <h4 class="heading-2 mbs">Dostupnost přístupu k šetření</h4>
        <p class="paragraph">
             <span id="date_start">${formatTimeForPost(xssFilters.inHTMLData(data.activeStartTime))}</span> - <span id="date_end">${formatTimeForPost(xssFilters.inHTMLData(data.activeEndTime))}.</span>
        </p>
        <h4 class="heading-2 mbs">Přístup k šetření</h4>
        <p class="paragraph">
            <a href="#" class="btn-inline no-inline" id="pdf-link">Zobrazit šetření</a>
        </p>
    </div>
    </div>    
<div class="detail">
    <div class="description noflex border-left">
    <h4 class="heading-2 mbb">Schvalování</h4>
        <p class="paragraph flex">
            ${app}
        </p>
</div>  
    `;

    getPdfById(data.id);
    elements.content.insertAdjacentHTML("beforeend", markupx);
};


export const removeActiveClassFromMessages = () => {
    $("#side-nav-msgs .side-nav__item--active").removeClass("side-nav__item--active");
}

export const removeActiveClassFromNavigation = () => {
    $("#side-nav-main .side-nav__item--active").removeClass("side-nav__item--active");
}

export const clearUpdateForm = () => {
    document.getElementById("user-form").innerHTML = "";
};

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};