import { elements } from './base';
import { proxy } from "../config";
import { refreshToken } from './base';
import * as xssFilters from "../xssFilters";

export const fillGroups = data => {
    for (var i = 0; i < data.length; i++) {
        const markup = `<li class="side-nav__item msg-item" id="msg_item" data-id="${xssFilters.inDoubleQuotedAttr(data[i].id)}">
      <a href="#" class="side-nav__link" id="msg_link">
          <img src="img/group.svg" class="side-nav__icon" id="msg_icon">
          </img>
          <div class="msg-data" id="msg_data">
          <span class="msg-title" id="msg_title">${xssFilters.inHTMLData(data[i].name)}</span>
          </div>
      </a>
  </li>`;

        elements.side_msgs.insertAdjacentHTML("beforeend", markup);
    }
}

export const renderYourGroup = object => {
    var users = object.users;

    const markup2 = `
    <div class="group_content" id="group_content_" data-id="${xssFilters.inDoubleQuotedAttr(object.id)}">
    <div class="gc_search_div">
        <input type="text" id="gc_email" class="search__inputg" placeholder="Příjmení uživatele" autocomplete="off">
        <button class="search__buttong" id="find_user">
        <img class="search__icon" src="img/glass.svg">
                           
        </img>
        </button>
    </div>
    <form id="ugf_" onsubmit="return false;">
    <div class="gc_header">
    <input type="text" class="search__inputg nomargin" id="gc_title" value="${xssFilters.inDoubleQuotedAttr(object.name)}" minlength="3" maxlength="40" readonly autocomplete="off">
    <div class="gc_imgs">
        <img class="gc_img" id="gc_delete" src="img/delete.svg"/>
        <img class="gc_img" id="gc_update" src="img/update.svg"/>
    </div>
    </div>
    <div class="group_users">
        <div class="container__card">
            <div class="card">
                    <div class="card--picture card__picture--1">
                        
                    </div>
                    <h4 class="heading card__heading-span--1" id="group_name">
                        ${xssFilters.inHTMLData(object.name)}
                    </h4>
                    <div class="card__details">
                        
            </div>
            </div>
    </div>
    </div>
   
    <div class="btn_cont">
        <button class="btn" id="btn_update_group">Potvrdit</button>
    </div>
    </form>
</div>  
    `;

    elements.content.insertAdjacentHTML("beforeend", markup2);

    for (var i = 0; i < users.length; i++) {
        const markup2 = `
        <div class="group_user" data-id="${xssFilters.inDoubleQuotedAttr(users[i].id)}">
        <span class="group_name">${xssFilters.inHTMLData(users[i].firstName)} ${users[i].surname}</span>
        <img src="img/delete.svg" class="gc_img2" id="delete_user_group"/>
        </div>
        `;

        $(".card__details").append(markup2);
    }
};

export const addUserToGroup = (data) => {
    $("#g_info").hide();
    const markup2 = `
        <div class="group_user" data-id="${xssFilters.inDoubleQuotedAttr(data.id)}">
        <span class="group_name">${xssFilters.inHTMLData(data.firstName)} ${xssFilters.inHTMLData(data.surname)}</span>
        <img src="img/delete.svg" class="gc_img2" id="delete_user_group"/>
        </div>
        `;

    $(".card__details").append(markup2);
    $(".gc_img2").show();
};

export const createGroupForm = () => {

    $(".content").css("background-color", "white");

    const markupy = `
    <div class="group_content" id="group_content_">
                                <div class="gc_search_div">
                                <input type="text" id="gc_email" class="search__inputg" placeholder="Příjmení uživatele" autocomplete="off">
                                <button class="search__buttong" id="find_user">
                                <img class="search__icon" src="img/glass.svg">
                           
                                </img>
                                                                    </button>
                                </div>
                                <form id="cgf" class="cgf_class" onsubmit="return false;">
                                <div class="gc_search_div">
                                    <input type="text" class="search__inputg" id="title" required placeholder="Název skupiny" maxlength="40" minlength="3" autocomplete="off">
                                </div>
                                <div class="container__card">
                                        <div class="card">
                                                <div class="card--picture card__picture--1">
                                                    
                                                </div>
                                                <h4 class="heading card__heading-span--1" id="group_name">
                                                    Název skupiny
                                                </h4>
                                                <div class="card__details gray">
                                                    
                                        </div>
                                        </div>
                                <div class="btn_cont">
                                     <button class="btn btn--green" id="groupCreation">Potvrdit</button>
                                </div>
                                </form>
                                </div>

    `;

    elements.content.insertAdjacentHTML("beforeend", markupy);

    $(".gc_search_div").css("display", "flex");
};