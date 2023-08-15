const fs = require("fs");

class ProductManager {
    static id = 0;
    constructor() {
        this.products = [];
        this.path = "./Products.json";
        this.idCounter = 1;
    }

    async addProduct(title, description, price, thumbnail, code, stock, id) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Operación inválida, debe llenar todos los campos");
            return;
        }

        try {
            const contentObj = await this.getProducts();
            if (contentObj.some((product) => product.code === code)) {
                console.log(`Atención: no se puede agregar un nuevo código ${code} , debido a que ya existe otro código con el mismo número`);
                return;
            }

            const product = {
                id: ProductManager.id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            contentObj.push(product);
            product.id = this.idCounter++;
            this.products.push(product);

            await fs.promises.writeFile("./Products.json", JSON.stringify(contentObj, null, "\t"));
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const productsNotId = products.filter((product) => product.id != id);
        await fs.promises.writeFile("./Products.json", JSON.stringify(productsNotId, null, "\t"));
    }


    async getProducts() {
        try {
            const content = await fs.promises.readFile("./Products.json", "utf-8");
            const contentObj = JSON.parse(content);
            return contentObj;
        } catch (error) {
            console.log("No se pudo leer el archivo Products.json. Se creará uno nuevo.", error);
            return [];
        }
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id); // Función que nos va a traer el producto por su ID si existe, si ese ID no se encuentra nos da un error con un mensaje
        if (!product) {
            console.error(`No se encontró el producto ${id}`);
            return null;
        }
        return product;
    }


    //Actualiza los datos del objeto determinado, si hay modificaciones
    async updateProduct(id, updatedProduct) {
        try {
            let contentObj = await this.getProducts();
            const index = contentObj.findIndex((product) => product.id === id);
            if (index >= 0) {
                contentObj[index] = { ...contentObj[index], ...updatedProduct };
                await fs.promises.writeFile("./Products.json", JSON.stringify(contentObj, null, "\t"));
            } else {
                console.log(`No se encontró el producto con el id ${id}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//Se actualiza datos en producto 1 (Por ejemplo):
const updatedProduct = {
    id: 1,
    title: "Agua con gas",
    description: "Botella 600ml",
    price: 100,
    thumbnail: "agua_con_gas_600ml.jpg",
    code: 1,
    stock: 4900,
};

const productManager = new ProductManager();

// Agregamos los productos
const funcionAsync = async () => {
    await productManager.addProduct("Agua con gas", "Botella 600ml", 80, "agua_con_gas_600ml.jpg", 1, 11000)
    await productManager.addProduct("Agua sin gas", "Botella 600ml", 70, "agua_sin_gas_600ml.jpg", 2, 11000)
    await productManager.addProduct("Agua con gas", "Botella 1l", 120, "agua_con_gas_1l.jpg", 3, 1000)
    await productManager.addProduct("Agua sin gas", "Botella 1l", 100, "agua_sin_gas_1l.jpg", 4, 1000)
    await productManager.addProduct("Pomelo", "Botella 1l", 150, "pomelo_1L.jpg", 5, 990)
    await productManager.addProduct("Pomelo Light", "Botella 1l", 150, "pomelo_light_1L.jpg", 6, 5690)
    await productManager.addProduct("Pomelo", "Botella 600ml", 120, "pomelo_600ml.jpg", 7, 890)
    await productManager.addProduct("Coca Cola", "Botella 600ml", 110, "coca_cola_600ml.jpg", 8, 907)
    
    await productManager.updateProduct(1, updatedProduct);


    await productManager.deleteProduct(3); //Se elimina producto 3 (Por ejemplo):
}

funcionAsync();

// Consultar los productos
const asyncrona = async () => {
    const products = await productManager.getProducts();
    console.log(products);
};

asyncrona();

