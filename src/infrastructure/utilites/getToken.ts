const getToken = (header: string): string => {
    return header.split(' ')[1];
}

export default getToken;
