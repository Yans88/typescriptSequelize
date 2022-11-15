import {Request, Response} from "express";
import Helper from "../helpers/Helper";
import User from "../db/models/User";
import PasswordHelper from "../helpers/PasswordHelper";

const Register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {name, email, password, confirm_password} = req.body;
        const passEncrypt = await PasswordHelper.encrypt(password);

        const user = await User.create({
            name, email, password: passEncrypt, active: true, verified: true, role_id: 1
        });
        return res.status(201).send(Helper.responseData(201, 'ok', user));
    } catch (err: any) {
        if (err != null && err instanceof Error) {
            return res.status(500).send(Helper.responseData(500, err.message, err));
        } else {
            return res.status(500).send(Helper.responseData(500, "internal server error", err));
        }
    }
}

export default {Register};