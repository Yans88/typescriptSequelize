'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Roles', [
            {
                role_name: 'Super Admin',
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            }, {
                role_name: 'Admin',
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            }, {
                role_name: 'User',
                active: false,
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Roles', null, {});
    }
};
