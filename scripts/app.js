const billInput = document.querySelector("input.bill")
const selectTipInput = document.querySelectorAll('button.percent')
const customTipInput = document.querySelector('input.custom')
const numberOfPeopleInput = document.querySelector("input.people")
const tipAmountResult = document.querySelector(".tip-person")
const totalResult = document.querySelector(".total-person")
const buttonResetTag = document.querySelector("button.reset")
const warningMessage = document.querySelectorAll("div.warning-message")

const data = {
    billTotal: 0,
    tipPercent: 0,
    numberOfPeople: 0,
    get tipAmount() {
        if (this.billTotal > 0 && this.tipPercent > 0) {
            return this.billTotal * this.tipPercent
        } else {
            return 0
        }
    },
    get billPerPerson() {
        if (this.billTotal > 0 && this.numberOfPeople > 0) {
            return this.billTotal / this.numberOfPeople
        } else {
            return 0
        }
    },
    get tipPerPerson() {
        if (this.tipAmount > 0 && this.numberOfPeople > 0) {
            return this.tipAmount / this.numberOfPeople
        } else {
            return 0
        }
    },
    get totalPerPerson() {
        if (this.billPerPerson > 0) {
            return this.billPerPerson + this.tipPerPerson
        } else {
            return 0
        }
    }
}

// Sets the billTotal in the data obj to the bill input value
const billValue = () => {

    if (billInput.value > 0 || billInput.value == '') {
        billInput.classList.add("active")
        data.billTotal = parseFloat(billInput.value)
        setTipTotal()
    } else if (billInput.innerHTML == 0) {
        warningMessage[0].style.opacity = 1
        setTimeout(function () {
            warningMessage[0].style.opacity = 0
        }, 3000)
    } else {
        billInput.classList.remove("active")
        billInput.value = 0
    }
}

// Sets the numberOfPeople input in the obj to the number of people value
const numPeopleValue = () => {
    if (numberOfPeopleInput.value > 0 || numberOfPeopleInput.value == '') {
        numberOfPeopleInput.classList.add("active")
        data.numberOfPeople = parseFloat(numberOfPeopleInput.value)
        setTipTotal()
    } else if (numberOfPeopleInput.value == 0) {
        warningMessage[1].style.opacity = 1
        billInput.classList.add("warning")
        setTimeout(function () {
            warningMessage[1].style.opacity = 0
            billInput.classList.remove("warning")
        }, 3000)
    } else {
        numberOfPeopleInput.classList.remove("active")
        numberOfPeopleInput.value = 0
    }

}

// Calculates the tip amounts and sets it to the tipPercent obj
const calculateTip = (event) => {
    selectTipInput.forEach(btn => {
        // Checks if the event target = the value inside the btn tag
        if (event.target.innerHTML == btn.innerHTML) {
            // And sets in the object
            data.tipPercent = parseFloat(btn.innerHTML) / 100;
            btn.classList.add("active")
            // Resets custom value
            customTipInput.value = "Custom"
            customTipInput.classList.remove("active")
            setTipTotal()
        } else {
            btn.classList.remove("active")
        }
    })
}

// Calculates the custom tip and sets it to the tipPercent obj
const calculateCustomTip = () => {

    if (customTipInput.value > 0) {
        selectTipInput.forEach(btn => {
            btn.classList.remove("active")
        })
        customTipInput.classList.add("active")
        data.tipPercent = parseFloat(customTipInput.value / 100)
        setTipTotal()
    } else {
        customTipInput.value = "Custom"
    }
}

// Resets all values to normal
const reset = () => {
    // Clear styles
    selectTipInput.forEach(input => {
        input.classList.remove("active")
    })
    buttonResetTag.setAttribute("disabled", "true");
    // Set data obj values to 0
    for (value in data) {
        data[value] = 0
    }
    // Set input values to 0
    billInput.value = 0
    numberOfPeopleInput.value = 0
    customTipInput.innerHTML = "Custom"
    tipAmountResult.innerHTML = `$${data.tipPerPerson.toFixed(2)}`
    totalResult.innerHTML = `$${data.totalPerPerson.toFixed(2)}`
}

// Takes the values from the object and inserts it into the inner HTML tag
const setTipTotal = () => {
    buttonResetTag.removeAttribute("disabled");
    tipAmountResult.innerHTML = `$${data.tipPerPerson.toFixed(2)}`
    totalResult.innerHTML = `$${data.totalPerPerson.toFixed(2)}`
}

// Click Events

billInput.addEventListener("input", billValue)

customTipInput.addEventListener("input", calculateCustomTip)

numberOfPeopleInput.addEventListener("input", numPeopleValue)

selectTipInput.forEach(btn => {
    btn.addEventListener("click", calculateTip)
})

buttonResetTag.addEventListener("click", reset)