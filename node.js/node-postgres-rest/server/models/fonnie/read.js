exports.readDataFunc = function(client){
  return new Promise((resolve, reject) => {

    var readDone ={
      'success' : true,
      'todo' : [],
      'status' : []
    };

    client.query('SELECT * FROM items ORDER BY id ASC',
    function(err, result){
      if(err){
        readDone.success = false;
        readDone.status.push(err);
        return reject(readDone);
      }else{
        for(var i = 0; i < result.rows.length; i++){
          readDone.todo.push(result.rows[i]);
        }
        readDone.status.push('Success');
        return resolve(readDone);
      }
    });

 });
}
