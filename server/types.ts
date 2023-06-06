export interface Emoji {
    "id": number,
    "name": string,
    "emoji": string,
    "unicode": string,
    "category": Category,
    "sub_category": Category,
    "keywords": string[],
    "version": string
}
    
interface Category {
    "id": number,
    "name": string
}