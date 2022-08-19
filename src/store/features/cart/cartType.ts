interface CartItem {
    id:string,
    title:string,
    price: number,
    img: string,
    amount: number
}

interface CartProps {
    cartItems: CartItem[],
    amount: number,
    total: number,
    isLoading: boolean
}

export type {CartItem, CartProps}