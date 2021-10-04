const mysql = require('mysql2');

//we can do mysql.createConnection as well here 
//but in that case, for every query a new connection will be created and once the query is completed, will have to close the connection
//and in real time we will have lot of queries, so for every query(fetch, create, write) a new connection will be instantiated 
//which makes the application really slow and is not recommended
//Instead, we can use createPool which creates a pool of connections so can reach out of a connection when there is a new query
//also, we can run multiple queries simultaneously bcz each query needs it own connection, and once the query is done
//the connection is handed back to the pool and it's available again for new query
//and pool can be finished when our application shuts down
const pool = mysql.createPool({
    host:'localhost',
    user:'root', //root is the default user given during installation
    database:'shopping-website', //database is the new schema that we created
    password:'12345' //password is the pwd we can in configuration while installing the sql
});

module.exports = pool.promise();