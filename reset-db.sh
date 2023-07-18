echo 'deleting db....'
npx sequelize-cli db:drop 

echo 'Creating DB....'
npx sequelize-cli db:create 

echo 'Run migration'
npx sequelize-cli db:migrate
