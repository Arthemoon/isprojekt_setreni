import { proxy } from '../config';
import * as documentView from '../views/documentView';
import "jquery";

export class Document {
    
    constructor(id, title, desc){
        this.id = id;
        this.title = title;
        this.desc = desc;
    }

};