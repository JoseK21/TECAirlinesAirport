export interface Flight {
    depart_ap: string;
    arrival_ap: string;
    flight_id: string;
    depart_date: string;
    plane_model: string;
    status: string;
    normal_price: number;
    fc_price: number;
    seats_left: number;
    fc_seats_left: number;
}
