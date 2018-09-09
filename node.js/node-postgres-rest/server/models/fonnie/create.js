exports.createDataFunc = function(data, client){
  return new Promise((resolve, reject) => {

    var createDone ={
      'success' : true,
      'status' : []
    };

    client.query('INSERT INTO items(text, complete) values($1, $2)',
    [data.text, data.complete], (err, result) => {
      if(err){
        createDone.status.push(err);
        createDone.success = false;
        reject(createDone);
      }else{
        createDone.status.push('Success');
        resolve(createDone);
      }
    });

 });
}
