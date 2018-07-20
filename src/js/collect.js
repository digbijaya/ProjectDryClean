//var saveOfflineButton=document.querySelector("#collectOffline");

//currently not in use, allows to save caceh/asset on demand
function onSaveOfflineButtonClicked(){
	console.log("save offline clicked");
	var cloth=document.getElementsByName('clothname')[0].value;
	var desc=document.getElementsByName('description')[0].value;
	var user_name=document.getElementsByName('user[username]')[0].value;
	var user_mobile=document.getElementsByName('user[mobilenumber]')[0].value;
	if('caches' in window){
		caches.open('user-requested')
		.then(function(cache){
			cache.add(cloth);
			cache.add(desc);
			cache.add(user_name);
			cache.add(user_mobile);
		});
	}else{
		console.log("Browser isn't suppported");
	}
}
//GET
/*var networkdatareceived=false;
fetch('/orderreceive')
	.then(function(res){
		return res;
	})
	.then(function(data){
		networkdatareceived=true;
		console.log('From web', data);
	});*/
//POST
/*fetch('/orderreceive',{
	method:'POST',
	headers:{
		'Content-Type':'application/json',
		'Accept': 'application/json'
	},
	body:JSON.stringify({
		message: 'Some message'
	})
}).then(function(res){
	return res.json();
}).then(function(data){
	console.log("From post", data);
})*/

/*if('caches' in window){
	caches.match('/orderreceive')
		.then(function(response){
			if(response){
				console.log('From cache the response----', response.clone().json());
				return response.json();
			}
		})
		.then(function(data){
			if(!networkdatareceived){
				console.log('From cache the data--', data);
			}
		});
}*/

//saveOfflineButton.addEventListener('click',onSaveOfflineButtonClicked);

//unregister a serviceworker
/*fetch('/offline')
	.then(function(res){
		if('serviceWorker' in navigator){
			navigator.serviceWorker.getRegistrations()
				.then(function(registrations){
					for(var i=0;i<registrations.length;i++){
						registrations[i].unregister();
					}
				})
		}
	});*/