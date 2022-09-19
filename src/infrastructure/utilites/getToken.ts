const getToken = (header: string): string => {
    try {
        return header.split(' ')[1];
    } catch (err) {
        return '';
    }

}

export default getToken;
