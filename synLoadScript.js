function synLoadScript(callback){
		var hm = document.createElement("script");
		var url = "//127.0.0.1:8080/wasu_bp_collect/js.js?A1234567890|js|100522";
		hm.src = url +"|"+ encodeURIComponent(window.location.href);
		var s = document.getElementsByTagName("script")[0]; 
		s.parentNode.insertBefore(hm, s);

		/*if(callback){
			alert(3);
			if (hm.readyState) {
				alert(2);
	            hm.onreadystatechange = function() {  
	                var state = this.readyState;  
	                if (state === 'loaded' || state === 'complete') {  
	                	alert(5);
	                    callback();  
	                }  
	            }  
	        } else {
	        	alert(1);
	            hm.onload = function() {  
	                callback();  
	            }  
	        } 
		}else{
			alert(4);
		}*/
		
	}