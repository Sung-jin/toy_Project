exports.deleteDataFunc = function(id, client){
  return new Promise((resolve, reject) => {

    var deleteDone ={
      'success' : true,
      'status' : []
    };

    client.query('DELETE FROM items WHERE id=($1)', [id],
    function(err, result){
      if(err){
        deleteDone.status.push(err);
        deleteDone.success = false;
        return reject(deleteDone);
      }else{
        deleteDone.status.push('Success');
        return resolve(deleteDone);
      }
    });

 });
}
