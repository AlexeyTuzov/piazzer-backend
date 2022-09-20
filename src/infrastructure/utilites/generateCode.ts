const generateNumericCode = (codeLength: number): string => {
    let code = [];
    for (let i = 0; i < codeLength; i++) {
        code.push(Math.floor(Math.random() * 10));
    }
    return code.join('');
}

export default generateNumericCode;
