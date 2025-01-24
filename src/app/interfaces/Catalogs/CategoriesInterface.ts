import { IntResponse } from "../Response";

export interface IntResCategories extends IntResponse {
    data: IntCategories[]
}

export interface IntCategories {
    id?:            number;
    description:    string;
    status:         number;
    created_at?:    Date;
    updated_at?:    Date;
    status_label?:  string;
}