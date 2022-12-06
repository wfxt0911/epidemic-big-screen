export interface CardDataProps {
    cardData: CardItem[]

}
export interface CardItem {
    title: string,
    total: Number,
    today: Number,
    color: string
}