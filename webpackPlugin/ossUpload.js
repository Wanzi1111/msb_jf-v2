const { execSync } = require('child_process');

class MsbOssUpload {
  constructor(options) {
    this.prefix = options.prefix
    this.bucket = options.bucket
    this.base = 'dist'
  }

  apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.done.tapAsync('MsbOssUpload', this.upload.bind(this))
    } else {
      compiler.plugin('done', this.upload.bind(this))
    }
  }

  upload(compilation, callback) {
    const params = `--bucket ${this.bucket} --base ${this.base} --prefix ${this.prefix} 'dist/**/*'`
    execSync(`npx msbupload file ${params}`, { stdio: [0, 1, 2] })
    if (typeof callback === 'function') {
      callback()
    }
  }
}

module.exports = MsbOssUpload;
