require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
const userDAOHandler = require('./userDaoHandler');
const { Contact } = require('./models');

// Middleware for parsing JSON request body
app.use(express.json());


app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const { Op } = require('sequelize');



app.post('/identify', async (req, res) => {
    const { email, phoneNumber } = req.body;

    try {

        const primaryAccounts = await Contact.findAll({
            where: {
                [Op.or]: [{ email }, { phoneNumber }],
                linkPrecedence: 'primary'
            },
            order: [['createdAt', 'ASC']],
        });
        if (!primaryAccounts.length) {

            const checkSecondary = await Contact.findOne({
                where: {
                    [Op.or]: [{ email }, { phoneNumber }],
                    linkPrecedence: 'secondary'
                }
            })
            if (checkSecondary) {
                // find primary for this secondary and return
                const primaryContact = await Contact.findOne({
                    where: {
                        id: checkSecondary.linkedId
                    }
                })
                // find all secondary for this primary
                const allSecondary = await Contact.findAll({
                    where: {
                        linkedId: primaryContact.id
                    }
                })
                const uniqueEmails = new Set();
                const uniquePhoneNumbers = new Set();
                const secondaryContactIds = new Set();
                uniqueEmails.add(primaryContact.email);
                uniquePhoneNumbers.add(primaryContact.phoneNumber);
                for (const record of allSecondary) {
                    uniqueEmails.add(record.email);
                    uniquePhoneNumbers.add(record.phoneNumber);
                    secondaryContactIds.add(record.id)
                }
                return res.status(200).json(
                    {
                        primaryContactId: primaryContact.id,
                        emails: [...uniqueEmails],
                        phoneNumbers: [...uniquePhoneNumbers],
                        secondaryContactIds: [...secondaryContactIds],
                    },
                )
            }
            const response = await userDAOHandler.insertRecord({
                email,
                phoneNumber,
                linkPrecedence: "primary"
            })
            return res.status(200).json(
                {
                    primaryContactId: response.id,
                    emails: [response.email],
                    phoneNumbers: [response.phoneNumber],
                    secondaryContactIds: [],
                },
            )
        } else {
            const primaryContact = primaryAccounts[0];
            const allRecords = primaryAccounts.slice(1);
            let isEmailPrimary = false;
            let isPhonePrimary = false;

            for (const record of primaryAccounts) {
                if (record.email == email) {
                    isEmailPrimary = true;
                }
                if (record.phoneNumber == phoneNumber) {
                    isPhonePrimary = true
                }
            }

            const uniqueEmails = new Set();
            const uniquePhoneNumbers = new Set();
            const secondaryContactIds = new Set();
            uniqueEmails.add(primaryContact.email);
            uniquePhoneNumbers.add(primaryContact.phoneNumber);
            for (const record of allRecords) {
                await Contact.update({
                    linkPrecedence: "secondary",
                    linkedId: primaryContact.id
                }, {
                    where: {
                        id: record.id
                    }
                });
                uniqueEmails.add(record.email);
                uniquePhoneNumbers.add(record.phoneNumber);
                secondaryContactIds.add(record.id)
            }
            const secondaryContacts = await Contact.findOne({
                where: {
                    email,
                    phoneNumber,
                    linkPrecedence: 'secondary'
                }
            })

            if (!secondaryContacts) {
                if (!isEmailPrimary || !isPhonePrimary) {
                    if (phoneNumber !== null) {
                        //create secondary account for this primary account
                        await userDAOHandler.insertRecord({
                            email,
                            phoneNumber,
                            linkedId: primaryContact.id,
                            linkPrecedence: "secondary"
                        })
                    }

                }
            }

            // find all secondary for this primary
            const allSecondary = await Contact.findAll({
                where: {
                    linkedId: primaryContact.id
                }
            })
            for (const record of allSecondary) {
                uniqueEmails.add(record.email);
                uniquePhoneNumbers.add(record.phoneNumber);
                secondaryContactIds.add(record.id)
            }

            return res.status(200).json(
                {
                    primaryContactId: primaryContact.id,
                    emails: [...uniqueEmails],
                    phoneNumbers: [...uniquePhoneNumbers],
                    secondaryContactIds: [...secondaryContactIds],
                },
            )

        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.use((req, res, next) => {
    const err = new ApiError(404, 'Not Found', 'Resource Not Found!');
    next(err);
});

server.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

module.exports = app;