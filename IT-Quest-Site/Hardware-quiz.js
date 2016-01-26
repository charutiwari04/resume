$('document').ready(function(){
		
	var questions_arr=[
	["Physical components that make up your computer are known as:", "Hardware", "Software", "Operating Systems", "Web Browsers", "A"],
	["Which of the following will you require to hear music on your computer?", "Sound Card", "Video Card", "Mouse", "Joystick", "A"],
	["Which part is the brain of the computer?", "CPU", "Monitor", "RAM", "ROM", "A"],
	["Which of the following is not an input device?", "Keyboard", "Joystick", "Monitor", "Microphone", "C"],
	["Which of the following is not an output device?", "Monitor", "Printer", "Keyboard", "Speakers", "C"]
	];
	
	var pos =0, $test_num, $question, correct=0, choices, choice;
    $( "#progressbar" ).progressbar({
       value: 0,
	   max: questions_arr.length
    });
	
    
   $test_num = $("#test-num");
   $question = $("#question")
   
     
   function getQuestion() {
	   
	   if(pos >= questions_arr.length){
		   $test_num.html("Test Completed");;
		   $question.html("Your Score is: " + correct + " out of " + questions_arr.length);
		   $question.append("<br><br><div style='text-align: center; color: blue;'>Repeat Quiz</div>");
		   $question.append("<div style='text-align: center;'><a href='Hardware-quiz.html'><i class='glyphicon glyphicon-repeat' style='color: blue;'></i></a></div><br>");
		   
		   if(correct === 0){
			  $('<div />').html('You should go with Beginners courses').dialog();
		   }
		   else if(0<correct && correct<questions_arr.length){
		     $('<div />').html('You should go with Intermediate courses').dialog();
		   }
		   else if(correct===questions_arr.length){
			 $('<div />').html('You should go with Advance courses').dialog();
		   }
		   pos = 0;
		   correct = 0;
		   return false;
	   } else{
	   
       $test_num.html("Question no. " + (pos+1) + " of " + (questions_arr.length));
       $question.html(questions_arr[pos][0] +"<br><br>");
       $question.append("<input type='radio' name='choices' value='A'>" + questions_arr[pos][1] +"<br>");
	   $question.append("<input type='radio' name='choices' value='B'>" + questions_arr[pos][2] +"<br>");
	   $question.append("<input type='radio' name='choices' value='C'>" + questions_arr[pos][3] +"<br>");
	   $question.append("<input type='radio' name='choices' value='D'>" + questions_arr[pos][4] +"<br><br>");
	   $question.append("<button id='checkAnswer'>Submit Answer</button>");
	   
	   $('#checkAnswer').click(function(){
		  
		  checkAnswer(); 
	   });
	   
       }
    
  };
  
  function checkAnswer() {
	  
	   choice=$("input[name='choices']:checked").val()
	   
	   if(choice === questions_arr[pos][5]){
		
		   correct++;
		   
	   }
	   pos++;
	   $( "#progressbar" ).progressbar( "value", pos );
	   getQuestion();
   };
  
  getQuestion();
  
  
 
	
	
});