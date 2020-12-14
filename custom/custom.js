$(document).ready(function () {
  // 设置MD编辑器在新页面打开
  $('a[href="/md_editor/"]').attr('target', '_blank');
});

if (window.notSupportWebp) {
  var webp2jpgServerURL = "http://home.debuggerx.com:9999/?";
  // codes from https://github.com/fex-team/ueditor/commit/9089cfaa5745f629680aea2912efeb108f9c368b
  var imgNodes = document.querySelectorAll('[style*="url"],img');
  imgNodes.forEach(function (img) {
    if (img.style.backgroundImage && img.style.backgroundImage.endsWith(".webp\")")) {
      img.style.backgroundImage = img.style.backgroundImage.replace("url(\"", "url(\"" + webp2jpgServerURL);
    } else if (img.src && img.src.endsWith(".webp")) {
      img.src = webp2jpgServerURL + img.src;
    }
  });
}