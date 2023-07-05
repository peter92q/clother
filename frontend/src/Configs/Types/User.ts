import { Basket } from "./Basket";

export interface User {
    id: string;
    email: string;
    token: string;
    basket?: Basket;
}