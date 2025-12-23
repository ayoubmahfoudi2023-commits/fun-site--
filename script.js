// ----------------------- المتغيرات -----------------------
let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
let level = localStorage.getItem("level") ? parseInt(localStorage.getItem("level")) : 1;
let username = localStorage.getItem("username");
if(!username){
  username = prompt("🌟 مرحبًا! أدخل اسمك للترتيب العالمي:");
  if(username) localStorage.setItem("username", username);
  else username = "Player";
}
let number = Math.floor(Math.random()*10)+1;
const rpsOptions=["✊","✋","✌️"];
const secretGames=[
  {lvl:11,name:"لعبة الغاز سريعة"},
  {lvl:15,name:"لعبة الذاكرة"},
  {lvl:20,name:"لعبة الألوان"},
  {lvl:25,name:"لعبة السرعة"}
];
const dailySurprises=[
  "🎯 تحدي اليوم: أجب على معلومة واحدة من الإنترنت للحصول على 3 نقاط!",
  "🕹️ لعبة اليوم: خمن الرقم من 1 إلى 10.",
  "💡 معلومة مفيدة: هل تعلم أن دماغ الإنسان يولد 20 واط من الكهرباء؟"
];
const weeklySurprises=[
  "🏆 تحدي الأسبوع: اجمع 50 نقطة هذا الأسبوع واحصل على مفاجأة كبرى!",
  "💡 معلومة الأسبوع: دماغ الإنسان أكثر نشاطًا أثناء النوم!"
];
const colors=[
  "linear-gradient(120deg,#1e1e2f,#f5f7fa)",
  "linear-gradient(120deg,#0f2027,#2c5364)",
  "linear-gradient(120deg,#ffecd2,#fcb69f)",
  "linear-gradient(120deg,#4ca1af,#c4e0e5)",
  "linear-gradient(120deg,#42275a,#734b6d)"
];
// ----------------------- الأصوات -----------------------
function playSound(id){ document.getElementById(id).play(); }

// ----------------------- الخلفية -----------------------
function changeBackground(){ document.body.style.background = colors[Math.floor(Math.random()*colors.length)]; }

// ----------------------- القائمة الجانبية -----------------------
function toggleMenu(){ menu.style.right = (menu.style.right=="0px")?"-250px":"0px"; }
function closeMenu(){ menu.style.right="-250px"; }

// ----------------------- النقاط والمستويات -----------------------
function saveProgress(alertMsg=true){
  localStorage.setItem("points", points);
  localStorage.setItem("level", level);
  if(alertMsg) alert("💾 تقدمك محفوظ!");
}
function addPoints(p){
  points += p; playSound("soundPoint");
  if(points >= level*level*8){
    level++; playSound("soundLevel");
    alert("🎉 لقد وصلت للمستوى " + level + "!");
    if(level===5) alert("🌟 لقد وصلت للمستوى الخامس! قم بالوصول للمستوى الخامس للحصول على ألعاب ومعلومات أكثر!");
  }
  saveProgress(false);
}

// ----------------------- الوظائف -----------------------
function home(){ closeMenu(); changeBackground();
  content.innerHTML = `<h2>🏠 الرئيسية</h2>
  <div class="progress-bar">
    <div class="progress" style="width:${Math.min(points/(level*level*8)*100,100)}%">
      ${points} نقاط - مستوى ${level}
    </div>
  </div>`;
}

function fetchFact(){ closeMenu(); changeBackground(); addPoints(2);
  content.innerHTML=`<h2>🧠 معلومة من الإنترنت</h2>
  <div class="fact">مثال: الدماغ البشري يولد طاقة كافية لتشغيل مصباح صغير!</div>
  <button class="action dark" onclick="fetchFact()">🔄 أخرى</button>`;
}

function fun(){ closeMenu(); changeBackground(); addPoints(1);
  content.innerHTML=`<h2>🎲 تسلية</h2><div class="fact">استمتع باللعب وكلما تقدمت زادت المتعة!</div>`; }

function game(){ closeMenu(); changeBackground();
  content.innerHTML = `<h2>🎮 خمن الرقم (1 - 10)</h2>
    <input id="guess" type="number" min="1" max="10"><br><br>
    <button class="action dark" onclick="check()">تحقق</button>
    <p id="result"></p>`;
}
function check(){ let g=document.getElementById("guess").value;
  if(g==number){ addPoints(3); result.innerText="🎉 صحيح!"; number=Math.floor(Math.random()*10)+1; }
  else { playSound("soundError"); result.innerText="❌ خطأ"; }
}

function rpsGame(){ closeMenu(); changeBackground();
  content.innerHTML=`<h2>✊✋✌️ حجر-ورقة-مقص</h2>
    <button class="action gold" onclick="rpsPlay('✊')">✊</button>
    <button class="action gold" onclick="rpsPlay('✋')">✋</button>
    <button class="action gold" onclick="rpsPlay('✌️')">✌️</button>
    <p id="rpsResult"></p>`;
}
function rpsPlay(user){ let comp=rpsOptions[Math.floor(Math.random()*3)]; let text="";
  if(user===comp) text="🤝 تعادل!";
  else if((user==="✊"&comp==="✌️")||(user==="✋"&comp==="✊")||(user==="✌️"&comp==="✋")){ text="🎉 فزت!"; addPoints(4);}
  else { text="❌ خسرت"; playSound("soundError");}
  rpsResult.innerText=`الكمبيوتر: ${comp} → ${text}`;
}

function progress(){ closeMenu(); changeBackground();
  content.innerHTML=`<h2>⭐ مستواك</h2>
    <div class="progress-bar">
      <div class="progress" style="width:${Math.min(points/(level*level*8)*100,100)}%">
        ${points} نقاط - مستوى ${level}
      </div>
    </div>
    <button class="action gold" onclick="saveProgress(true)">💾 حفظ التقدم</button>`;
}

function secretGamesPage(){ closeMenu(); changeBackground();
  content.innerHTML=`<h2>🎁 ألعاب سرية</h2>`;
  secretGames.forEach(g=>{ if(level>=g.lvl) content.innerHTML+=`<div class="fact">🕹️ ${g.name}</div>`; });
}

function dailySurprise(){ closeMenu(); changeBackground();
  const today = new Date(); const index=today.getDate()%dailySurprises.length;
  const surprise = dailySurprises[index];
  content.innerHTML=`<h2>🎁 مفاجأة اليوم</h2><div class="fact">${surprise}</div>
    <button class="action gold" onclick="dailySurprise()">🔄 أخرى اليوم</button>`;
  addPoints(2);
}

function weeklySurprise(){ closeMenu(); changeBackground();
  const weekNumber=Math.floor(new Date().getDate()/7); const index=weekNumber%weeklySurprises.length;
  const surprise = weeklySurprises[index];
  content.innerHTML=`<h2>🎊 مفاجأة الأسبوع</h2><div class="fact">${surprise}</div>
    <button class="action gold" onclick="weeklySurprise()">🔄 أخرى هذا الأسبوع</button>`;
  addPoints(5);
}

function share(){ closeMenu(); navigator.clipboard.writeText("جرب موقع ممتع 3.0 | ayoub mahfoudi"); alert("📤 تم نسخ رابط المشاركة!"); }
function about(){ closeMenu(); content.innerHTML=`<h2>ℹ️ عن الموقع</h2><p>موقع ممتع مليء بالمعلومات والألعاب والمفاجآت اليومية والأسبوعية!</p><p>الموقع من تصميم <b>ayoub mahfoudi</b> 💙</p>`;}
function leaderboard(){ closeMenu(); changeBackground(); content.innerHTML=`<h2>🏆 الترتيب العالمي</h2><p>⚠️ سيتم تفعيل الترتيب العالمي لاحقًا باستخدام JSON أو Firebase</p>`;}