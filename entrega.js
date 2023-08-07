// ENTREGA 1:

class ProductManager {
    constructor() {
        this.products = [];
        this.idCounter = 1;
    }

    // Se agregan todos los datos en los campos de objeto, si no se completa todos los campos te avisa que hay que agregar datos en todos los campos 
    addProduct(product) {
        if  (!product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock) 
            { console.log("Operación invalida, debe llenar todos los campos");
      } if (this.products.some((prod) => prod.code === product.code)) {
            return console.log(`Atención: no se puede agregar un nuevo codigo ${product.code} , debido a que ya existe otro codigo con el mismo número`);
        }// EJEMPLO: (Se puede visualizar en **Atención) - se puede ver el ejemplo antes de los puntos A - B - C 

        product.id = this.idCounter++;
        this.products.push(product);// nos adjudica un ID a cada producto nuevo, el id se autoincrementa al agregar un nuevo producto
    }

    getProducts() {
        return this.products; // Funcion que nos trae los productos
    }

    getProductById(id) {
        const product = this.products.find((prod) => prod.id === id); // Funcion que nos va a traer el ID si existe, si ese ID no se encuentra nos da un error con un mensaje
        if (!product) {
            console.error(`No se encontró el producto ${id}`);
            return null;
        }
        return product;
    }
}



// Agregamos productos
const productManager = new ProductManager();

const product = productManager.addProduct({
    title: "Agua con gas",
    description: "Botella 1L",
    price: 99,
    thumbnail: "agua_con_gas.jpg",
    code: 1,
    stock: 10000,
});

try {
    productManager.addProduct({
        title: "Agua sin gas",
        description: "Botella 1L",
        price: 60,
        thumbnail: "agua_sin_gas.jpg",
        code: 2,
        stock: 13000,
    });

    productManager.addProduct({
        title: "Agua con gas",
        description: "Lata 350ml",
        price: 30,
        thumbnail: "agua_lata.jpg",
        code: 3,
        stock: 500,
    });

    productManager.addProduct({
        title: "Agua con gas",
        description: "Botella 600ml",
        price: 60,
        thumbnail: "agua_botella_600.jpg",
        code: 4,
        stock: 500,
    });



// Se intenta agregar un código con el numero code repetido , y el sistema no permite agregar un code repetido, por lo tanto aparece un mensaje de Atención. **
    productManager.addProduct({
        title: "Agua con gas",
        description: "Lata 350ml",
        price: 30,
        thumbnail: "agua_lata.jpg",
        code: 1,
        stock: 5000,
    });
    

    /// RESULTADOS
    console.log("A - Lista de todos los productos (del id 1 al id 4):", productManager.getProducts()); // Nos muestra un array con la lista de productos
    console.log("B - Producto con id 1:", productManager.getProductById(1)); // Nos muestra el producto code ID:1
    console.log("C - Producto con id 2:", productManager.getProductById(2)); // Nos muestra el producto code ID:2
    console.log("Producto con id 5:", productManager.getProductById(5)); // Nos muestra error , porque el producto code ID: 5 , no existe
} catch (error) {
    console.error(error.message);
}finally {console.log("Fin");
}

