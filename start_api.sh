echo 'install all dependencies'
npm install

echo 'creating db....'
./create-db.sh

echo 'run migration....'
./run_migration.sh

echo 'start server'
npm start