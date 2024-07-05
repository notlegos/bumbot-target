function startAllWheels (speedPercent: number) {
    neZha.setMotorSpeed(neZha.MotorList.M1, speedPercent)
    neZha.setMotorSpeed(neZha.MotorList.M2, speedPercent)
    neZha.setMotorSpeed(neZha.MotorList.M3, speedPercent * -1)
    neZha.setMotorSpeed(neZha.MotorList.M4, speedPercent * -1)
}
radio.onReceivedValue(function (name, value) {
    Connected.showUserText(1, name)
    Connected.showUserNumber(2, value)
    if (name == "joyCente") {
        neZha.stopAllMotor()
    } else if (name == "joyLeft") {
        if (value > 2) {
            setDirection(90)
            if (!(isGoing)) {
                spinAllWheels(50, 200)
                startAllWheels(70)
                isGoing = true
            }
        } else {
            if (isGoing) {
                isGoing = false
                spinAllWheels(50, 200)
                spinAllWheels(20, 200)
                spinAllWheels(10, 200)
                neZha.stopAllMotor()
            }
        }
    } else if (name == "joyRight") {
        if (value > 2) {
            setDirection(270)
            if (!(isGoing)) {
                spinAllWheels(50, 200)
                startAllWheels(70)
                isGoing = true
            }
        } else {
            if (isGoing) {
                isGoing = false
                spinAllWheels(50, 200)
                spinAllWheels(20, 200)
                spinAllWheels(10, 200)
                neZha.stopAllMotor()
            }
        }
    } else if (name == "joyUp") {
        if (value > 2) {
            setDirection(0)
            if (!(isGoing)) {
                spinAllWheels(50, 200)
                startAllWheels(70)
                isGoing = true
            }
        } else {
            if (isGoing) {
                isGoing = false
                spinAllWheels(50, 200)
                spinAllWheels(20, 200)
                spinAllWheels(10, 200)
                neZha.stopAllMotor()
            }
        }
    } else if (name == "joyDown") {
        if (value > 2) {
            setDirection(180)
            if (!(isGoing)) {
                spinAllWheels(50, 200)
                startAllWheels(70)
                isGoing = true
            }
        } else {
            if (isGoing) {
                isGoing = false
                spinAllWheels(50, 200)
                spinAllWheels(20, 200)
                spinAllWheels(10, 200)
                neZha.stopAllMotor()
            }
        }
    } else if (name == "joyButto") {
        if (value == 5) {
        	
        } else if (value == 6) {
        	
        } else if (value == 2) {
            spinAllWheels(30, 200)
            spinAllWheels(20, 200)
            spinAllWheels(10, 200)
        } else if (value == 3) {
            spinAllWheels(-30, 200)
            spinAllWheels(-20, 200)
            spinAllWheels(-10, 200)
        } else if (value == 1) {
            strip.showColor(Connected.colors(Connected.NeoPixelColors.Yellow))
            strip.setBrightness(100)
        } else if (value == 4) {
            strip.showColor(Connected.colors(Connected.NeoPixelColors.Red))
            strip.setBrightness(100)
        } else {
        	
        }
    }
})
function turnAllWheels (theAngle: number) {
    neZha.setServoAngle(neZha.ServoTypeList._360, neZha.ServoList.S1, theAngle)
    neZha.setServoAngle(neZha.ServoTypeList._360, neZha.ServoList.S2, theAngle)
    neZha.setServoAngle(neZha.ServoTypeList._360, neZha.ServoList.S3, theAngle)
    neZha.setServoAngle(neZha.ServoTypeList._360, neZha.ServoList.S4, theAngle)
}
function spinAllWheels (speedPercent: number, durationMs: number) {
    startAllWheels(speedPercent)
    basic.pause(durationMs)
    neZha.stopAllMotor()
}
function setDirection (theAngle: number) {
    if (theHeading != theAngle) {
        turnAllWheels(theAngle)
        if (theAngle == 90) {
            basic.showArrow(ArrowNames.East)
        } else if (theAngle == 180) {
            basic.showArrow(ArrowNames.North)
        } else if (theAngle == 270) {
            basic.showArrow(ArrowNames.West)
        } else {
            basic.showArrow(ArrowNames.South)
        }
    }
    theHeading = theAngle
}
let hits = 0
let lastHitWasRed = false
let isRed = false
let isGoing = false
let theHeading = 0
let strip: Connected.Strip = null
radio.setGroup(80)
Connected.oledClear()
turnAllWheels(0)
strip = Connected.create(Connected.DigitalRJPin.J3, 8, Connected.NeoPixelMode.RGB)
strip.setBrightness(255)
strip.showColor(Connected.colors(Connected.NeoPixelColors.Red))
let hitsRequired = 3
Connected.MP3SetPort(Connected.DigitalRJPin.J4)
Connected.setVolume(15)
Connected.folderPlay("01", "007")
basic.pause(2000)
strip.setBrightness(20)
strip.showColor(Connected.colors(Connected.NeoPixelColors.Yellow))
Connected.execute(Connected.playType.Stop)
theHeading = 1
setDirection(theHeading)
Connected.showUserText(4, "Heading")
Connected.showUserNumber(5, theHeading)
isGoing = false
setDirection(0)
basic.forever(function () {
    isRed = Connected.checkColor(Connected.ColorList.red)
    Connected.showUserText(8, convertToText(isRed))
    if (isRed) {
        if (hits == hitsRequired) {
            Connected.setVolume(20)
            Connected.folderPlay("01", "004")
            basic.showIcon(IconNames.Sad)
        }
        if (!(lastHitWasRed)) {
            Connected.setVolume(25)
            Connected.folderPlay("01", "001")
            basic.showIcon(IconNames.Angry)
            basic.pause(1000)
        }
        hits = hits + 1
        Connected.showUserNumber(2, hits)
    } else if (lastHitWasRed) {
        basic.showIcon(IconNames.Happy)
        hits = 0
        strip.setBrightness(20)
        strip.showColor(Connected.colors(Connected.NeoPixelColors.Yellow))
    }
    lastHitWasRed = isRed
})
