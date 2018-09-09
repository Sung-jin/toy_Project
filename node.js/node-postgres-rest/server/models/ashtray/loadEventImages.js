exports.loadEventImages = function(client){
  return new Promise((resolve, reject) => {

    var loadDone ={
      'success' : true,
      image : {
        'base64_Images' : [],
        'type' : [],
        'name' : [],
      },
      'length' : 0,
      'status' : []
    };

    client.query('SELECT * FROM eventImages ORDER BY id ASC',
    function(err, result){
      if(err){
        readDone.success = false;
        readDone.status.push(err);
        return reject(loadDone);
      }else{
        for(var i = 0; i < result.rows.length; i++){
          loadDone.image.base64_Images.push(result.rows[i].data.toString());
          loadDone.image.type.push(result.rows[i].mine_type);
          loadDone.image.name.push(result.rows[i].name);
          loadDone.length++;
        }
        loadDone.status.push('Success');
        return resolve(loadDone);
      }
    });

 });
}
