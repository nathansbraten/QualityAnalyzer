let Tokenizer = function() {
    var tokens = [
        {name: "whitespace", regexp: /^\s+/},
        {name: "keyword", regexp: /^(abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)/},
        {name: "variable", regexp: /^\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},
        {name: "name", regexp: /^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},
        {name: "string", regexp: /^('(\\'|[^'])*')/},
        {name: "string", regexp: /^("(\\"|[^"])*")/},
        {name: "number", regexp: /^([+-]?(\d+(\.\d+)?|\.\d+))/},
        {name: "comment", regexp: /^((\/\/|#)[^\n]*)/},
        {name: "comment", regexp: /^(\/\*[^]*?\*\/)/},
        {name: "operator", regexp: /^(new|\[|\]|!|~|\+\+|--|\(int\)|\(float\)|\(string\)|\(array\)|\(object\)|<<|>>|<|<=|>|>=|==|!=|===|!==|&|\^|\|\||&&|\|\||\?|:|=|\+=|-=|\*=|\/=|\.=|%=|&=|\|=|\^=|<<=|>>=|print|and|xor|or|,|@|\*|\/|%|\+|-|\.|\||\(|\)|->)/},
        {name: "uncaught", regexp: /^\S+/}
    ]

    this.tokenizeString = function(string) {
        var lines = [[]],
            line = 0;

        string = string.replace(/\r\n|\r/g, "\n");
        while (string) {
            for (var i = 0; i < tokens.length; ++i) {
                var match = null;

                if (match = string.match(tokens[i].regexp)) {
                    string = string.substring(match[0].length);

                    if (match[0] === "\n") {
                        lines[++line] = [];
                        break;
                    }

                    if (match[0].indexOf("\n") >= 0) {
                        var lineContents = match[0].split("\n");

                        for (var j = 0; j < lineContents.length; ++j) {
                            lines[line].push({type: tokens[i].name, text: lineContents[j]});
                            lines[++line] = [];
                        }
                    } else {
                        lines[line].push({type: tokens[i].name, text: match[0]});
                    }

                    break;
                }
            }
        }

        return lines;
    }
};

export default Tokenizer; 
