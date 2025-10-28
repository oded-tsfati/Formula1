(function(){
  function ready(fn){ if(document.readyState !== 'loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }

  ready(function(){
    // Mobile nav toggle
    var toggle = document.querySelector('.nav-toggle');
    var list = document.getElementById('primary-nav');
    if(toggle && list){
      toggle.addEventListener('click', function(){
        var open = list.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && list.classList.contains('open')){
          list.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
        }
      });
    }

    // Current year in footer
    var yearEl = document.getElementById('year');
    if(yearEl){ yearEl.textContent = String(new Date().getFullYear()); }
  });
})();
