(function(g){
  "use strict";
  var SKIP_AFTER=5000,SPOT=8000,viewerId=null,holderId=null;
  function origin(){try{if(document.currentScript&&document.currentScript.src)return new URL(document.currentScript.src).origin}catch(e){}return location.origin}
  function beacon(p){try{var b=JSON.stringify(p),u=origin()+"/api/impressions";if(navigator.sendBeacon){try{navigator.sendBeacon(u,new Blob([b],{type:"application/json"}));return}catch(e){}}fetch(u,{method:"POST",headers:{"content-type":"application/json"},body:b,mode:"cors",keepalive:true}).catch(function(){})}catch(e){}}
  /** Ask Interlude which creative to serve (Growth priority / weighted). */
  function decideAd(opts){
    opts=opts||{};
    if(opts.ad) return Promise.resolve(opts.ad);
    var holder=opts.holder||holderId||"holdey";
    var mode=opts.mode||"priority";
    var u=origin()+"/api/decision?holder="+encodeURIComponent(holder)+"&mode="+encodeURIComponent(mode);
    return fetch(u,{method:"GET",mode:"cors",credentials:"omit"}).then(function(r){
      if(!r.ok) throw new Error("decision "+r.status);
      return r.json();
    }).then(function(j){
      return (j&&j.ok&&j.adId)?j.adId:"northline";
    }).catch(function(){return "northline"});
  }
  function play(target,opts){
    opts=opts||{};
    var el=typeof target==="string"?document.querySelector(target):target;
    if(!el) throw new Error("Interlude: missing target element");
    var ad=opts.ad||"northline";
    var started=performance.now(),skipped=false,waiters=[];
    var prevPos=el.style.position,prevMin=el.style.minHeight;
    if(getComputedStyle(el).position==="static") el.style.position="relative";
    var host=document.createElement("div");
    host.setAttribute("data-interlude-hold","");
    host.style.cssText="position:absolute;inset:0;z-index:20;background:#0b0b0a;color:#f4f1ea;display:flex;flex-direction:column;justify-content:flex-end;padding:18px;font-family:system-ui,sans-serif";
    host.innerHTML="<div style=\"font-size:10px;letter-spacing:.16em;text-transform:uppercase;opacity:.75\">Ad</div><div style=\"font-family:Georgia,serif;font-size:28px;margin-top:8px\">Hold</div><div style=\"margin-top:6px;opacity:.85;font-size:14px\">Watch or skip — delivery is metered.</div><button type=\"button\" data-il-skip style=\"display:none;margin-top:12px;align-self:flex-end;width:44px;height:44px;border:0;border-radius:999px;background:rgba(244,241,234,.15);color:#f4f1ea;font-size:18px;cursor:pointer\">→</button>";
    el.appendChild(host);
    var skipBtn=host.querySelector("[data-il-skip]");
    skipBtn.onclick=function(){skipped=true;waiters.splice(0).forEach(function(fn){fn()})};
    var skipTimer=setTimeout(function(){skipBtn.style.display="grid"},opts.skipAfterMs||SKIP_AFTER);
    function destroy(){
      clearTimeout(skipTimer);
      if(!host._ilReported){
        host._ilReported=true;
        var watchMs=Math.max(0,Math.round(performance.now()-started));
        var id=(crypto&&crypto.randomUUID)?crypto.randomUUID():String(Date.now())+"-"+Math.random();
        try{window.dispatchEvent(new CustomEvent("interlude:impression",{detail:{id:id,ad:ad,skipped:skipped,source:"hold.js",viewer:viewerId,holder:holderId,watchMs:watchMs,beaconed:true}}))}catch(e){}
        beacon({id:id,holder:holderId||"holdey",ad:ad,skipped:skipped,viewer:viewerId,source:"hold.js",pageOrigin:location.origin,ts:Date.now(),webdriver:!!(navigator&&navigator.webdriver),watchMs:watchMs});
      }
      if(host.parentNode) host.parentNode.removeChild(host);
      el.style.position=prevPos; el.style.minHeight=prevMin;
    }
    return {started:started,minHold:opts.minMs||SPOT,get skipped(){return skipped},get ad(){return ad},untilSkipped:function(){if(skipped)return Promise.resolve();return new Promise(function(r){waiters.push(r)})},destroy:destroy,_setAd:function(a){ad=a||ad}};
  }
  function whileWaiting(target,work,opts){
    opts=opts||{};
    var workP=Promise.resolve().then(work), done=false,value,err;
    workP.then(function(v){done=true;value=v},function(e){done=true;err=e});
    function spot(){
      return decideAd(opts).then(function(adId){
        var ctl=play(target,Object.assign({},opts,{ad:adId}));
        return Promise.race([
          ctl.untilSkipped().then(function(){return "skip"}),
          new Promise(function(r){setTimeout(r,ctl.minHold)}).then(function(){return "end"})
        ]).then(function(why){
          ctl.destroy();
          if(why==="skip"||done) return workP;
          return spot();
        });
      });
    }
    return spot().then(function(){if(err)throw err;return value});
  }
  g.Interlude={play:play,whileWaiting:whileWaiting,decideAd:decideAd,identify:function(id){viewerId=id||null},holder:function(id){holderId=id||null},SKIP_AFTER_MS:SKIP_AFTER,SPOT_MS:SPOT,MIN_HOLD_MS:SPOT};
})(typeof window!=="undefined"?window:this);
