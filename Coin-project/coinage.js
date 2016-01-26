angular.module('coinageApp', []);

angular.module('coinageApp').controller('mainCtrl',function($scope){
	var change_arr =[200,100,50,20,2,1];
	$scope.coins={};
	
    $scope.rnd= function(number){
		number= Math.round(number * 100) / 100;
	    number = number * 100;
		return number;
	}
	
	$scope.convert = function(){
       var money = $scope.money;
	   
		if(money.match(/[a-oq-z]/) !== null){
			money='0';
		}
		
		if(money===""){
			   money='0';
		}
		
		money=money.replace('p','');
		
		if( money.toString().indexOf('£') != -1 && money.toString().indexOf('£')=== 0 ){
		    money=money.replace('£','');
			if(money.toString().indexOf('.') != -1){
				money=$scope.rnd(money);
			}
			 else{
		       money=money*100;
		}}
		   
		   else{
		
		     if(money.toString().indexOf('.') != -1){
			    money=$scope.rnd(money);
			 }
		   
		}
		
		
		$scope.amount=money;
		
		var result;
        var change_arr_len = change_arr.length;
        for(var i=0; i<change_arr_len;i++){
           result = parseInt(money/change_arr[i]);
           money = money % change_arr[i];
		   var j=change_arr[i],currency;
		   currency=j===200?'£2':(j===100?'£1':(j+'p'));
		   $scope.coins[currency]=result;
	    }
	 
	}

});

angular.module('coinageApp').directive('inputValidate',function(){
	  return function (scope,element,attr,ctrl){
			
			  element.bind("keydown keypress", function(event) {
				 if(event.which===13) {
			          scope.$apply(function(){
                      var func = scope.$eval(attr.inputValidate);
                      console.log(scope.$eval(attr.inputValidate));
                      func();
                    });
                    event.preventDefault();
				}
			    });
	};

});
