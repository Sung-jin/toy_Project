exports.updateDataFunc = function(data, id, client){
  return new Promise((resolve, reject) => {

    var updateDone ={
      'success' : true,
      'status' : []
    };

    client.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
    [data.text, data.complete, id], function(err, result){
      if(err){
        updateDone.status.push(err);
        updateDone.success = false;
        return reject(updateDone);
      }else{
        updateDone.status.push('Success');
        return resolve(updateDone);
      }
    });

 });
}
