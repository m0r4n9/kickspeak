export interface Brand {
    id: string;
    name: string;
    foundation?: string;
    country?: string;
    logo?: string;

    hasProducts?: boolean;
}
