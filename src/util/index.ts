export default {

    responseOrJson(response: Response) {
        if (response.ok) return response.json();
        else throw Error(response.status.toString());
    }
}
