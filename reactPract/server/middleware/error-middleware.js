import ApiError from '../exceptions/api-error.js'

export default function(err, res) {
    if(err instanceof ApiError) {
        return res.status(err.status)
        .json({message: err.message, errors: err.errors})
    }

    return res.status(500).json({message: "Непередбачувана помилка", errors: err.errors ?? []})
}