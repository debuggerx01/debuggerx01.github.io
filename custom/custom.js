// 设置MD编辑器在新页面打开
document.querySelectorAll('a[href="/md_editor/"]').forEach(
  function (editor) {
    editor.setAttribute('target', '_blank');
  }
);

// 设置点击头像时打开关于页面
document.querySelectorAll('.avatar-img').forEach(
  function (avatar) {
    avatar.addEventListener(
      'click',
      function () {
        window.open('/about/');
      },
    );
  }
);

/*
const jobHuntingContent = `
<div style="background: #121212; border-radius: 24px; color: rgba(255,255,255,0.9); max-width: 400px;">
<p>
<span>那天我和往常一样，开心地通勤100分钟去上班。</span>
<br>
<span>谁曾想不过上了个厕所的功夫，回来公司没了。</span>
<br>
<span>果真是人生无常，大肠包小肠……</span>
</p>
<div style="border-bottom: 1px dashed rgba(255,255,255,0.1);"></div>
<p>
本人8年的全栈偏前端，有6年的Flutter经验，主导或参与了多个跨端项目的落地，并一直积极参与开源社区。当过大头兵，也带过小团队，最喜欢最擅长的还是撸代码，尤其是解决各色疑难杂症~
</p>
<div style="border-bottom: 1px dashed rgba(255,255,255,0.1);"></div>
<p>
生活不易猛男叹气，有缘的兄弟看过我的博客如果觉得多少还是有那么点靠谱，正巧又有base上海的合适的工作机会，万望能够告知一二❤
</p>
<a style="margin: auto;" target="_blank" href="https://www.debuggerx.com/raw_assets/%E6%9D%9C%E6%AC%A3-%E5%89%8D%E7%AB%AF_%E5%85%A8%E6%A0%88-8%E5%B9%B4.pdf">杜欣-前端_全栈-8年.pdf</a>
</div>
`;

if (!!document.querySelector('#post-info')) {
  if (!localStorage.getItem('KEY_JOB_HUNTING')) {
    setTimeout(function () {
      Fancybox.show([{
        src: jobHuntingContent,
        type: "html",
        closeButton: false,
      }]);
      localStorage.setItem('KEY_JOB_HUNTING', 'true');
      fetch('//job-hunting-visit-count.debuggerx.com');
    }, 1000 * 30);
  }
}


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
}*/
