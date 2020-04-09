interface ImageSource {
    original: string
    medium: string
    small: string
}

export default interface Image {
    id: string
    width: number
    height: number
    url: string
    photographer: string
    src: ImageSource
}
