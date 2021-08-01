# cd ../front/cocktail
list=`ls ../`
if [[ "$list" =~ 'src/' ]];
then
mv lazy.js ../src/
cd ../src/
    if [[ "$1" =~ '-d' ]];
    then
    mkdir $2
    fi
node lazy.js $@
cd ../Scripts
mv ../src/lazy.js  ./
else
echo 'You need to place the Scripts directory in the same level of src/ or node_modules/ of your react project'
fi
