function submitAction() {
	document.getElementById("submitMessage").innerHTML = "Submitting...";

	var selectionTile = getSelectedTile();

	if (selectionTile !== null) {
		var xml = '<submit>';
		xml += '<playerID>' + getPlayerID() + '</playerID>';
		xml += '<gameID>' + getGameID() + '</gameID>';
		xml += '<xCoord>' + selectionTile["x"] + '</xCoord>';
		xml += '<yCoord>' + selectionTile["y"] + '</yCoord>';
		xml += '<actionType>' + selectionTile["action"] + '</actionType>';
		xml += '</submit>';

		handleDataWithPHP(xml, 'submitAction', resolveActionSubmission);
	} else {
		document.getElementById("submitMessage").innerHTML = "Please select a tile to dig above!";
	}
}

function resolveActionSubmission(response) {
	var text = "Unexpected client error!";

	var allInfo = response.getElementsByTagName("submission")[0];

	var actionDone = allInfo.getElementsByTagName("action");

	if (actionDone.length > 0) {
		text = actionDone[0].nodeValue;
		forceTimerToTime(3);
	} else {
		test = "";
		var errors = allInfo.getElementsByTagName("error");
		for (var i = 0; i < errors.length; i++) {
			if (i != 0) {
				text += "<br>";
			}
			text += errors[i].childNodes[0].nodeValue;
		}
	}

	document.getElementById("submitMessage").innerHTML = text;
}