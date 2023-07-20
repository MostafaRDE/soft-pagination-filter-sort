#!/bin/bash

NOW="$(date +'%Y-%m-%d.%I-%M-%S')" # As date and time
# NOW="$(date +'%s')" # As timestamp
CURRENT_USER=$(whoami)
# CURRENT_SERVICE_NAME="$(basename $PWD)"
CURRENT_SERVICE_NAME="$(pwd | rev | cut -f2 -d'/' - | rev)"
RELEASE_DIR="../releases/$CURRENT_SERVICE_NAME/release-$NOW"


rm -rf ./dist
npm run build
mkdir -p $RELEASE_DIR
cp -R ./dist $RELEASE_DIR/dist
cp -R ./package.json $RELEASE_DIR/package.json
cp -R ./LICENSE $RELEASE_DIR/LICENSE
cp -R ./README.md $RELEASE_DIR/README.md
rm -rf ./dist


echo "#!/bin/bash

rm -rf ../../../main/dist
rm -rf ../../../main/package.json
rm -rf ../../../main/LICENSE
rm -rf ../../../main/README.md
cp -R ./dist ../../../main/dist
cp ./package.json ../../../main/package.json
cp ./LICENSE ../../../main/LICENSE
cp ./README.md ../../../main/README.md" >> $RELEASE_DIR/update.sh
chmod 744 $RELEASE_DIR/update.sh