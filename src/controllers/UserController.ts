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

const UserLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email: email}});
        if (user) {
            const matched = await PasswordHelper.decrypt(password, user.password);
            if (matched) {
                const dataUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role_id: user.role_id,
                    verified: user.verified,
                    active: user.active,
                }
                const token = Helper.generateToken(dataUser);
                const refreshToken = Helper.generateRefreshToken(dataUser);
                user.access_token = refreshToken;
                await user.save();
                res.cookie('refresh_token', refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 100
                });
                const responseUser = {
                    ...dataUser,
                    token: token
                }
                return res.status(200).send(Helper.responseData(200, 'ok', responseUser));
            }
        }
        return res.status(401).send(Helper.responseData(401, 'unauthorized', ""));
    } catch (err: any) {
        if (err != null && err instanceof Error) {
            return res.status(500).send(Helper.responseData(500, err.message, err));
        } else {
            return res.status(500).send(Helper.responseData(500, "internal server error", err));
        }
    }
}

export default {Register, UserLogin};