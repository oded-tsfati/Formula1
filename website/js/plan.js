(function(){
  function ready(fn){ if(document.readyState !== 'loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }

  function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

  function makeSessionBlock(sessionIndex, minutes, focus){
    var title = [
      'Balance & Gliding','Starts & Braking','Steering & Turns','Skill Review','Endurance Ride','Awareness Drills'
    ][sessionIndex % 6];
    var detailsByFocus = {
      balance: 'Focus on smooth coasts, eyes up, and gentle steering. Add cone slalom.',
      confidence: 'Short wins: controlled stops, easy turns, and repeat successful drills.',
      endurance: 'Steady easy pace ride; nose-breathing; conversational effort.'
    };
    var detail = detailsByFocus[focus] || detailsByFocus.confidence;
    return '<div class="card"><h3>'+title+'</h3><p class="tagline">'+minutes+' min • '+focus+'</p><p>'+detail+'</p></div>';
  }

  function buildPlan(options){
    var weeks = clamp(parseInt(options.weeks,10)||4,2,8);
    var freq = clamp(parseInt(options.freq,10)||3,2,6);
    var minutes = clamp(parseInt(options.minutes,10)||25,10,60);
    var goal = options.goal || 'confidence';

    var weekBlocks = [];
    for(var w=1; w<=weeks; w++){
      var sessions = [];
      for(var s=0; s<freq; s++){
        sessions.push(makeSessionBlock(s, minutes, goal));
      }
      weekBlocks.push({ week: w, html: '<section class="card"><h3>Week '+w+'</h3>'+sessions.join('')+'</section>' });
    }
    return { weeks: weekBlocks, meta: { weeks: weeks, freq: freq, minutes: minutes, goal: goal } };
  }

  function renderPlan(plan){
    var weeksEl = document.getElementById('plan-weeks');
    var metaEl = document.getElementById('plan-meta');
    var out = document.getElementById('plan-output');
    if(!weeksEl || !metaEl || !out) return;
    weeksEl.innerHTML = plan.weeks.map(function(w){ return w.html; }).join('');
    metaEl.textContent = plan.meta.weeks + ' weeks • ' + plan.meta.freq + ' sessions/week • ' + plan.meta.minutes + ' min • focus: ' + plan.meta.goal;
    out.style.display = '';
  }

  function attachForm(){
    var form = document.getElementById('plan-form');
    var downloadBtn = document.getElementById('download-btn');
    var weeksContainer = document.getElementById('plan-weeks');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var data = new FormData(form);
      var opts = Object.fromEntries(data.entries());
      var plan = buildPlan(opts);
      renderPlan(plan);
      form.querySelector('button[type="submit"]').textContent = 'Regenerate plan';

      if(downloadBtn){
        downloadBtn.onclick = function(){
          var sessions = [];
          weeksContainer.querySelectorAll('.card').forEach(function(card){
            // naive extraction of session blocks under each week
          });
          var blob = new Blob([JSON.stringify(plan, null, 2)], {type: 'application/json'});
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'bike-plan.json';
          a.click();
          URL.revokeObjectURL(url);
        };
      }
    });
  }

  ready(function(){ attachForm(); });
})();
