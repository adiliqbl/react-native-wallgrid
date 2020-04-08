interface ImageSource {
    original: string,
    small: string,
    tiny: string
}

export default interface Image {
    width: number,
    height: number,
    url: string,
    photographer: string,
    src: ImageSource
}
