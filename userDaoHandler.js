// userDAOHandler.js
const { Contact } = require('./models');
const { Op } = require('sequelize');

// Placeholder implementation for getting complete record from the database based on email and phoneNumber
const getCompleteRecord = (email, phoneNumber) => {
    // TODO: Implement database query to retrieve complete record based on email and phoneNumber
    // Example using Sequelize:
    return Contact.findOne({
        where: {
            email,
            phoneNumber,
            linkPrecedence: 'primary'
        },
    });
};

// Placeholder implementation for getting partial record from the database based on email and phoneNumber
const getPartialRecord = (email, phoneNumber) => {
    // TODO: Implement database query to retrieve partial record based on email and phoneNumber
    // Example using Sequelize:
    return Contact.findAll({
        where: {
            [Op.or]: [{ email }, { phoneNumber }],
            linkPrecedence: 'primary'
        },
        order: [['createdAt', 'ASC']],
    });
};

// Placeholder implementation for inserting a record into the database
const insertRecord = (recordData) => {
    // TODO: Implement database query to insert a record into the database
    // Example using Sequelize:
    return Contact.create(recordData);
};

// Placeholder implementation for getting record IDs from the database based on email and phoneNumber
const getIdsFromEmailPhone = (email, phoneNumber) => {
    // TODO: Implement database query to retrieve record IDs based on email and phoneNumber
    // Example using Sequelize:
    return Contact.findAll({
        attributes: ['id'],
        where: {
            [Op.or]: [{ email }, { phoneNumber }],
        },
    });
};

// Placeholder implementation for getting record IDs from the database based on provided IDs
const getIdsFromIds = (ids) => {
    console.log("inside getIds from ids==", ids)
    // TODO: Implement database query to retrieve record IDs based on provided IDs
    // Example using Sequelize:
    return Contact.findAll({
        // attributes: ['id'],
        where: {
            id: {
                [Op.in]: ids
            }
        },
        order: [['createdAt', 'ASC']],
    });
};

// Placeholder implementation for getting records from the database based on provided IDs
const getRecordsByIds = (ids) => {
    // TODO: Implement database query to retrieve records based on provided IDs
    // Example using Sequelize:
    return Contact.findAll({
        where: {
            id: ids,
        },
    });
};

module.exports = {
    getCompleteRecord,
    getPartialRecord,
    insertRecord,
    getIdsFromEmailPhone,
    getIdsFromIds,
    getRecordsByIds,
};
