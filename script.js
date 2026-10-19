/* ===== CHỈNH SỬA TẠI ĐÂY ===== */
const CONFIG = {
  top: "Có một điều con muốn nói với mẹ...",
  title: "Gửi mẹ yêu của con 💗",
  letter: [
    "Mẹ ơi, nhân ngày 20/10, con muốn nói với mẹ những điều mà ngày thường con hay ngại nói.",
    "Cảm ơn mẹ vì đã luôn thương con, lo cho con từng bữa ăn, từng giấc ngủ, dù đôi khi con làm mẹ buồn hay mệt.",
    "Con biết mẹ đã hy sinh rất nhiều, và con luôn ghi nhớ trong lòng.",
    "Con mong mẹ luôn khỏe mạnh, vui vẻ và thật nhiều nụ cười. Con hứa sẽ cố gắng thật tốt để mẹ luôn tự hào về con.",
    "Chúc mẹ ngày 20/10 thật hạnh phúc! 🌷"
  ],
  reasons: [
    "Mẹ luôn là người đầu tiên lo lắng cho con.",
    "Mẹ luôn tin con, kể cả khi con không tin chính mình.",
    "Mẹ nấu những bữa cơm ngon nhất thế giới.",
    "Mẹ luôn chờ con về, dù trời đã khuya.",
    "Mẹ dạy con cách trở thành người tử tế."
  ],
  endBig: "Con yêu mẹ",
  endSmall: "Mẹ xứng đáng với tất cả những điều dịu dàng nhất. Chúc mẹ 20/10 thật vui! 💗",
  music: "assets/music.mp3" // đặt MP3 vào đây, chưa có thì web vẫn chạy bình thường
};
/* ============================== */
document.getElementById('boot')?.remove();
const $=s=>document.querySelector(s),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('#bloomTop').textContent=CONFIG.top;$('#letterTitle').textContent=CONFIG.title;
$('#endBig').textContent=CONFIG.endBig;$('#endSmall').textContent=CONFIG.endSmall;
$('#card').innerHTML=CONFIG.letter.map((t,i)=>`<p style="animation-delay:${.4+i*1.1}s">${t}</p>`).join('');

/* nền */
const cv=$('#fx'),cx=cv.getContext('2d');let W,H;
const sz=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};sz();addEventListener('resize',sz);
const PC=['#ff9fb8','#ffc2cf','#ffd1b8','#ffb3a0'];
const ps=Array.from({length:reduce?0:26},(_,i)=>({k:i%5===0?1:i%7===3?2:0,x:Math.random()*W,y:Math.random()*H,s:6+Math.random()*9,v:.3+Math.random()*.7,d:Math.random()*6,c:PC[i%4],r:Math.random()*6}));
function heart(s){cx.beginPath();cx.moveTo(0,s*.4);cx.bezierCurveTo(-s,-s*.3,-s*.4,-s,0,-s*.4);cx.bezierCurveTo(s*.4,-s,s,-s*.3,0,s*.4);cx.fill()}
(function loop(t=0){cx.clearRect(0,0,W,H);for(const p of ps){p.y+=p.v*(p.k===2?.4:1);p.x+=Math.sin(t/1500+p.d)*.6;p.r+=.01;if(p.y>H+20){p.y=-20;p.x=Math.random()*W}
cx.save();cx.translate(p.x,p.y);cx.fillStyle=p.k===2?'#fff1b8':p.c;
if(p.k===0){cx.rotate(p.r);cx.globalAlpha=.7;cx.beginPath();cx.ellipse(0,0,p.s*.55,p.s,0,0,6.3);cx.fill()}
else if(p.k===1){cx.globalAlpha=.6;cx.rotate(Math.sin(p.r)*.4);heart(p.s)}
else{cx.globalAlpha=.4+.5*Math.abs(Math.sin(t/600+p.d));cx.shadowColor='#ffe08a';cx.shadowBlur=10;cx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,r=i%2?p.s*.25:p.s*.8;cx.lineTo(Math.cos(a)*r,Math.sin(a)*r)}cx.fill()}
cx.restore()}requestAnimationFrame(loop)})();

function burst(x,y,list=['🌸','💗','✨','🌷','💖'],n=22){
  if(reduce)n=6;
  for(let i=0;i<n;i++){const e=document.createElement('span');e.textContent=list[i%list.length];
    e.style.cssText=`position:fixed;left:${x}px;top:${y}px;z-index:15;pointer-events:none;font-size:${14+Math.random()*16}px`;
    document.body.appendChild(e);const a=Math.random()*6.28,r=60+Math.random()*140;
    e.animate([{transform:'translate(0,0) scale(.4)',opacity:1},{transform:`translate(${Math.cos(a)*r}px,${Math.sin(a)*r-40}px) scale(1.2)`,opacity:1,offset:.6},{transform:`translate(${Math.cos(a)*r}px,${Math.sin(a)*r+80}px) scale(.8)`,opacity:0}],{duration:1500+Math.random()*600,easing:'ease-out'}).onfinish=()=>e.remove()}
}
const center=el=>{const r=el.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
let timer;
function go(id){clearTimeout(timer);document.querySelector('.screen.active').classList.remove('active');document.getElementById(id).classList.add('active');scrollTo(0,0);
  if(id==='s-letter')timer=setTimeout(()=>$('#toReasons').hidden=false,.4e3+CONFIG.letter.length*1.1e3+1e3)}
$('#toReasons').onclick=()=>go('s-reasons');$('#toEnd').onclick=()=>go('s-end');

/* nhạc */
const mb=$('#music');let audio=null,wanted=true;
fetch(CONFIG.music,{method:'HEAD'}).then(r=>{if(!r.ok)throw 0;audio=new Audio(CONFIG.music);audio.loop=true;audio.volume=.45;mb.hidden=false}).catch(()=>{});
const playMusic=()=>{if(audio&&wanted)audio.play().then(()=>mb.classList.add('on')).catch(()=>{})};
mb.onclick=()=>{if(!audio)return;if(audio.paused){wanted=true;audio.play();mb.classList.add('on')}else{wanted=false;audio.pause();mb.classList.remove('on')}};

/* hoa nở */
const fl=$('#flower');
for(let i=0;i<12;i++)fl.insertAdjacentHTML('beforeend',`<i class="p" style="--a:${i*30}deg;--d:${i*.08}s"></i>`);
for(let i=0;i<9;i++)fl.insertAdjacentHTML('beforeend',`<i class="p in" style="--a:${i*40+15}deg;--d:${.6+i*.08}s"></i>`);
fl.insertAdjacentHTML('beforeend','<i class="core"></i>');
const bud=$('#bud');let bloomed=false;
bud.onclick=()=>{if(bloomed)return;bloomed=true;playMusic();bud.classList.add('open');
  setTimeout(()=>{const[x,y]=center(fl);burst(x,y+30,undefined,32)},1500);
  setTimeout(()=>go('s-letter'),3600)};

/* những điều biết ơn */
let idx=0;const more=$('#more');
more.onclick=()=>{if(idx>=CONFIG.reasons.length)return;const d=document.createElement('div');d.className='reason';d.textContent='💗 '+CONFIG.reasons[idx++];$('#list').appendChild(d);
  const[x,y]=center(more);burst(x,y,['💗','💖','🌷'],10);d.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
  if(idx>=CONFIG.reasons.length){more.hidden=true;$('#toEnd').hidden=false}else more.textContent='Chạm để mở thêm 💌'};

/* kết */
$('#love').onclick=e=>{const[x,y]=center(e.currentTarget);burst(x,y,['💗','💖','💕','🌷'],26)};
$('#replay').onclick=()=>{bloomed=false;bud.classList.remove('open');idx=0;$('#list').innerHTML='';more.hidden=false;more.textContent='Chạm để mở một lời nhắn 💌';$('#toEnd').hidden=true;$('#toReasons').hidden=true;go('s-bloom')};