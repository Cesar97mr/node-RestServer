class Producto {
    constructor(numSerie){
        this.numSerie = numSerie;
        this.tiempoGarantia = 100;
    }
    
    get infoTienda() {
        console.log(`Productos de la tienda Patito Inc`);
    }

    set garantia(value){
        this.tiempoGarantia -= value;
    }

    get garantia() {
        return this.tiempoGarantia;
    }
}

class Pantalla extends Producto {
    constructor(marca, modelo, pulgadas){
        this.marca = marca;
        this.pulgadas = pulgadas;
        this.modelo = modelo;
    }

    encendido(){
        console.log(`La pantalla ${this.marca} se ha encendido`);
    }
    volumen(){
        console.log(`El volumen se ha modificado`);
    }
    info(){
        console.log(`la pantalla ${this.marca} de modelo ${this.modelo} es de ${this.pulgadas} pulgadas`)
    }
}
const tvSala = new Pantalla('master', 'oasis', 55);
const tvRoom = new Pantalla('origin', 'tl', 34)