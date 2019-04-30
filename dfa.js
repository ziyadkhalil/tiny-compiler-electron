const model = require('./model')
const util = require('./util')
const fs = require('fs')
const XRegEexp = require('xregexp');
const Token = model.Token
const State = model.State
const TokenType = model.TokenType
const RESERVED_WORDS = model.reservedWords;
const SPECIAL_SYMPOLS = model.specialSympols;

class DFA{
    constructor(input){
        this.input = input;
        this.tokens = [];
        this.currentState = State.START;
        this.isDone = false;
        this. x = function(){return 1;}
        return this;
    }
    run() {
        var token;
        while(!this.isDone){
            this.currentState = State.START;
            token = (function scan(dfa){

                var endScan = false;
                var currentChar = '';
                var stringBuilder = '';
                var currentToken = new Token();
                while(dfa.currentState != State.DONE){
                    if(dfa.input.length == 0){
                        switch(currentToken.type){
                            case TokenType.ASSIGNMENT:
                            case TokenType.NUMBER:
                            case TokenType.SPECIAL_SYMPOL:
                            case TokenType.IDENTIFIER:
                                currentToken.value = stringBuilder;
                                if(RESERVED_WORDS.includes(currentToken.value))
                                    currentToken.type = TokenType.RESERVED_WORD;
                            case TokenType.EMPTY:
                                endScan = true;
                        }
                        dfa.currentState = State.DONE;
                        dfa.isDone = true;
                        if(endScan)
                            break;
                    }
                    currentChar = dfa.input[0];

                    //Checks if in comment.
                    if(currentChar == '{' || dfa.currentState == State.INCOMMENT){
                        dfa.currentState = State.INCOMMENT;
                        dfa.input = dfa.input.substr(1);
                        if (currentChar == '}')
                            dfa.currentState    = State.DONE;
                    }
                    else switch (currentToken.type){
                        case TokenType.EMPTY:
                            if(util.isAlphabetic(currentChar)){
                                currentToken.type  = TokenType.IDENTIFIER;
                                stringBuilder = stringBuilder.concat(currentChar);
                                dfa.currentState = State.INID;
                                currentToken.valid = true;
                                dfa.input = dfa.input.substr(1);
                            }
                            else if (util.isDigit(currentChar)){
                                currentToken.type  = TokenType.NUMBER;
                                stringBuilder = stringBuilder.concat(currentChar);
                                dfa.currentState = State.INNUM;
                                currentToken.valid = true;
                                dfa.input = dfa.input.substr(1);
                            }
                            else if (currentChar == ':'){
                                currentToken.type  = TokenType.ASSIGNMENT;
                                stringBuilder = stringBuilder.concat(currentChar);
                                dfa.currentState = State.INASSIGN;
                                currentToken.valid = true;
                                dfa.input = dfa.input.substr(1);
                            }
                            else if (SPECIAL_SYMPOLS.includes(currentChar)){
                                currentToken.type = TokenType.SPECIAL_SYMPOL;
                                stringBuilder = stringBuilder.concat(currentChar);
                                currentToken.value = stringBuilder;
                                dfa.currentState = State.DONE;
                                currentToken.valid = true;
                                dfa.input = dfa.input.substr(1);
                            }
                            else {
                                dfa.currentState = State.DONE;
                                dfa.input = dfa.input.substr(1);
                            }
                            break;
                        case TokenType.IDENTIFIER:
                            if(util.isAlphabetic(currentChar)){
                                stringBuilder = stringBuilder.concat(currentChar);
                                dfa.currentState = State.INID;
                                dfa.input = dfa.input.substr(1);
                            }
                            else{
                                if(util.isWhiteSpace(currentChar))
                                    dfa.input = dfa.input.substr(1);
                                currentToken.value = stringBuilder;
                                if(RESERVED_WORDS.includes(currentToken.value))
                                    currentToken.type = TokenType.RESERVED_WORD;
                                dfa.currentState = State.DONE;
                            }
                            break;
                        case TokenType.NUMBER:
                            if(util.isDigit(currentChar)){
                                stringBuilder = stringBuilder.concat(currentChar);
                                dfa.input = dfa.input.substr(1);
                                dfa.currentState = State.INNUM;
                            }
                            else{
                                if(util.isWhiteSpace(currentChar))
                                    dfa.input = dfa.input.substr(1);
                                dfa.currentState = State.DONE;
                                currentToken.value = stringBuilder;
                            }
                            break;
                        case TokenType.ASSIGNMENT:
                            if(currentChar=='='){
                                stringBuilder = stringBuilder.concat('=');
                                dfa.input = dfa.input.substr(1);
                                currentToken.valid = true;
                                dfa.currentState = State.DONE;
                                currentToken.value = stringBuilder;
                            }
                            else{
                                dfa.currentState = State.DONE;
                                if(util.isWhiteSpace(currentChar))
                                    dfa.input = dfa.input.substr(1);
                            }
                            break;
                    }
                }
                return currentToken;
            })(this);

            if(token.valid){
                this.tokens.push(token);}
        }
    }
    getTokens(){
        return this.tokens;
    }
    printTokens(){
        this.tokens.forEach(function(t){
            t.print();
        });
    }
}
module.exports = DFA;
