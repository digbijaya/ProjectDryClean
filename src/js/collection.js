var collectButton=document.querySelector('#collect');

function collectOrder(){
	console.log("in the function", deferredPrompt);
	if(deferredPrompt){
		deferredPrompt.prompt();

		deferredPrompt.userChoice.then(function(choiceResult){
			console.log(choiceResult.outcome);
			if(choiceResult.outcome==="dismissed")
				console.log("User cancelled installation");
			else
				console.log("User added to homescreen");
		});
		deferredPrompt = null;
	};
}

collectButton.addEventListener('click', collectOrder);