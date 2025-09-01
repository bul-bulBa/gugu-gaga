const ApiError = require('../exceptions/api-error')

module.exports = function(err, res) {
    
    if(err instanceof ApiError) {
        return res.status(err.status)
        .json({message: err.message, errors: err.errors})
    }
    // console.log(err)
    return res.status(500).json({message: "Непередбачувана помилка", err})
}