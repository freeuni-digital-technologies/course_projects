function makeChristmasTree() {
	const currentTree = JSON.parse(localStorage.getItem('current_tree')) || 0
	window.currentTree = currentTree
	const config = configs[currentTree]
	config.lightRadius = 5
	window.config = config
	createTrunk()
	addLights()
	displayMessage()
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
       	if (e.shiftKey) {
       		nextTree()
       	} else {
       		previousTree()
       	}
    }
}

function nextTree() {
	let currentTree = window.currentTree
	if(currentTree < configs.length) {
		window.currentTree = currentTree++
		localStorage.setItem('current_tree', JSON.stringify(currentTree))
		launch()
	}
}

function previousTree() {
	let currentTree = window.currentTree
	if (currentTree > 0) {
		window.currentTree = currentTree--
		localStorage.setItem('current_tree', JSON.stringify(currentTree))
		launch()
	}
}