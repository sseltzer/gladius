rm -rf ../install_dl/foundation
mkdir -p ../install_dl/foundation
cd ../install_dl/foundation
curl "http://foundation.zurb.com/sites/download.html/complete" -o foundation.zip
unzip -a foundation.zip
cd ../../
mkdir -p webapp/public/src/css/vendor/foundation
cp -r install_dl/foundation/css webapp/public/src/css/vendor/foundation
mkdir -p webapp/public/src/js/vendor/foundation
cp -r install_dl/foundation/js webapp/public/src/js/vendor/foundation