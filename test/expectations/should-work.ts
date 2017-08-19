export const x = {
    test: true,
    list: [1, `two`, [3], { value: 4 }],
    object: { test: `yes`, number: 2 },
    module: {
        as: {
            path: ((function(m) { return m.default ? m.default : m })(require('module/as/path'))),
            relative: { path: ((function(m) { return m.default ? m.default : m })(require('./module/with/relative/../path'))) }
        }    
},
    array: { of: { modules: [((function(m) { return m.default ? m.default : m })(require('one'))), ((function(m) { return m.default ? m.default : m })(require('./1/2/3'))), ((function(m) { return m.one })(require('other/one')))] } },
    call: { member: ((function(m) { return m.member })(require('module/with/member')))({ key: `value` }) },
    complex: { dict: { main: { connector: ((function(m) { return m.connector })(require('path/to/connector'))), options: { collection: `websessions`, autoRemove: `interval`, autoRemoveInterval: process.env['}'] } } } },
    tendrill: {
        app: {
            filters: {
                session: {
                    enabled: true,
                    options: { httpOnly: true }
                }
            },
            modules: { www: ((function(m) { return m.default ? m.default : m })(require('lims/modules/www'))) }
        },
        filters: { csrf: { enabled: true } }
    }
} 
