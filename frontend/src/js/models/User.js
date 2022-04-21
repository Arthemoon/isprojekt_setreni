import { proxy } from '../config';
import * as documentView from '../views/documentView';
import "jquery";


export default class User {
    constructor(email, role){
        this.email = email;
        this.role = role;
    }
}