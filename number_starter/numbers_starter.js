/**
 * Fetches trivia about a number a user inputs (or random if they click the "Fetch Random
 * Number Fact!" button) and displays the trivia on the page.
 */
"use strict";
(function() {
    const URL = "http://numbersapi.com/";
    window.addEventListener("load", init);

  /**
   * Sets up event listeners for fetching number trivia.
   * first get the number from user input
   */
  function init() {
   id("fetch-num").addEventListener("click", function(){
       let numberValue = document.getElementById("num-box").value;
       numberValue = parseInt(numberValue);
        fetchNum(numberValue);
       })
      
    id("fetch-random-num").addEventListener("click", function(){
        fetchRandomNum();
    })

  }

  /**
   * Fetches trivia data about the given numberValue and displays it on the page if
   * successful, logging an error to the console if an error occurred during the request.
   * @param {int} numberValue - value of number to request trivia for.
   */
  function fetchNum(numberValue) {
    // URL with the specified number
    let url = URL + numberValue + "?json";
    // your code here with fetch with Ajax
    fetch(url)
      .then(checkStatus)
      .then((resp) => resp.json())
        .then(function(data) {
        console.log(data);
        showTriviaResult(data);
      });
      
  }
    
    function fetchRandomNum(){
        console.log("random");
        let randomNum = Math.floor(Math.random()*101);
        let url = URL + randomNum + "?json";
        fetch(url)
          .then(checkStatus)
            .then((resp) => resp.json())
                .then(function(data) {
                console.log(data);
                showTriviaResult(data);
        });
    }

  /**
   * Displays the trivia result response to the #output paragraph.
   * @param {string} response - response string from Numbers API request
   */
  function showTriviaResult(response) {
      id("output").innerHTML = "Your Number's Fun Fact is: " + response.text;
  }
    
  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response; // a Response object
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }
})();
