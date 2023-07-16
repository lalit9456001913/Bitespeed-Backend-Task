if [ -z "$1" ]
  then
    echo "Which env do you want to run the seeder?"
    exit 1
fi
echo 'deleting db....'
npx sequelize-cli db:drop --env=$1

echo 'Creating DB....'
npx sequelize-cli db:create --env=$1

echo 'Run migration'
npx sequelize-cli db:migrate --env=$1
