
var pos = 0, test, test_status, question, choice, choices, correct = 0;
var maxtimelimit = 20, timelimit = maxtimelimit;
var questionArray = [];
var curtime =0 ;
var allTime=0;
var use = 0;
function _(x){
	return document.getElementById(x);
}
var count  =0;
function renderQuestion(){
	test = _("test");
	if(pos >= count){
		test.innerHTML = "<p1>You got "+correct+"from "+use+"</p1>"+"<p>Time"+allTime+"seconds"+"</p>";

		_("test_status").innerHTML = "Test Completed";
		pos = 0;
		count=0;
		correct = 0;
    curtime=0;
    allTime =0;
		use = 0;
      clearInterval(myVar);
			test.innerHTML += "<button id='btn0' onclick='myFunction()'>"+"GO 10 QUESTIONS"+"</button>";
			test.innerHTML += "<button id='btn1' onclick='myFunction()' >"+"GO 20 QUESTIONS"+"</button>";
			click();
		return false;
	}
	_("test_status").innerHTML = "Questdion "+(pos+1)+" of "+count;
	question = questionArray[pos].subject;
	chA = questionArray[pos].a	;
	chB = questionArray[pos].b;
	chC = questionArray[pos].c;
	chd = questionArray[pos].d;



		test.innerHTML = "<h3>"+question+"</h3>";
	test.innerHTML += "<input type='radio' name='choices' value='a'> "+chA+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='b'> "+chB+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='c'> "+chC+"<br>";
	test.innerHTML += "<input type='radio' name='choices'  value='d'> "+chd+"<br><br>";
	test.innerHTML += "<button onclick='checkAnswer()'>Submit</button>";
  test.innerHTML += "<h2 id='timeleft'>"+"Timeleft "+"</h2>";
	if(question == "what is this?"){
		test.innerHTML += "<img id='myImg' src='doraemon.jpg' width='107' height='98'>";
	}
  timelimit = maxtimelimit;
  clearInterval(myVar);
  startTimer();
}
function $_(IDS) { return document.getElementById(IDS); }

function checkAnswer(){
	choices = document.getElementsByName("choices");
	for(var i=0; i<choices.length; i++){
		if(choices[i].checked){
			choice = choices[i].value;
		}
	}

	if(choice == questionArray[pos].ans&& timelimit > 0){
		correct++;
	}
  else if(choice == questionArray[pos].ans&& timelimit > 0){
    correct = correct;
  }
	pos++;
	renderQuestion();

}
function click() {

    var button = document.getElementById("btn0");
      button.onclick = function() {
        if(count === 0){
        count = 10;
        myFunction();
      	 renderQuestion(count);
       }
      }
		var button = document.getElementById("btn1");
	 button.onclick = function() {
		 if(count === 0){
			 count = 20;
			 myFunction();
			renderQuestion(count);
	 }
	 use = count;
  }


};
function myFunction() {
    document.getElementById("btn0").style.visibility = "hidden";
    document.getElementById("btn1").style.visibility = "hidden";

}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}
var myVar;
function startTimer() {
  myVar = setInterval(function(){myTimer()},1000);
  timelimit = maxtimelimit;
}
function myTimer() {
  if (timelimit > 0) {
    curmin=Math.floor(timelimit/60);
    cursec=timelimit%60;
    if (curmin!=0) {
      curtime=curmin+" minutes and "+cursec+" seconds left";
     }
     else {
        curtime=cursec+" seconds left";
       }
    $_('timeleft').innerHTML = curtime;
  } else {
    $_('timeleft').innerHTML = timelimit+' - Out of Time - no credit given for answer';
    clearInterval(myVar);
  }
  allTime= allTime+1;
  timelimit--;
}

 if(questionArray.length < 1){
        //console.log(questions);
        $(document).ready(function(){
            console.log('READY');
            $.ajax({
                url: 'data.json',
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    for (let i of response){
                    	var pick =  new Question(i.question , i.choice.a , i.choice.b, i.choice.c, i.choice.d , i.ans);
                       	questionArray.push(pick);
                    }
             //       randomQuestion(questions);
          shuffle(questionArray);
					console.log(questionArray);
                    //populate();
                }
            });
        });
    }

click();
