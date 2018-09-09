function setDB(){
  return new Promise(resolve =>{
    const pg = require('pg');
    const connectionString = process.env.DATABASE_URL || 'postgres://ashtray:1q2w3e4r@localhost:5432/ashtray';
    //만들고자 하는 사용자:비밀번호@url:포트/데이터베이스

    const client = new pg.Client(connectionString);
    resolve(client);
  })
}

function makeTable(query){
  return new Promise(resolve =>{

    query.rows.forEach(row =>{
      console.log(row);
    });

    resolve('done');
  })
}

async function asyncCall(){
  const client = await setDB();

  await client.connect();
  const res = await client.query(
    'CREATE TABLE ashtrayInfo(id SERIAL PRIMARY KEY, lat integer not null, lon integer not null)');
    //만들고자 하는 테이블

  var result = makeTable(res);

  await client.end();
}

asyncCall();
