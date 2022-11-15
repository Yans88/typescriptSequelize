const responseData = (status: number, message: string | null, data: any | null) => {
    const response = {
        status: status,
        message: message,
        data: data
    }
    return response;
}

export default {responseData};