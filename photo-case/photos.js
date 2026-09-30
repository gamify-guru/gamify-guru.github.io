var PICS={
  cover:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  came:"https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=900&q=80",
  went:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
  read:"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
  wore:"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
  stood:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
  saw:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
  said:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  thought:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
  made:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
  had:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
  street:"https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80",
  window:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80"
};
function shot(key,cap){return "<div class='shot'><img src='"+(PICS[key]||PICS.street)+"' alt='"+(cap||key)+"'><div class='cap'>"+(cap||"")+"</div></div>";}
var VERBS=[["come","came"],["go","went"],["have","had"],["make","made"],["read","read"],["say","said"],["see","saw"],["stand","stood"],["think","thought"],["wear","wore"]];
var PRODUCTION=["B1","B2","B3","C1","C3"];
var teacher=false, done={}, answers={};
var CELLS=[
  {id:"A1",title:"Photo Hunt",skill:"READ",time:"5-6 min",prod:false,blurb:"Choose V2 for 5 photos."},
  {id:"A2",title:"Sort the Case",skill:"SORT",time:"6-7 min",prod:false,blurb:"NOW / YESTERDAY."},
  {id:"A3",title:"Witness Report",skill:"READ + SPEAK",time:"7-8 min",prod:false,blurb:"Read and answer."},
  {id:"B1",title:"Two Photos",skill:"COMPARE",time:"7-8 min",prod:true,blurb:"Compare before / after."},
  {id:"B2",title:"Four Lines",skill:"WRITE",time:"8-10 min",prod:true,blurb:"Write 4 past sentences."},
  {id:"B3",title:"Detective Talk",skill:"SPEAK",time:"6-8 min",prod:true,blurb:"Answer with V2."},
  {id:"C1",title:"Comic Strip",skill:"CREATE",time:"8-10 min",prod:true,blurb:"came saw said went."},
  {id:"C2",title:"True or Trap",skill:"READ",time:"5-7 min",prod:false,blurb:"Find traps."},
  {id:"C3",title:"Case File",skill:"WRITE + SPEAK",time:"8-10 min",prod:true,blurb:"5 sentences, 5 V2."}
];
function el(id){return document.getElementById(id)}
function doneCount(){return Object.keys(done).length}
function prodCount(){return Object.keys(done).filter(function(k){return PRODUCTION.indexOf(k)>=0}).length}
function updateMeta(){
  el("prog").textContent="Cells done: "+doneCount()+"/3";
  el("prodChip").textContent=prodCount()?"PRODUCTION: "+prodCount():"Need 1 PRODUCTION cell";
  el("prodChip").className="chip"+(prodCount()?" prod":"");
  el("picked").textContent="Chosen: "+(Object.keys(done).join(", ")||"-");
}
function trap(msg){return "Trap in the case. "+msg}
function showCover(on){el("cover").classList.toggle("hidden",!on);el("app").classList.toggle("hidden",on)}
function renderBoard(){
  showCover(false); updateMeta();
  var html="<div class='kicker'>Choice board</div><h2>Open any 3 files</h2><p class='note'>At least one PRODUCTION cell.</p><div class='board'>";
  CELLS.forEach(function(c){
    html+="<div class='cell"+(done[c.id]?" done":"")+"' data-id='"+c.id+"'><div class='code'>"+c.id+(c.prod?" PRODUCTION":" CONTROL")+"</div><h3>"+c.title+"</h3><p>"+c.skill+" · "+c.time+"</p><p>"+c.blurb+"</p></div>";
  });
  html+="</div>";
  if(doneCount()>=3){
    html+="<p style='margin-top:16px'><button class='start' id='finalBtn'>Final check</button></p>";
    if(!prodCount()) html+="<p class='feedback'>"+trap("Choose B1, B2, B3, C1 or C3.")+"</p>";
  }
  el("view").innerHTML=html;
  [].slice.call(document.querySelectorAll(".cell")).forEach(function(n){n.onclick=function(){openCell(n.getAttribute("data-id"));};});
  var fb=el("finalBtn"); if(fb) fb.onclick=function(){if(doneCount()>=3&&prodCount()>=1) renderFinal(); else renderBoard();};
}
function openCell(id){({A1:a1,A2:a2,A3:a3,B1:b1,B2:b2,B3:b3,C1:c1,C2:c2,C3:c3})[id]();}
var A1=[{key:"came",cap:"At the open door",ok:"came",opts:["came","went"],model:"She came home."},{key:"went",cap:"Leaving down the street",ok:"went",opts:["came","went"],model:"He went away."},{key:"read",cap:"An open book",ok:"read",opts:["read","said"],model:"She read a book."},{key:"wore",cap:"A coat / hat",ok:"wore",opts:["wore","had"],model:"He wore a coat."},{key:"stood",cap:"At the bakery",ok:"stood",opts:["stood","went"],model:"They stood in line."}];
function a1(){var i=answers.a1i||0,item=A1[i];
 el("view").innerHTML="<div class='kicker'>A1 READ</div><h2>Photo Hunt</h2><p>"+(i+1)+" / 5</p>"+shot(item.key,item.cap)+"<p>Tap the past form, then type the sentence.</p><div class='choices' id='chs'></div><input id='line' placeholder='"+item.model+"'><p><button class='start' id='go'>Check</button></p><div class='feedback' id='fb'></div>";
 item.opts.forEach(function(w){var b=document.createElement("button");b.textContent=w;b.onclick=function(){answers.a1pick=w;[].slice.call(el("chs").children).forEach(function(x){x.className="";});b.className="ok";};el("chs").appendChild(b);});
 el("go").onclick=function(){var pick=answers.a1pick,line=el("line").value.toLowerCase();
  if(pick!==item.ok){el("fb").textContent=trap("Model: "+item.model);return;}
  if(line.indexOf(item.ok)<0){el("fb").textContent=trap("Write the full sentence.");return;}
  answers.a1i=i+1; if(answers.a1i>=A1.length){done.A1=true;renderBoard();return;} a1();};
}
function a2(){
 var tiles=["come","came","go","went","wear","wore","see","saw","think","thought"];
 el("view").innerHTML="<div class='kicker'>A2 SORT</div><h2>Sort the Case</h2>"+shot("thought","NOW or YESTERDAY?")+"<div class='sort'><div class='col'><b>NOW</b><div id='now'></div></div><div class='col'><b>YESTERDAY</b><div id='yes'></div></div></div><p><button class='start' id='go'>Check</button></p><div class='feedback' id='fb'></div><div class='bank' id='bank'></div>";
 tiles.forEach(function(t){var b=document.createElement("button");b.textContent=t;b.onclick=function(){var target=(["come","go","wear","see","think"].indexOf(t)>=0)?el("now"):el("yes");var d=document.createElement("div");d.className="tile";d.textContent=t;target.appendChild(d);b.remove();};el("bank").appendChild(b);});
 el("go").onclick=function(){var now=[].slice.call(el("now").children).map(function(n){return n.textContent});var yes=[].slice.call(el("yes").children).map(function(n){return n.textContent});
  var ok=now.length===5&&yes.length===5&&now.every(function(w){return ["come","go","wear","see","think"].indexOf(w)>=0})&&yes.every(function(w){return ["came","went","wore","saw","thought"].indexOf(w)>=0});
  el("fb").textContent=ok?"Pairs closed.":trap("NOW = come, go, wear, see, think."); if(ok){done.A2=true;setTimeout(renderBoard,400);}};
}
function a3(){
 el("view").innerHTML="<div class='kicker'>A3</div><h2>Witness Report</h2>"+shot("street","Last night")+"<div class='pair'>"+shot("wore","hat")+shot("saw","cat")+"</div><p class='note'>Last night Mia <b>came</b> to the street. She <b>wore</b> a red hat. She <b>saw</b> a black cat. A boy <b>said</b> Look! Then they <b>went</b> to the bakery.</p><p>Who came?</p><input id='q1'><p>What did she wear?</p><input id='q2'><p>What did they see?</p><input id='q3'><p><button class='start' id='go'>Check</button></p><div class='feedback' id='fb'></div>";
 el("go").onclick=function(){var ok=el("q1").value.toLowerCase().indexOf("came")>=0&&el("q2").value.toLowerCase().indexOf("wore")>=0&&el("q3").value.toLowerCase().indexOf("saw")>=0;
  el("fb").textContent=ok?"Yes.":trap("Need came / wore / saw."); if(ok){done.A3=true;setTimeout(renderBoard,500);}};
}
function b1(){
 el("view").innerHTML="<div class='kicker'>B1 PRODUCTION</div><h2>Two Photos</h2><div class='pair'>"+shot("window","stood at the window")+shot("went","went down the street")+"</div><div class='pair'>"+shot("thought","thought")+shot("said","said")+"</div><p>Write 3 pairs with stood / went / thought / said.</p><textarea id='box'></textarea><p><button class='start' id='go'>Save</button></p><div class='feedback' id='fb'></div>";
 el("go").onclick=function(){var t=el("box").value.toLowerCase();var n=["stood","went","thought","said"].filter(function(v){return t.indexOf(v)>=0}).length;
  var ok=n>=3&&t.length>40; el("fb").textContent=ok?"Compared.":trap("Need 3 different V2."); if(ok){done.B1=true;setTimeout(renderBoard,400);}};
}
function b2(){
 var pics=[["came","At the door"],["made","A cake"],["read","A book"],["wore","A coat / hat"]];
 var html="<div class='kicker'>B2 PRODUCTION</div><h2>Four Lines</h2><p>yesterday, last night, a red hat, a cake, a book</p>";
 pics.forEach(function(p,i){html+=shot(p[0],p[1])+"<input id='s"+i+"'>";});
 html+="<p><button class='start' id='go'>Check</button></p><div class='feedback' id='fb'></div>"; el("view").innerHTML=html;
 el("go").onclick=function(){var need=["came","made","read","wore"]; var ok=need.every(function(v,i){return el("s"+i).value.toLowerCase().indexOf(v)>=0});
  el("fb").textContent=ok?"Filed.":trap("Each line needs its V2."); if(ok){done.B2=true;setTimeout(renderBoard,400);}};
}
function b3(){
 var qs=["What did he make?","Did she see the cat?","What did they wear?","Who came first?","What did she say?"];
 var need=["made","saw","wore","came","said"];
 var html="<div class='kicker'>B3 PRODUCTION</div><h2>Detective Talk</h2>"+shot("street","scene")+"<div class='pair'>"+shot("made","cake")+shot("saw","cat")+shot("wore","hat")+shot("came","door")+"</div>";
 qs.forEach(function(q,i){html+="<p>"+q+"</p><input id='q"+i+"'>";});
 html+="<p><button class='start' id='go'>File</button></p><div class='feedback' id='fb'></div>"; el("view").innerHTML=html;
 el("go").onclick=function(){var ok=need.every(function(v,i){return el("q"+i).value.toLowerCase().indexOf(v)>=0});
  el("fb").textContent=ok?"On file.":trap("Need made, saw, wore, came, said."); if(ok){done.B3=true;setTimeout(renderBoard,400);}};
}
function c1(){
 var order=["came","saw","said","went"]; var html="<div class='kicker'>C1 PRODUCTION</div><h2>Comic Strip</h2>";
 order.forEach(function(v,i){html+=shot(v,"Frame "+(i+1))+"<input id='f"+i+"' placeholder='Yesterday they "+v+" ...'>";});
 html+="<p><button class='start' id='go'>Close</button></p><div class='feedback' id='fb'></div>"; el("view").innerHTML=html;
 el("go").onclick=function(){var ok=order.every(function(v,i){return el("f"+i).value.toLowerCase().indexOf(v)>=0 && el("f"+i).value.trim().length>6});
  el("fb").textContent=ok?"Complete.":trap("Each frame needs its V2."); if(ok){done.C1=true;setTimeout(renderBoard,400);}};
}
function c2(){
 var items=[{key:"came",cap:"She came home.",ok:true},{key:"went",cap:"He goed away.",ok:false},{key:"wore",cap:"She weared a hat.",ok:false},{key:"saw",cap:"They saw a cat.",ok:true},{key:"said",cap:"He said hello.",ok:true},{key:"stood",cap:"They standed in line.",ok:false}];
 var html="<div class='kicker'>C2</div><h2>True or Trap</h2>";
 items.forEach(function(it,i){html+=shot(it.key,it.cap)+"<div class='row'><button data-i='"+i+"' data-v='true'>True</button> <button data-i='"+i+"' data-v='trap'>Trap</button></div><input id='fix"+i+"'>";});
 html+="<p><button class='start' id='go'>Check</button></p><div class='feedback' id='fb'></div>"; el("view").innerHTML=html; answers.c2={};
 [].slice.call(el("view").querySelectorAll("button[data-i]")).forEach(function(b){b.onclick=function(){answers.c2[b.getAttribute("data-i")]=b.getAttribute("data-v");b.className="ok";};});
 el("go").onclick=function(){var good=true; items.forEach(function(it,i){var mark=answers.c2[i]; if(it.ok&&mark!=="true")good=false; if(!it.ok&&mark!=="trap")good=false; if(!it.ok){var line=el("fix"+i).value.toLowerCase(); if(!(line.indexOf("went")>=0||line.indexOf("wore")>=0||line.indexOf("stood")>=0)) good=false;}});
  el("fb").textContent=good?"Traps repaired.":trap("Rewrite went / wore / stood."); if(good){done.C2=true;setTimeout(renderBoard,400);}};
}
function c3(){
 el("view").innerHTML="<div class='kicker'>C3 PRODUCTION</div><h2>Case File</h2><div class='pair'>"+shot("came","came")+shot("saw","saw")+shot("made","made")+shot("wore","wore")+shot("went","went")+"</div><p>5 sentences, 5 different V2.</p><textarea id='box'></textarea><p><button class='start' id='go'>File</button></p><div class='feedback' id='fb'></div>";
 el("go").onclick=function(){var t=el("box").value.toLowerCase(); var uniq=VERBS.map(function(v){return v[1];}).filter(function(v){return t.indexOf(v)>=0;}).filter(function(v,i,a){return a.indexOf(v)===i;});
  var ok=uniq.length>=5 && t.split(/[.!?]/).filter(function(s){return s.trim().length>6;}).length>=5;
  el("fb").textContent=ok?"Case closed. Read it aloud.":trap("Need 5 sentences and 5 V2."); if(ok){done.C3=true;setTimeout(renderBoard,800);}};
}
var FINAL=["came","went","had","made","said","wore"];
function renderFinal(){var i=answers.fi||0,score=answers.fs||0;
 if(i>=FINAL.length){el("view").innerHTML="<h2>Score: "+score+" / 6</h2><p>Which verb was a trap for you today?</p><input id='ref'><p><button class='start' id='go'>Save</button></p><div class='feedback' id='fb'></div>"; el("go").onclick=function(){el("fb").textContent="Case closed. "+(el("ref").value||"");}; return;}
 el("view").innerHTML="<h2>Type only the V2</h2><p>"+(i+1)+" / 6</p>"+shot(FINAL[i],"What happened?")+"<input id='line'><p><button class='start' id='go'>Next</button></p>";
 el("go").onclick=function(){if(el("line").value.trim().toLowerCase()===FINAL[i]) answers.fs=(answers.fs||0)+1; answers.fi=i+1; renderFinal();};
}
el("startBtn").onclick=function(){renderBoard();};
el("backBoard").onclick=function(){renderBoard();};
el("teacherBtn").onclick=function(){teacher=!teacher;el("teacherBtn").className=teacher?"on":"off";renderBoard();};
el("verbsBtn").onclick=function(){showCover(false);el("view").innerHTML="<h2>10 pairs</h2><div class='verbs'>"+VERBS.map(function(v){return "<span>"+v[0]+" → <b>"+v[1]+"</b></span>";}).join("")+"</div><p><button class='start' id='back'>Back</button></p>";el("back").onclick=renderBoard;};
el("resetBtn").onclick=function(){done={};answers={};showCover(true);};
