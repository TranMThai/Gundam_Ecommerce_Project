import React, { useEffect, useState } from 'react'
import Category from '../../../../types/Category'
import Brand from '../../../../types/Brand'
import { callGetCategory } from '../../../../services/CategoryService'
import { callGetBrand } from '../../../../services/BrandService'
import { callAddProduct } from '../../../../services/ProductService'


export interface ProductRequest {
    code: string,
    name: string,
    price: number,
    quantity: number,
    description: string,
    code_category: string,
    code_brand: string,
    images: File[]
}

const ProductCreate: React.FC = () => {

    const [product, setProduct] = useState<ProductRequest>({
        code: '',
        name: '',
        price: 0,
        quantity: 0,
        description: '',
        code_category: '',
        code_brand: '',
        images: []
    })
    const [categories, setCategories] = useState<Category[]>([])
    const [brands, setBrand] = useState<Brand[]>([])

    useEffect(() => {
        const getCategory = async () => {
            const res = await callGetCategory();
            setCategories([...res])
        }
        getCategory()

        const getBrand = async () => {
            const res = await callGetBrand();
            setBrand([...res])
        }
        getBrand()
    }, [])

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            setProduct({
                ...product,
                images: [
                    ...product.images,
                    e.target.files[0]
                ]
            })
        }
    }

    const handleAdd = async () => {
        const formData = new FormData();
        formData.append('code', product.code);
        formData.append('name', product.name);
        formData.append('price', product.price.toString());
        formData.append('quantity', product.quantity.toString());
        formData.append('description', product.description);
        formData.append('codeCategory', product.code_category);
        formData.append('codeBrand', product.code_brand);
        product.images.forEach(image => {
            formData.append('fileImages', image);
        });

        try {
            const res = await callAddProduct(formData);
            console.log(res);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <div>
                <div>
                    code
                    <input type="text" name='code' onChange={handleChangeInput} />
                </div>
                <div>
                    name
                    <input type="text" name='name' onChange={handleChangeInput} />
                </div>
                <div>
                    price
                    <input type="text" name='price' onChange={handleChangeInput} />
                </div>
                <div>
                    quantity
                    <input type="text" name='quantity' onChange={handleChangeInput} />
                </div>
                <div>
                    description
                    <input type="text" name='description' onChange={handleChangeInput} />
                </div>
                <div>
                    code_category
                    <select name="code_category" value={product.code_category} onChange={handleSelect}>
                        {categories.map(c =>
                            <option key={c.code} value={c.code}>{c.code + ' - ' + c.name}</option>
                        )}
                    </select>
                </div>
                <div>
                    code_brand
                    <select name="code_brand" value={product.code_brand} onChange={handleSelect}>
                        {brands.map(b =>
                            <option key={b.code} value={b.code}>{b.code + ' - ' + b.name}</option>
                        )}
                    </select>
                </div>
                <div>
                    Images
                    <br /> <input type="file" name='images' multiple onChange={handleImage} />
                    {
                        product.images.map((image, index) => {
                            if (index < 4)
                                return <div key={index} ><input type="file" name='images' multiple onChange={handleImage} /></div>
                        })
                    }
                </div>
                <button onClick={handleAdd}>ADD</button>
            </div>
        </div>
    )
}

export default ProductCreate