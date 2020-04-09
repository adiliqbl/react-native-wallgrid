import Image from "./models/Image";
import util from "../util";

export default class Pexels {
    private static readonly PEXELS_API_KEY = '563492ad6f91700001000001cc615d034e574ea6a664b94738bf1f92';
    private static readonly PEXELS_URL = 'https://api.pexels.com/v1';

    private static readonly PER_PAGE = 30;
    private static readonly HEADERS = {
        headers: {
            Authorization: Pexels.PEXELS_API_KEY,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    public static getFeaturedList(page: number): Promise<Array<Image>> {
        return fetch(`${this.PEXELS_URL}/curated?per_page=${this.PER_PAGE}&page=${page}`, {
            ...this.HEADERS, method: 'GET'
        })
            .then(util.responseOrJson)
            .then(json => json.photos);
    }

    public static getImage(id: string): Promise<Image> {
        return fetch(`${this.PEXELS_URL}/photos/${id}`, {...this.HEADERS, method: 'GET'})
            .then(util.responseOrJson);
    }
}
