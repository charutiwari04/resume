$('document').ready(function(){
	
	var questions_arr=[
	["Which option is used to check the conditions in a program?", "check-stop", "condition-check", "if-else", "none", "C"],
	["What is an array", "Group of strings", "Group of numbers", "Group of alphabets", "All of the above", "D"],
	["A variable in a program is name for which", "value changes automatically", "value can be assigned and changed by coder", "value does not change", "value can be changed by anyone", "B"]
	];
	
	var questions_arr_hardware=[
	["Physical components that make up your computer are known as:", "Hardware", "Software", "Operating Systems", "Web Browsers", "A"],
	["Which of the following will you require to hear music on your computer?", "Sound Card", "Video Card", "Mouse", "Joystick", "A"],
	["Which part is the brain of the computer?", "CPU", "Monitor", "RAM", "ROM", "A"],
	["Which of the following is not an input device?", "Keyboard", "Joystick", "Monitor", "Microphone", "C"],
	["Which of the following is not an output device?", "Monitor", "Printer", "Keyboard", "Speakers", "C"]
	];
	
	var books=[
	{"Title":["Hello","World","Computer","Programming","for","Kids"],"Cost":"$4.50","Difficulty_Level":"Beginner","Link":"http://www.amazon.com/Hello-World-Computer-Programming-Beginners/dp/1933988495"},
	{"Title":["How","Computers","Work"],"Cost":"$21.79","Difficulty_Level":"Beginner","Link":"http://www.amazon.com/How-Computers-Work-9th-Edition/dp/0789736136/ref=pd_sim_14_5?ie=UTF8&refRID=0MNJ48R14HSRQ2P6GMH1"},
	{"Title":["Coding","For","Kids"],"Cost":"$3.10","Difficulty_Level":"Beginner","Link":"http://www.amazon.com/Coding-For-Kids-Childrens-programming-ebook/dp/B00RAGLUH4"},
	{"Title":["Jazzy","Fonts"],"Cost":"Free","Difficulty_Level":"Beginner","Link":"http://www.amazon.com/Jazzy-Fonts-Colorful-Computer-Programming-ebook/dp/B00TNMMD9W/ref=pd_sim_351_3?ie=UTF8&refRID=1F6FHR6YFV9NJG8GX9T8"},
	{"Title":["Computational","Fairy","Tales"],"Cost":"$3.03","Difficulty_Level":"Beginner","Link":"http://www.amazon.com/Computational-Fairy-Tales-Jeremy-Kubica-ebook/dp/B008EYHUDY/ref=pd_sim_351_4?ie=UTF8&refRID=1V2NJQVSHNYATPQCT18N"}
	];
	
	var found=0;
	
	var pos =0, pos_hardware=0, $test_num, $question, $test_num_hardware, $question_hardware, correct_hardware=0, correct=0, choices_hardware, choices, choice_hardware, choice;
	
    $( "#progressbar" ).progressbar({
       value: 0,
	   max: questions_arr.length
    });
	
	$( "#progressbar-hardware" ).progressbar({
       value: 0,
	   max: questions_arr_hardware.length
    });
	
	
	   
	$test_num = $("#test-num");
    $question = $("#question");
	$test_num_hardware = $("#test-num-hardware");
    $question_hardware = $("#question-hardware");
    
   
   
   function getQuestion() {
	   
	   if(pos >= questions_arr.length){
		   $test_num.html("Test Completed");
		   $question.html("Your Score is: " + correct + " out of " + questions_arr.length);
		   $question.append("<br><br><div style='text-align: center; color: blue;'>Repeat Quiz</div>");
		   $question.append("<div id='repeat-icon' style='text-align: center;' data-ajax='false'><i class='fa fa-repeat'  style='color: blue;'></i></div>");
		   $('#repeat-icon').click(function(){
			       location.reload();
           });
		   		   
		   if(correct === 0){
			  $('#popupBegin').popup('open');
		   }
		   else if(0<correct && correct<questions_arr.length){
		      $('#popupInter').popup('open');
		   }
		   else if(correct===questions_arr.length){
			  $('#popupAdvn').popup('open');
		   }
		   pos = 0;
		   correct = 0;
		   return false;
	   } else{
	   
       $test_num.html("Question no. " + (pos+1) + " of " + (questions_arr.length));
       $question.html(questions_arr[pos][0] +"<br><br>");
       $question.append("<input type='radio' name='choices' id='radio-choise-1' value='A'>");
	   $question.append("<label for='radio-choise-1'>" + questions_arr[pos][1] + "</label>");
	   $question.append("<input type='radio' name='choices' id='radio-choise-2' value='B'>");
	   $question.append("<label for='radio-choise-2'>" + questions_arr[pos][2] + "</label>");
	   $question.append("<input type='radio' name='choices' id='radio-choise-3' value='C'>");
	   $question.append("<label for='radio-choise-3'>" + questions_arr[pos][3] + "</label>");
	   $question.append("<input type='radio' name='choices' id='radio-choise-4' value='D'>");
	   $question.append("<label for='radio-choise-4'>" + questions_arr[pos][4] + "</label>");
	   $question.append("<button id='checkAnswer'>Submit Answer</button>").trigger("create");
	   	   
	   
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
  
  
  function getQuestion_hardware() {
	   
	   if(pos_hardware >= questions_arr_hardware.length){
		   $test_num_hardware.html("Test Completed");
		   $question_hardware.html("Your Score is: " + correct_hardware + " out of " + questions_arr_hardware.length);
		   $question_hardware.append("<br><br><div style='text-align: center; color: blue;'>Repeat Quiz</div>");
		   $question_hardware.append("<div id='repeat-icon' style='text-align: center;' data-ajax='false'><i class='fa fa-repeat'  style='color: blue;'></i></div>");
		   $('#repeat-icon').click(function(){
			       location.reload();
           });
		   		   
		   if(correct_hardware === 0){
			  $('#popupBeginH').popup('open');
		   }
		   else if(0<correct_hardware && correct_hardware<questions_arr_hardware.length){
		      $('#popupInterH').popup('open');
		   }
		   else if(correct_hardware===questions_arr_hardware.length){
			  $('#popupAdvnH').popup('open');
		   }
		   pos_hardware = 0;
		   correct_hardware = 0;
		   return false;
	   } else{
	   
       $test_num_hardware.html("Question no. " + (pos_hardware+1) + " of " + (questions_arr_hardware.length));
       $question_hardware.html(questions_arr_hardware[pos_hardware][0] +"<br><br>");
       $question_hardware.append("<input type='radio' name='choices_hardware' id='radio-chois-1' value='A'>");
	   $question_hardware.append("<label for='radio-chois-1'>" + questions_arr_hardware[pos_hardware][1] + "</label>");
	   $question_hardware.append("<input type='radio' name='choices_hardware' id='radio-chois-2' value='B'>");
	   $question_hardware.append("<label for='radio-chois-2'>" + questions_arr_hardware[pos_hardware][2] + "</label>");
	   $question_hardware.append("<input type='radio' name='choices_hardware' id='radio-chois-3' value='C'>");
	   $question_hardware.append("<label for='radio-chois-3'>" + questions_arr_hardware[pos_hardware][3] + "</label>");
	   $question_hardware.append("<input type='radio' name='choices_hardware' id='radio-chois-4' value='D'>");
	   $question_hardware.append("<label for='radio-chois-4'>" + questions_arr_hardware[pos_hardware][4] + "</label>");
	   $question_hardware.append("<button id='checkAnswer_hardware'>Submit Answer</button>").trigger("create");
	   	   
	   
	   $('#checkAnswer_hardware').click(function(){
		  
		  checkAnswer_hardware(); 
	   });
	   
       }
    
  };
  
  function checkAnswer_hardware() {
	  
	   choice_hardware=$("input[name='choices_hardware']:checked").val()
	   
	   if(choice_hardware === questions_arr_hardware[pos_hardware][5]){
		
		   correct_hardware++;
		   
	   }
	   pos_hardware++;
	   $( "#progressbar-hardware" ).progressbar( "value", pos_hardware );
	   
	   getQuestion_hardware();
   };
  
  getQuestion_hardware();
	
	$("#owl-demo").owlCarousel({
 
      navigation : true, 
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
 
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
 
  });
  
  
  function runSearch(){
	    var count=0;    
		var user_input = $('#search-terms').val();
		var length_arr = books.length;
		for(var i=0; i<length_arr; i++){
			var length_title = books[i].Title.length;
			 for (var j=0; j<length_title; j++) {
			    if(user_input.toLowerCase() === books[i].Title[j].toLowerCase()){
				  count++;  
				  var $title=books[i].Title.toString().replace(/,/g, ' ');
				  $('tbody').append("<tr><td>" + count + "</td><td>" + $title + "</td><td>" + books[i].Cost + "</td><td>" + books[i].Difficulty_Level + "</td><td><a style='color: blue;' href=" + books[i].Link + ">link</a></td></tr>");
				  found++;	
				  
		 		} 
			 }
		}
		return found;
  }
  
  $('#search-container').on('keyup', function(ev){
        var ENTER_KEY = 13;
		
        if (ev.keyCode == ENTER_KEY){
           
		   $('tbody').html('');
		   var result=runSearch();
		   if(found===0){
			   $('tbody').append('Not Found!!! Try another search');
           }
		   found=0;
		}
		
  });
  // Causes error in the console
  //$("#contact-form").validate(); 
  
  $('#close-button').click(function() {
      $('.ui-dialog').dialog('close');
  });
  
  $("#submit-button").click(function (){
      $("#contact-form").submit()
  });
  
  $('.icon_search').click(function(){
	 $.mobile.changePage('#Search'); 
  });
  
	
});
