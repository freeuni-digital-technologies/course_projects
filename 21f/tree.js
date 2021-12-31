// ამოაკომენტარე ქვემოთა ოთხი ხაზი
// function makeChristmasTree() {
// 	createTrunk()
// 	addLights()
// }

// /** 
//  * გაითვალისწინეთ, რომ ამ ფუნქციის გარდა ყველა სხვა ცვლილება სერვერზე არ აისახება
//  * 
//  */
// function createConfig() {
// 	return	{
// 		triangleCount: 2, // 3-დან 6-მდე
// 		// ქვედა სამკუთხედის რადიუსი
// 		startingRadius: 79, // 80-დან 120-მდე
// 		// ამდენით შემცირდება ყოველი მომდევნო სამკუთხედის რადიუსი (ზომა)
// 		radiusOffset: 1, // 5-დან  15-მდე
// 		// "ზემოდან ჩამოსვლის" ეფექტისთვის
// 		startingY: 0, // -50 -დან  -200 -მდე
// 		// რა მანძილი იყოს სამკუთხედებს შორის
// 		yOffset: 0, // 30-დან  40-მდე
// 		// ამ სიაში დამატებული ფერებით მონაცვლეობით 
// 		// გაფერადდება ნაძვის ხის "შუქები" (წრეები)
// 		lightColors: ['#222222', '#222222'], // შეცვალე ფერები და დაამატე კიდევ 1-2 ფერი
// 		// წვერში ნათურის ფერი. 
// 		topLightColor: '#222222',
// 		// უსურვე რამე შენს კურსელებს. მესიჯი გამოჩნდება სიტყვა "გისურვებ"-ის შემდეგ
// 		message: "ბედნიერ 2022 წელს",
// 		trunkStartingColor: {
// 			red: 50,
// 			green: 50,
// 			blue: 50
// 		},
// 		// ყოველ ჯერზე ამდენით გაღიავდება/გამუქდება ფერი
// 		// გახადე ეს მნიშვნელობა უარყოფითი, თუ გინდა, რომ ზედა სამკუთხედები გამუქდეს
// 		trunkGradation: 0 // -50 -დან 50-მდე
// 	}
// }

// const config = createConfig()

function createTrunk() {
	for (let i = 0; i < config.triangleCount; i++) {
		addTrunk(i)
	}
}

function addLights() {
	for (let i = 0; i < config.triangleCount + 1; i++) {
		addLight(i)
	}
	addTopLight()
}

function addTrunk(i) {
	let color = getTrunkColor(i)
	let radius = getRadius(i)
	let triangle = new Triangle(0, config.startingY + getY(i), radius, 1)
	triangle.setColor(color)
	animate({
		targets: triangle,
		y: getY(i),
	})
}


function addLight(i) {
	let radius = getRadius(i)
	// რაც უფრო მაღლაა, უფრო ცოტა ნათურა გვინდა
	let distanceX = getXDistance(radius, config.triangleCount + 2 - i)
	let distanceY = getYDistance(radius, 1)
	let yPos = getY(i)
	let lightCount = 0
	let lightsYCoordinate = getLightsYCoordinate(i);
	// ამ  ხაზს ვინც სწორად დაწერთ ბონუს ქულას მიიღებთ (ნათურები რომ 
	// არ იყოს აცდენილი). უბრალოდ უნდა დაიანგარიშოთ yOffset*i და გამოაკლოთ
	// ჯამში i-მდე რადიუსის ცვლილებები
	// მეილზე მომწერეთ თუ გააკეთებთ და პირველი რამდენიმე მიიღებს ბონუსს.
	for (let x = -radius + distanceX/2; x < radius; x += distanceX) {
		let light = new Light(x, lightsYCoordinate, config.lightRadius, 0)
		lightCount++
		light.setColor(getLightColor(lightCount))
		animate({
			targets: light,
			scale: 1
		})
	}
}

function getLightsYCoordinate(i) {
	return getY(i) + getRadius(i) / 2 + config.lightRadius
}

function addTopLight() {
	let topY = getTopY()

	let light = new Light(0, topY, config.lightRadius, 0)

	light.setColor(config.topLightColor)

	animate({
		targets: light,
		scale: 1
	})
}


function getTrunkColor(i) {
	let red = config.trunkStartingColor.red + (i*config.trunkGradation) % 255
	let green = config.trunkStartingColor.green + (i*config.trunkGradation) % 255
	let blue = config.trunkStartingColor.blue + (i*config.trunkGradation) % 255
	return `rgb(${red}, ${green}, ${blue})`
}


function getLightColor(i) {
	return config.lightColors[i % config.lightColors.length]
}

function getXDistance(radius, count) {
	return 2*radius/count
}

function getYDistance(radius, count) {
	return  2*radius/count
}

function getRadius(i) {
	return config.startingRadius - i*config.radiusOffset
}

function getTopY() {
	return getY(config.triangleCount) - getRadius(config.triangleCount)/2
}

function getY(i) {
	return getRadius(i) - i*config.yOffset	
}


// ამ ფუნქციას ჩვენ გამოვიძახებთ სხვა ფაილიდან საჭირო დროს :)
function displayMessage() {
	document.getElementById('message').innerHTML = 'გისურვებ ' + config.message
	// new Message(0, getY(0) + 100, 'გისურვებ ' + config.message)
}