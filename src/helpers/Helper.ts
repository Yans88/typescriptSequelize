import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface UserData {
    id: number | null,
    name: string | null,
    email: string | null,
    role_id: string | null,
    verified: boolean | null,
    active: boolean | null
}

const responseData = (status: number, message: string | null, data: any | null) => {
    const response = {
        status: status,
        message: message,
        data: data
    }
    return response;
}

const generateToken = (data: any): string => {
    return jwt.sign(data, process.env.JWT_KEY as string, {expiresIn: "120m"});
}

const generateRefreshToken = (data: any): string => {
    return jwt.sign(data, process.env.JWT_KEY_REFRESH_TOKEN as string, {expiresIn: "1d"});
}

const getDataToken = (token: any): UserData | null => {
    const secretKey: string = process.env.JWT_KEY as string;
    let resData: any;
    const res = jwt.verify(token, secretKey, (err: any, decode: any) => {
        if (!err) {
            resData = decode;
        } else {
            resData = "";
        }
    });
    if (resData) {
        const result: UserData = <UserData>(resData);
        return result;
    }
    return null;
}

const getDataRefreshToken = (token: any): UserData | null => {
    const secretKey: string = process.env.JWT_KEY_REFRESH_TOKEN as string;
    let resData: any;
    const res = jwt.verify(token, secretKey, (err: any, decode: any) => {
        if (!err) {
            resData = decode;
        } else {
            resData = "";
        }
    });
    if (resData) {
        const result: UserData = <UserData>(resData);
        return result;
    }
    return null;
}

export default {responseData, generateToken, generateRefreshToken, getDataToken, getDataRefreshToken};