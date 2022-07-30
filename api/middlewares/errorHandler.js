// custom error handler

const errorHandler = ( error, req, res, next ) => {

    const errorStatus = error.status || 500;
    const errorMsg = error.messeage || 'Unknown error'

    res.status(errorStatus).json({
        messeage : errorMsg,
        status : errorStatus,
        stack : error.stack
    })

};

export default errorHandler