import Validator from "validatorjs";
import {NextFunction, Request, Response} from "express";
import Helper from "../../helpers/Helper";
import User from "../../db/models/User";

const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password, confirm_password} = req.body;

        const data = {
            name,
            email,
            password,
            confirm_password
        };

        const rules: Validator.Rules = {
            "name": "required|string|max:50",
            "email": "required|email",
            "password": "required|min:8",
            "confirm_password": "required|same:password"
        };

        const validate = new Validator(data, rules);

        if (validate.fails()) {
            return res.status(400).send(Helper.responseData(400, "bad request", validate.errors));
        }

        const user = await User.findOne({
            where: {
                email: data.email
            }
        });

        if (user) {
            const errorData = {
                errors: {
                    email: [
                        "email already used"
                    ]
                }
            };
            return res.status(400).send(Helper.responseData(400, "bad request", errorData))
        }
        next();
    } catch (error: any) {
        return res.status(500).send(Helper.responseData(500, "", error));
    }

};

export default {RegisterValidation};