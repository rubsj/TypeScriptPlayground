function isValid(s: string): boolean {
    const validPair = new Map([['}', '{'], [')', '('], [']', '[']]);
    const openingParenth = ['(', '{', '['];
    const input = s.split('');
    console.log(input);
    const pairStack = [];
    let isValid = true;
    for (let i = 0; i < input.length; i++) {
        const par = input[i];
        if (openingParenth.includes(par)) {
            pairStack.push(par);

        } else {
            const val = pairStack.pop();
            if (!val || validPair.get(par) !== val) {
                isValid = false;
                console.log('invalid match found');
                break;
            }

        }
    }

    if (isValid && pairStack.length > 0) {
        isValid = false;
    }

    return isValid;
};

export function executeisValid() {
    const input = "["; //"()[]{}" // "()" //"(]"
    const output = false; //true; //false ;
    const result = isValid(input);
    console.log('result ', result);
    console.assert(result === output, 'invalid parentheses mathc');
}

executeisValid();