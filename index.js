const path        = require('path');
const loaderUtils = require('loader-utils');
const clone       = require('clone');
const ejs         = require('ejs');


module.exports = function(source) {

    this.cacheable && this.cacheable();

    try {

        const filename   = './' + path.relative(process.cwd(), this.resourcePath);
        const options    = clone(loaderUtils.getOptions(this) || {});
        const data       = Object.assign({}, options.data, { __template: filename });
        const ejsOptions = Object.assign({}, options.ejsOptions, { filename });
        const html       = ejs.render(source, data, ejsOptions).replace(/`/g, '\\`');

        return `module.exports = () => \`${ html }\``;

    } catch (err) {

        this.callback(err);

        return;

    }
};
