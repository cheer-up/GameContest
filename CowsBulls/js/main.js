var UIContoller = (function() {
    var DomString = {
        input: ".answer-form__input",
        resultContainer: ".result",
        resultElement: ".result__el",
        rules: ".rules"
    }
    return {
        getDOMstrings: function() {
            return DomString;
        },
        getInput: function() {
            return document.querySelector(DomString.input).value;
        },
        insertElement: function(number, result) {
            var elementHTML = '<div class="result__el"></div>';
            var numHTML = '<span class="result__num">%num%</span> ';
            var cowHTML = ' <span class="result__cow"></span>';
            var bullHTML = ' <span class="result__bull"></span>';
            document.querySelector(DomString.resultContainer).insertAdjacentHTML("afterbegin", elementHTML);
            numHTML = numHTML.replace("%num%", number);
            var element = document.querySelector(DomString.resultElement);
            element.insertAdjacentHTML("afterbegin", numHTML);

            for (var i = 0; i < result.bulls; i++) {
                element.insertAdjacentHTML("beforeend", bullHTML);
            }
            for (var i = 0; i < result.cows; i++) {
                element.insertAdjacentHTML("beforeend", cowHTML);
            }
        },
        hideRules: function() {
            document.querySelector(DomString.rules).className += " rules-hide";
        }

    }

})();

var controller = (function(UICtrl) {
    var number = "1234";


    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.input).addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                UICtrl.hideRules();
                checkAnswer();
            }
        });
        document.querySelector(DOM.rules).addEventListener('click', function() {
            document.querySelector(DOM.rules).classList.toggle("rules-hide");
        })


    };


    var countCowsBulls = function(input) {
        var Cows = 0,
            Bulls = 0;
        var flagOne = new Uint8Array(10);
        var flagTwo = new Uint8Array(10);
        for (var i = 0; i < 4; i++) {
            if (number[i] === input[i]) {
                Bulls++;
            } else {
                flagOne[number[i]]++;
                flagTwo[input[i]]++;
            }
        }
        for (var i = 0; i < 10; i++) {
            Cows += Math.min(flagOne[i], flagTwo[i]);
        }
        return {
            cows: Cows,
            bulls: Bulls
        }
    }


    var checkAnswer = function() {
        var answer = UICtrl.getInput();
        if (answer === number) {
            alert("You are right");
        } else {
            var result = countCowsBulls(answer);
            UICtrl.insertElement(answer, result);
        }
    };

    var setNumber = function() {
        number = String(Math.floor((Math.random() * 9000)) + 1000);
    };


    return {
        init: function() {
            setNumber();
            setupEventListeners();
        }
    }
})(UIContoller);


controller.init();