exports.loadLocationDataFunc = function(client){
  return new Promise((resolve, reject) => {

    var loadDone ={
      'success' : true,
      'location' : [],
      'status' : []
    };

    client.query('SELECT * FROM ashtrayInfo ORDER BY id ASC',
    function(err, result){
      if(err){
        loadDone.success = false;
        loadDone.status.push(err);
        return reject(loadDone);
      }else{
        for(var i = 0; i < result.rows.length; i++){
          loadDone.location.push(result.rows[i]);
        }
        loadDone.status.push('Success');
        return resolve(loadDone);
      }
    });

 });
}
