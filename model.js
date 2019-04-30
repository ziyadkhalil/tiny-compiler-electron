const TokenType = {
    RESERVED_WORD: 'reserved_word',
    SPECIAL_SYMPOL: 'special_sympol',
    IDENTIFIER: 'identifier',
    NUMBER: 'number',
    ASSIGNMENT: 'assignment',
    EMPTY: 'empty'};

const State = {
    START: 'start',
    INCOMMENT: 'incomment',
    INNUM: 'innum',
    INID: 'inid',
    INASSIGN: 'inassign',
    DONE: 'indone'
}

const RESERVED_WORDS = ["if", "then", "else", "end", "repeat", "until", "read", "write"]
const SPECIAL_SYMPOLS = ['+', '-', '*', '/', '=', '<', '(', ')', ';', ':']

 class Token {
    constructor(){
        this.type = TokenType.EMPTY;
        this.value = ''
        this.valid = false;
    }
     print(){
        console.log(this)
    }
}
module.exports = {TokenType: TokenType, State: State, reservedWords: RESERVED_WORDS, specialSympols: SPECIAL_SYMPOLS, Token: Token}
