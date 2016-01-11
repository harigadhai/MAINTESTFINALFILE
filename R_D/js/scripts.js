$(document).ready(function(){
		$("#submitForm").click(function(){
		//get the value from input box
			var username=$("#userName").val();
			var userAge=$("#userAge").val();
			var userDOB=$("#userDOB").val();
			var userQualification=$("#userQualification").val();
			var userEmail=$("#userEmail").val();
			
		//validation for name
			if (isEmpty(username)) {
				errorHighlight("userName");
				appendError("userName","Please enter your Name");
				return false;
			}
			
		//validation for age
			if (isEmpty(userAge)) {
				errorHighlight("userAge");
				appendError("userAge","Please enter your Age");
				return false;
			}
			if(isNaN(userAge)){
				errorHighlight("userAge");
	   			appendError("userAge","Please enter only digits");
	   			 return false;
	   		}
			
		//validation for DOB
			if (isEmpty(userDOB)) {
				errorHighlight("userDOB");
				appendError("userDOB","Please enter your date of birth");
				return false;
			}
			if(isValidDOF(userDOB)){
				errorHighlight("userDOB");
				appendError("userDOB","Please enter valid date");
				return false;
			}
			
		//validation for Qualification
			if (isEmpty(userQualification)) {
				errorHighlight("userQualification");
				appendError("userQualification","Please enter your qualification");
				return false;
			}
			
		//validation for Email
			if (isEmpty(userEmail)) {
				errorHighlight("userEmail");
				appendError("userEmail","Please enter your email");
				return false;
			}
			
			if(isValidEmail(userEmail)){
				errorHighlight("userEmail");
				appendError("userEmail","Please enter valid email");
				return false;
			}
			
		//clear input field after submit the form
			$("input[type=text]").val("");
			
		//inser the text into new div
			$("#resultUserName").text(username);
			$("#resultUserAge").text(userAge);
			$("#resultUserDOB").text(userDOB);
			$("#resultUserQualification").text(userQualification);
			$("#resultUserEmail").text(userEmail);
			$("#resultHolder").slideDown();
		});
		
	//onfocus on input box to remove the errors
		$("input").focus(function(){
			if($(this).hasClass("errorBorder")){
				$(this).removeClass("errorBorder");
				$(".errorMsg").text("").end().hide();
				$(".errorMsg").hide();
			}
		});
		
	//click more/less to expand and minimise the div	
		$("#moreLessLink a").click(function(){
			if($(".newParagraph").height()==160){
				$(".newParagraph").css("height","auto");
				$("#moreLessLink a").text("Less");
			}else{

				$(".newParagraph").height(160);
				$("#moreLessLink a").text("More");
			}
		});
		
	//click close button to close the resultHolder 	
		$(".close").click(function(){
			$("#resultHolder").slideUp();
		});
});
	
	//functions
	function isEmpty(elemVal) {
		return elemVal == null || elemVal == "" ? true : false;
	}
	
	function errorHighlight(elemId) {
		$("#" + elemId).addClass("errorBorder");
	}
	function isValidDOF(str){
		var ageRegExp=/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d+$/;
		if (!ageRegExp.test(str)){
			    return true;
			}
	}
	function appendError(inputId,text){
		var parentelem=$("#"+inputId).parent();
		$(parentelem).find('.errorMsg').text(text).slideDown();
   }
	 function isValidEmail(str) {
			var emialRegExp=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			if (!emialRegExp.test(str)){
			    return true;
			}
	}