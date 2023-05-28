import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    err: ServerError | null = null;
    /**
     *
     */
    constructor() {
        makeAutoObservable(this);
        
    }
    setServerError(error: ServerError) {
        this.err = error;
    }
}