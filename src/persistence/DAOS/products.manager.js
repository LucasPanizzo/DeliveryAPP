import { productsModels } from "../mongoDB/models/products.models.js";

export default class productManager {
    async getProducts(limit, page, sort, query) {
        try {
            const objects = {
                limit: parseInt(limit) || 10,
                page: parseInt(page) || 1,
                sort: parseInt(sort) ? { price: sort } : {},
            }
            const queryes = query || {}
            const products = await productsModels.paginate(queryes, objects)
            const productsInfo = {
                status: "success",
                payload: products.docs,
                info: {
                    totalpages: products.totalPages,
                    prevPage: products.prevPage,
                    nextPage: products.nextPage,
                    page: products.page,
                    hasPrevPage: products.hasPrevPage,
                    hasNextPage: products.hasNextPage,
                    prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?limit=${limit}&page=${products.prevPage}` : null,
                    nextLink: products.hasNextPage ? `http://localhost:8080/api/products?limit=${limit}&page=${products.nextPage}` : null
                }
            }
            return productsInfo
        } catch (error) {
            console.log('error: no hay productos', error);
        }
    }
    async addProduct(obj, owner) {
        try {
            obj.owner = owner.name
            const products = await this.getProducts()
            const productsList = products.payload
            if (productsList.find((el) => el.code === obj.code)) {
                console.log('error: producto ya existente');
            } else {
                if (obj.title || obj.description || obj.code || obj.price || obj.stock || obj.status || obj.category || obj.thumbnails || obj.owner) {
                    const newProduct = new productsModels(obj)
                    const productSaved = newProduct.save()
                    return productSaved
                } else {
                    console.log('faltan campos');
                }
            }
        } catch (error) {
            console.log('error: no se puede agregar el producto', error);
        }
    }
    async getProductsByID(id) {
        try {
            const product = await productsModels.findById(id)
            return product
        } catch (error) {
            console.log('error : de id', error);
        }
    }
    async deleteProduct(id) {
        try {
            const deletedProd = await productsModels.deleteOne({ _id: id });
            return deletedProd;
        } catch (error) {
            console.log('error : de id', error);
        }
    }
    async updateProduct(id, actualizacion) {
        try {
            const clavesPermitidas = ['title', 'description', 'price', 'code', 'stock', 'status', 'category', 'thumbnails','owner'];
            const actualizacionValida = Object.keys(actualizacion).some((clave) => clavesPermitidas.includes(clave));
            if (actualizacionValida != false) {
                const updateProduct = await productsModels.findOneAndUpdate({ _id: id }, { ...actualizacion })
                return updateProduct
            } else {
                console.log('faltan campos');
            }
        } catch (error) {
            console.log('error : de id', error);
        }
    }
}