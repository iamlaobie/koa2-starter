
data=$(cat ./data.json)
curl -X POST -d'{"Code":"87","Body":'$data'}' -H 'content-type: application/json' http://127.0.0.1:9999/sichuang/885D904016CE/getrequest

