import { elements } from './base';
import { proxy } from "../config";
import * as xssFilters from "../xssFilters";

export const setInitialInformation = (currentUser) => {
    elements.email.textContent = xssFilters.inHTMLData(currentUser.email);
};

export const userCreationForm = data => {
    const markupx = `
    <form id="u_cf" onsubmit="return false;">
      <div class="detail">
      <div class="description">
          <p class="paragraph">
            <input type="text" placeholder="Jméno" id="firstName" class="search__inputg" required minlength="3" maxlength="40" autocomplete="off"/>
          </p>
          <p class="paragraph">
            <input type="text" placeholder="Příjmení" id="surname" class="search__inputg" required minlength="3" maxlength="40" autocomplete="off"/>
          </p>
          <p class="paragraph">
            <input type="email" placeholder="Email" id="email" class="search__inputg" required minlength="3" maxlength="40" autocomplete="off"/>
          </p>
          <p class="paragraph">
          <input type="password" placeholder="Heslo" id="psw1" class="search__inputg" required minlength="3" maxlength="40" autocomplete="off"/>
        </p>
        <p class="paragraph">
        <input type="password" placeholder="Heslo znova" id="psw2" class="search__inputg" required minlength="3" maxlength="40" autocomplete="off"/>
      </p>
      <p class="paragraph hide" id="psw_error">
        <span class="warning">Hesla se neshodují. Je vyžadováno: alespon jedno velké písmeno, speciální znak, číslice. Heslo musí být dlouhé minimálně 8 znaků.</span>
      </p>
        <p class="paragraph">
        <label for="roles_user"><h4 class="heading-2 mbs">Zvolte role pro uživatele</h4>
        <select name="select" id="roles_user" multiple required class="slct selectg selectium">
          
      </select>
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

    elements.content.insertAdjacentHTML("beforeend", markupx);

    for (var i = 0; i < data.length; i++) {
        var string = xssFilters.inHTMLData(data[i].authority.toLowerCase());
        $('#roles_user').append(`<option value="${xssFilters.inDoubleQuotedAttr(data[i].authority)}">${string.charAt(0).toUpperCase() + string.slice(1)}</option>`);
    }


};


export const createUpdateForm = () => {

    const markupy = `
    
      <div class="gc_header">
      <input type="text" class="search__inputg" id="update_input" minlength="3" maxlength="40" placeholder="Příjmení uživatele" autocomplete="off">
      <button class="search__buttong" id="update_btn">
      <img class="search__icon" src="img/glass.svg">
                           
                                </img>
  </button>
      </div>
      <form onsubmit="return false;" id="user-form">

      </form>
    `;

    elements.content.insertAdjacentHTML("beforeend", markupy);
    $("#u_delete").hide();
};


export const showRestOfTheForm = data => {
    var active = data.active;

    const markup = `
  <div class="detail pless">
      </div>
      <div class="description">
          <label for="title"><h4 class="heading-2">Jméno</h4>
          <p class="paragraph"><input type="text" class="search__inputg" placeholder="Firstname" id="firstName" required minlength="3" maxlength="40" autocomplete="off"/></p>
          <label for="textarea"><h4 class="heading-2">Příjmení</h4></label>
          <p class="paragraph" id="doc_description">
            <input type="text" placeholder="Jméno" class="search__inputg" id="surname" required minlength="3" maxlength="40" autocomplete="off"/>
          </p>
          <label for="cre_endtime"><h4 class="heading-2">Email</h4></label>
          <p class="paragraph">
            <input type="text" placeholder="Email" class="search__inputg" id="email" required minlength="3" maxlength="40" autocomplete="off"/>
          </p>
          <p class="paragraph">
                  <label for="roles"><h4 class="heading-2">Select roles for user</b></label>
                  <select name="select" id="roles" multiple required class="selectium">
                  
                  </select>
              </p>
          <p class="paragraph">
              <div class="btn-layer">
                  <button class="btn btn-doc">Aktualizovat</button>
                  <button class="btn" id="deactiveUser">${active == true ? "Deaktivace" : "Aktivace"}</button>
              </div>
          </p>                            
      </div>
  </div>    
  `;

    $("#user-form").append(markup);

    for (var i = 0; i < data.rolesb.length; i++) {
        var string = xssFilters.inHTMLData(data.rolesb[i].authority.toLowerCase());
        $('#roles').append(`<option value="${xssFilters.inDoubleQuotedAttr(data.rolesb[i].authority)}">${string.charAt(0).toUpperCase() + string.slice(1)}</option>`);
    }
};

export const changePassword = () => {
    const markupx = `
    <form id="changePassword" onsubmit="return false;">
      <div class="detail">
      <div class="description">
          <p class="paragraph">
            <input type="password" placeholder="Staré heslo" id="previousPsw1" class="search__inputg" required minlength="3" maxlength="40" autocomplete="off"/>
          </p>
          <p class="paragraph">
          <input type="password" placeholder="Staré heslo znovu" id="previousPsw2" class="search__inputg" required minlength="3" maxlength="40" autocomplete="off"/>
          </p>
          <p class="paragraph">
            <input type="password" placeholder="Nové heslo" id="newPsw1" class="search__inputg" required minlength="3" maxlength="40" autocomplete="off"/>
          </p>
          <p class="paragraph">
            <input type="password" placeholder="Nové heslo znovu" id="newPsw2" class="search__inputg" required minlength="3" maxlength="40" autocomplete="off"/>
        </p>
      <p class="paragraph hide" id="psw_error">
        <span class="warning">Passwords do not match or do not satisfy requirments - at least 1 capital letter, special character, number. Password must be at least 8 characters long.</span>
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

    elements.content.insertAdjacentHTML("beforeend", markupx);
};