import {DataTypes, Model, Optional} from "sequelize";
import connection from "../../config/dbConnect";

interface RoleAttributes {
    id?: number,
    role_name?: string | null,
    active?: boolean | null
    created_at?: Date,
    updated_at?: Date
}

export interface RoleInput extends Optional<RoleAttributes, 'id'> {
}

export interface RoleOutput extends Required<RoleAttributes> {
}

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
    public id!: number;
    public role_name!: string;
    public active!: boolean;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Role.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    role_name: {
        allowNull: true,
        type: DataTypes.STRING
    },
    active: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize: connection,
    underscored: true,
    timestamps: true
});

export default Role;