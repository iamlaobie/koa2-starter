var mysql = require('mysql');

var getFirst = function (rows) {
  if(rows.length > 0) {
    var row = rows[0];
    var key = Object.keys(row)[0];
    return row[key];
  } else {
    throw('NO DATA:' + this.sql);
  }
};

var getFirstRow = function (rows) {
  return rows[0] || {};
};

var pool = exports.createPool = function (options) {
  var pool = mysql.createPool(options);
  pool.on('connection', function (connection) {
    connection.query("SET SESSION time_zone ='+8:00'");
    connection.query("SET NAMES utf8mb4");
  });

  var query = function (sql, args) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, args, function (err, rows) {
        if(err) reject(err);
        else resolve(rows);
      });
    });
  };

  var getConnection = function () {
    return new Promise(function (resolve, reject) {
      pool.getConnection(function (err, conn) {
        if (err) reject(err);
        else resolve(conn);
      });
    });
  }

  var queryOne = function (sql, args) {
    var self = {sql: sql}
    return query(sql, args).then(getFirst.bind(self));
  };

  var queryObject = function (sql, args) {
    return query(sql, args).then(getFirstRow);
  };

  var executeInsert = function (sql, args) {
    return query(sql, args).then(function(result){
      return result.insertId;
    });
  };

  var executeUpdate = function (sql, args) {
    return query(sql, args).then(function(result) {
      return (result.affectedRows > 0);
    });
  };

  var transaction = function (sqls) {
    return getConnection().then(function (conn) {
      var transQuery = function (sql, args) {
        console.log(mysql.format(sql, args));
        return new Promise(function (resolve, reject) {
          conn.query(sql, args, function (err, rows) {
            if(err) reject(err);
            else resolve(rows);
          });
        });
      };
      return transQuery("START TRANSACTION").then(function (ret) {
        var ps = [];
        sqls.forEach(function (sql) {
          ps.push(transQuery.apply(null, sql));
        });
        return Promise.all(ps).then(function (ret) {
          transQuery("COMMIT");
          conn.release();
          return Promise.resolve(true);
        }).catch(function (err) {
          transQuery("ROLLBACK");
          conn.release();
          console.log(err);
          return Promise.reject(err);
        });
      })
    }).catch(function (err) {
      return Promise.reject(err);
    });
  };

  return {
    query: query,
    queryOne: queryOne,
    queryObject: queryObject,
    executeInsert: executeInsert,
    executeUpdate: executeUpdate,
    getConnection: getConnection,
    transaction : transaction
  };
};
