import {DataTypes, Model, Optional} from "sequelize";
import connection from "../../config/dbConnect";

interface UserAttributes {
    id?: number,
    name?: string | null,
    email?: string | null,
    password?: string | null,
    access_token?: string | null,
    role_id?: number | null,
    verified?: boolean | null
    active?: boolean | null
    created_at?: Date,
    updated_at?: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'> {
}

export interface UserOutput extends Required<UserAttributes> {
}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public access_token!: string;
    public role_id!: number;
    public verified!: boolean;
    public active!: boolean;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

User.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.TEXT
    },
    role_id: {
        type: DataTypes.BIGINT
    },
    access_token: {
        type: DataTypes.TEXT
    },
    verified: {
        type: DataTypes.BOOLEAN
    },
    active: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize: connection,
    underscored: true,
    timestamps: true
});

export default User;