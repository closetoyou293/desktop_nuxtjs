module.exports = {
    server: {
        start:          'Server started successfully',
        stop:           'Server is currently paused',
        maintenance:    'Server is under maintenance',
        update:         'Server have update'
    },
    database: {
        connect: {
            true:       'Database connection successful',
            false:      'Database connection failed'
        },
        get: {
            true:       'Get data successfully',
            false:      'Get data failed',
            null:       'Data does not exist'
        },
        update: {
            true:       'Data change successful',
            false:      'Data change failed'
        },
        delete: {
            true:       'Data deleted successfully',
            false:      'Data deletion failed'
        }
    }
}