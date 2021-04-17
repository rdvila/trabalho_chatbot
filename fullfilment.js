// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log(
      "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));
    console.log("Parameters: " + JSON.stringify(agent.parameters));

    function reverseString(str) {
      var splitString = str.split("");
      var reverseArray = splitString.reverse();
      reverseArray[0] = "[";
      reverseArray[reverseArray.length - 1] = "]";
      var joinArray = reverseArray.join("");
      return joinArray;
    }

    function reversa(agent) {
      agent.add(reverseString(agent.parameters.palavra));
    }

    function maiuscula(agent) {
      agent.add(agent.parameters.palavra.toUpperCase());
    }

    function minuscula(agent) {
      agent.add(agent.parameters.palavra.toLowerCase());
    }

    function popularidade(agent) {
      var lang = agent.parameters.linguagem_programacao.toLowerCase();
      var pop = {
        c: 14.32,
        java: 11.23,
        python: 11.03,
        "c++": 7.14,
        "c#": 4.91,
        "visual basic": 4.55,
        javascript: 2.44,
        assembly: 2.32,
        php: 1.84,
        sql: 1.83,
        "classic visual basic": 1.54,
        delphi: 1.47,
        ruby: 1.23,
        go: 1.22,
        swift: 1.19,
        r: 1.12,
        groovy: 1.04,
        perl: 0.99,
        matlab: 0.99,
        fortran: 0.91,
      };
      agent.add(
        `A popularidade do ${agent.parameters.linguagem_programacao} é de ${
          pop[lang] || "0"
        }%`
      );
    }

    let intentMap = new Map();
    intentMap.set("Popularidade Intent", popularidade);
    intentMap.set("Reversa Intent", reversa);
    intentMap.set("Maiuscula Intent", maiuscula);
    intentMap.set("Minuscula Intent", minuscula);
    agent.handleRequest(intentMap);
  }
);
