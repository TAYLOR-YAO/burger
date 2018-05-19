var connection = require("./connection.js");

function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}

var orm = {
    selectAll: function(burgersTable, cb) {
    var queryString = "SELECT * FROM " + burgersTable + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertOne: function(burgersTable, cols, vals, cb) {
    var queryString = "INSERT INTO " + burgersTable;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += '"' + vals + '"';
    queryString += ")"
    // console.log("Value: " + vals)
    console.log("Insert query:  " + queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      console.log("Result: "+result)
      cb(result);
    });
  },

  updateOne: function(burgersTable, objColVals, condition, cb) {
    var queryString = "UPDATE " + burgersTable;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    // console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

module.exports = orm;