$('document').ready(function(){
	
	var books=[
	{"Title":["Hello","World","Computer","Programming","for","Kids"],"Cost":"$4.50","Difficulty_Level":"Beginner","Link":"http://www.amazon.com/Hello-World-Computer-Programming-Beginners/dp/1933988495"},
	{"Title":["How","Computers","Work"],"Cost":"$21.79","Difficulty_Level":"Beginner","Link":"http://www.amazon.com/How-Computers-Work-9th-Edition/dp/0789736136/ref=pd_sim_14_5?ie=UTF8&refRID=0MNJ48R14HSRQ2P6GMH1"},
	{"Title":["Coding","For","Kids"],"Cost":"$3.10","Difficulty_Level":"Beginner","Link":"http://www.amazon.com/Coding-For-Kids-Childrens-programming-ebook/dp/B00RAGLUH4"},
	{"Title":["Jazzy","Fonts"],"Cost":"Free","Difficulty_Level":"Beginner","Link":"http://www.amazon.com/Jazzy-Fonts-Colorful-Computer-Programming-ebook/dp/B00TNMMD9W/ref=pd_sim_351_3?ie=UTF8&refRID=1F6FHR6YFV9NJG8GX9T8"},
	{"Title":["Computational","Fairy","Tales"],"Cost":"$3.03","Difficulty_Level":"Beginner","Link":"http://www.amazon.com/Computational-Fairy-Tales-Jeremy-Kubica-ebook/dp/B008EYHUDY/ref=pd_sim_351_4?ie=UTF8&refRID=1V2NJQVSHNYATPQCT18N"}
	];
	
	var found=0;
	
	$('.assessment').click(function(){
	$('.menu-assmnt').toggle();
	});
	
	
	$('.solution').click(function(){
	$('.menu-soltn').toggle();
	});
	
	
	$('.header a').hover(
	function(){
		$(this).css("color", "blue");
	},
	function(){
		$(this).css("color", "white");
	}
	);
	
	
	$(function() {
    $( "#tabs" ).tabs();
	});
	
	
	$(function() {
    $( "#accordion" ).accordion({
		heightStyle: "content",
		collapsible: true,
		active: false
		
	});
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
  
});