let o = {
    test: true,
    object: { test: `yes`, number: 2 },
    array: [1, 2, 3],
    path: `${__dirname}/here`,
    list: [1, `two`, [3], { value: 4 }],
    tendrill: {
        app: {
            views: { engine: (function(m) { return m.default ? m.default : m })(require('tenhub-server/views/Engine')) },
            connections: { main: { connector: (function(m) { return m.default ? m.default : m })(require('tenhub-server/connectors/mongodb')), options: { collection: `websessions`, autoRemove: `interval`, autoRemoveInterval: process.env['AUTO_REMOVE_INTERVAL'] } } },
            filters: {
                session: {
                    enabled: true,
                    options: { httpOnly: true }
                }            
},
            modules: { www: (function(m) { return m.default ? m.default : m })(require('lims/modules/www')) }
        },
        filters: { csrf: { enabled: true } }
    },
    module: (function(m) { return m.default ? m.default : m })(require('tenhub')),
    funcs: (function(m) { return m.default ? m.default : m })(require('path/to/somewhere')(1, `two`, [3], { value: 4 }))
} 
