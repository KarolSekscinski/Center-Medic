import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    err: ServerError | null = null;
    token: string | null = localStorage.getItem('jwt');
    appLoaded = false;
    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('jwt', token);
                } else {
                    localStorage.removeItem('jwt');
                }
            }
        )
        
    }
    setServerError(error: ServerError) {
        this.err = error;
    }
    setToken = (token: string | null) => {
        
        this.token = token;
    }
    setAppLoaded = () => {
        this.appLoaded = true;
    }
    
}