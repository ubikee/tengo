echo "Tengo Project Build Process:"
echo "----------------------------" 

echo "1) linking bus"
cd ./bus
npm link
echo "   done!"

echo "2) linking reports"
cd ../reports
npm link tengo-reports
echo "   done!"

echo "3) linking api"
cd ../api
npm link
npm link tengo-bus
echo "   done!"

echo "4) linking web"
cd ../web
npm link tengo-api
echo "   done!"
