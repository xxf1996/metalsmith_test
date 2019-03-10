const Metal = require('metalsmith')
const ejs = require('ejs')
const path = require('path')

Metal('.')
    .clean(false)
    .source('some')
    .destination('some')
    .ignore([
        'src',
        'public'
    ])
    .use((files, metal, done) => {
        Object.keys(files).forEach(name => {
            let file = files[name]
            file.contents = Buffer.from(ejs.render(file.contents.toString(), {
                projectName: 'kls'
            }))
        })
        done()
    })
    .build(err => {
        if (err) {
            console.log(err)
        }
    })