hexo.extend.filter.register('after_generate', () => {	
    hexo.route.remove('js/schemes/muse.js');
    hexo.route.remove('js/next-boot.js');
    hexo.route.remove('js/utils.js');
  });

function replace_url(str, old_url, new_url){
  old_url = new RegExp(old_url.split('/').join('\\/'), "g");
  return str.replace(old_url, new_url);
}

// .js -> .min.js
function use_min_js(str, package, old_path, new_path){
  var old_url = `//cdn.jsdelivr.net/npm/${package}@(([\\s\\S])*?)/${old_path}`;
  var new_url = `//cdn.jsdelivr.net/npm/${package}@$1/${new_path}`;
  return replace_url(str, old_url, new_url);
}

hexo.extend.filter.register('after_render:html', function(str, data){
  str = use_min_js(str, 'hexo-theme-next', 'source/js/next-boot.js', 'source/js/next-boot.min.js');
  str = use_min_js(str, 'hexo-theme-next', 'source/js/utils.js', 'source/js/utils.min.js');
  str = use_min_js(str, 'hexo-theme-next', 'source/js/schemes/muse.js', 'source/js/schemes/muse.min.js');
  return str;
});