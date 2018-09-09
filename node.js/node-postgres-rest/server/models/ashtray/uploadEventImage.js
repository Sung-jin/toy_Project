exports.uploadEventImageFunc = function(client, data){
  return new Promise((resolve, reject) => {

    var uploadDone ={
      'success' : true,
      'status' : []
    };

    client.query('INSERT INTO eventImages(data, mine_type, name) values($1, $2, $3)',
    [data.base64_Image, data.type, data.name], (err, result) => {
      if(err){
        uploadDone.status.push(err);
        uploadDone.success = false;
        reject(uploadDone);
      }else{
        uploadDone.status.push('Success');
        resolve(uploadDone);
      }
    });

 });
}
