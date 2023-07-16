const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Contact extends Model {
        static associate(models) {
            // define association here
        }
    }
    Contact.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            linkedId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            linkPrecedence: {
                type: DataTypes.ENUM('secondary', 'primary'),
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Contact',
            tableName: 'contacts', // Specify the actual table name in the database
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );
    return Contact;
}


