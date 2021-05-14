var rule=document.querySelector('.rule');
var timer=document.querySelector('.timer');
var Score=document.querySelector('.score');
var game=document.createElement("table");
var stat=0;//0:rules, 1:start, 2:end
var Ans='';//player answer
var ans=0;//correct answer
var Answer=document.getElementById("Answer");
var yourAns=document.querySelector('.yourAns');
var score=0,fscore=0;//AC WA
var t=0,T,Ttime=60;//total time (in sec)
var minn=6,maxn=10;//食物最少項數、最多項數
var minp=69,maxp=119;//價格
var minq=8,maxq=10;//數量
//選擇難度
var mode=document.querySelector('.mode');
var Mode=Number(mode.value);
function modeChange()
{
	Mode=Number(mode.value);
}
function inputAns()
{
	Ans=Answer.value;
}
function checkAns()
{
	if(Number(Ans)==ans)
	{
		score++;
		genProb();
	}
	else fscore++;
	upd();
}
function start()
{
	stat=1;
	Answer.type="number";
	Answer.focus();
	mode.disabled=true;
	
	score=fscore=0;
	//start timer
	t=0;
	T=setInterval(tupd,100);
	genProb();
	upd();
}
function end()
{
	while(game.rows.length) game.deleteRow(0);
	stat=2;
	Answer.value="reset";
	Answer.type="hidden";
	mode.disabled=false;
	clearInterval(T);
	rule.textContent='按R重新開始';
	//game.textContent='';
	timer.textContent='';
	Score.innerHTML='Score: '+(fscore<10?String(score):'0')+'<br>AC: '+String(score)+', WA: '+String(fscore);
	yourAns.textContent='';
}
function genProb()//generate problem
{
	if(Mode>1){ans=-1;return;}
	
	//set the problem and answer here
	while(game.rows.length) game.deleteRow(0);
	game.align='center';
	if(Mode>1) game.innerHTML="外加10%服務費";//
	var food=Math.floor(Math.random()*(maxn-minn+1)+minn);
	//var drink=Math.floor(Math.random()*(maxn-minn+1)+minn);
	var th=game.insertRow();
	var header=['編號','原價','數量','優惠'];
	for(var i=0;i<(Mode==1?3:4);i++)
	{
		var headerCell=document.createElement("th");
		headerCell.innerHTML=header[i];
		th.appendChild(headerCell);
	}
	//create the table of food and drinks
	ans=0;
	for(var i=0;i<food;i++)
	{
		var row=game.insertRow();
		//編號
		var node=row.insertCell();
		node.innerHTML=(i+1);
		//原價
		node=row.insertCell();
		var price=Math.floor(Math.random()*(maxp-minp+1)+minp);
		node.innerHTML=price;
		//數量
		node=row.insertCell();
		var quantity=Math.floor(Math.random()*(maxq-minq+1)+minq);
		node.innerHTML=quantity;
		ans+=price*quantity;
		//優惠
		if(Mode>1)
		{
			
		}
	}
	/*
	<tr>
		<th>品名</th>
		<th>原價</th>
		<th>數量</th>
		<th>優惠</th>
	</tr>
	<tr>
		<td>食物A</td>
		<td>40</td>
		<td>5</td>
		<td>無</td>
	</tr>
	*/
	document.getElementById("game").appendChild(game);
}
function upd()//update
{
	Score.innerHTML='AC: '+String(score)+', WA: '+String(fscore);
	yourAns.textContent='Your ans = '+Ans;//just for testing the result
	rule.textContent='按T送出答案';
}
function tupd()//time update
{
	t++;
	timer.textContent='Time: '+String((Ttime-t/10).toFixed(1));
	if(t>=Ttime*10) end();
	if(fscore>=10) end();
}
document.addEventListener('keydown', function(evt)
{
	//start game
	if(evt.code=='KeyR'&&Mode)
	{
		end();
		start();
		return;
	}
	//submit answer
	if(evt.code=='KeyT'&&stat==1)
	{
		inputAns();
		checkAns();
		Answer.value="reset";
		return;
	}
})
/**
To-do list:
1. genProb();
2. intructions(rules)
//3. time=60sec?
**/