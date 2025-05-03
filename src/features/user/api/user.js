import { api2 } from "@/plugins/axios";


export function registerUser(data){
    return api2.post('/users/register', data)
}