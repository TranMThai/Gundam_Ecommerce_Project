import Brand from "./Brand"
import Category from "./Category"

type Product = {
    id: number,
    code: string
    name: string
    price: number
    quantity: number
    description: string
    status: boolean
    category: Category
    brand: Brand
    images: string[]
}
export default Product