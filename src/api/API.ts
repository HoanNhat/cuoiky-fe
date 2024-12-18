import { BaseApi } from './BaseApi';

export const login = async (values: any) => {
    const api = new BaseApi();
    const res = await api.post("/login", values);
    return res.data; 
};

export const getAllEmployees = async (username:any, password:any) => {
    const api = new BaseApi();
    const queryParams = {
        username,
        password,
    };
    const res = await api.get("/employees", { params: queryParams });
    return res.data;
};

export const insert = async (username:any, pass:any,values: any) => {
    const api = new BaseApi();
    const res = await api.post(`/employees?username=${username}&password=${pass}`, values);
    return res.data; 
};

export const update = async (username:any, pass:any,values: any) => {
    const api = new BaseApi();
    const res = await api.put(`/employees?username=${username}&password=${pass}`, values);
    return res.data; 
};


export const deleteEmployee = async (username:any, password:any, empid:any) => {
    const api = new BaseApi();
    const queryParams = {
        username,
        password,
        empid
    };
    const res = await api.delete("/employees", { params: queryParams });
    return res.data;
};

export const getAudit = async (username:any, password:any) => {
    const api = new BaseApi();
    const queryParams = {
        username,
        password,
    };
    const res = await api.get("/audit", { params: queryParams });
    return res.data;
};