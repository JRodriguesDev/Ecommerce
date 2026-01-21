import Carousel from "@/components/carousel"

const Shop = () => {
    const data = [
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
            {id:'1', thumbnail: "https://img.freepik.com/fotos-gratis/um-belo-nascer-de-sol-na-praia-sob-um-ceu-azul_181624-26939.jpg", title: 'aviao 1', price: 122, category: 'tec', stock: 1},
        ]
    return (
        <main className="flex flex-col">
            <section className="bg-white mx-15 mt-15 flex flex-col">
                <span className="text-center mb-3.5 text-xl font-semibold">Categoria Em Destaque</span>
                <Carousel products={data}/>
            </section>
            <section className="bg-white mx-15 mt-15 flex flex-col">
                <span className="text-center mb-3.5 text-xl font-semibold">Estoque Acabando</span>
                <Carousel products={data}/>
            </section>
        </main>
    )
}

export default Shop