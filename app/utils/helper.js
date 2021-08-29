const db = require('../config/mysql');
const logger = require('../utils/logger');


function sqlExecutor(statement, values, cb) {
 
    db.getConnection().query({
      sql: statement,
      values: values
    }, function (err, results, field) {
      if (err) {
        logger.log.error('sql error: | statement: "%s" | values: %s | message: %s | stack trace: %s', statement, values, err.message, err.stack)
        cb(null, err)
      } else {
        logger.log.info({ message: `statment: "${statement}" | sql statement execution successfull` });
        cb(results, null)
      }
    });
  }


function sqlExecutorAsync(statement, values) {
    return new Promise((resolve, reject) => {

      sqlExecutor(statement, values, (result, error) => {
        if (error) {
          return resolve({ status: 'error', msg: 'Unexpected error occurred', error })
        }
        return resolve({ status: 'success', data: result })
      })
    })
  }


module.exports = {
    sqlExecutor,
    sqlExecutorAsync
}