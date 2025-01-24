import { IntResponse } from "../Response";

export interface IntResProducts extends IntResponse {
    data: IntProduct[]
}

export interface IntProduct {
    id?:            number;
    name:           string;
    description:    string;
    image?:         string;
    price:          number;
    quantity:       number;
    status:         number;
    category_id:    number;
    user_id?:       number;
    created_at?:    Date;
    updated_at?:    Date;
    category?:      string;
    status_label?:  string;
    can_modify?:    boolean;
}