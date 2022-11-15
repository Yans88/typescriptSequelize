import {Request, Response} from "express";
import Role from "../db/models/Role";

const GetRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const roles = await Role.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send({
            status: 200, message: 'ok', data: roles
        })
    } catch (err: any) {
        if (err != null && err instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: err.message,
                data: err
            });
        } else {
            return res.status(500).send({
                status: 500,
                message: "internal server error",
                data: err
            })
        }
    }
}

const CreateRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {role_name, active} = req.body;
        const create = await Role.create({role_name, active});
        return res.status(201).send({
            status: 201,
            message: 'ok',
            data: create
        });
    } catch (err: any) {
        if (err != null && err instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: err.message,
                data: err
            });
        } else {
            return res.status(500).send({
                status: 500,
                message: "internal server error",
                data: err
            })
        }
    }
}

const UpdateRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const {role_name, active} = req.body;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).send({
                status: 404,
                message: 'not found',
                data: ""
            });
        }
        role.role_name = role_name;
        role.active = active;
        await role.save();
        return res.status(200).send({
            status: 200,
            message: 'ok',
            data: role
        });
    } catch (err: any) {
        if (err != null && err instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: err.message,
                data: err
            });
        } else {
            return res.status(500).send({
                status: 500,
                message: "internal server error",
                data: err
            })
        }
    }
}

const DeleteRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).send({
                status: 404,
                message: 'not found',
                data: ""
            });
        }
        await role.destroy();
        return res.status(200).send({
            status: 200,
            message: 'ok',
            data: ''
        });
    } catch (err: any) {
        if (err != null && err instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: err.message,
                data: err
            });
        } else {
            return res.status(500).send({
                status: 500,
                message: "internal server error",
                data: err
            })
        }
    }
}

const GetRoleById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).send({
                status: 404,
                message: 'not found',
                data: ""
            });
        }
        return res.status(200).send({
            status: 200,
            message: 'ok',
            data: role
        });
    } catch (err: any) {
        if (err != null && err instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: err.message,
                data: err
            });
        } else {
            return res.status(500).send({
                status: 500,
                message: "internal server error",
                data: err
            })
        }
    }
}

export default {GetRole, CreateRole, UpdateRole, DeleteRole, GetRoleById};