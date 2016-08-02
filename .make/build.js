
require('nitro')(function (nitro) {

  nitro.dir('dist').remove();

  nitro.load('bundle.js')
    .each(function (f) {
      console.log('file', f.getPath() );
    })
    .process('browserify')
    .write('dist');

});
