const Footer = () => {
    return (
        <footer className="w-full h-48 bg-blue-900 flex flex-row flex-1 justify-around">
            <div>
                <h3 className="footer-title">Sobre</h3>
                <ul className="flex flex-col footer-links">
                    <a href="#">Ecommerce</a>
                    <a href="#">Blog</a>
                    <a href="#">Tendencias</a>
                    <a href="#">Ecommerce</a>
                </ul>
            </div>
            <div>
                <h3  className="footer-title">Redes sociais</h3>
                <ul className="flex flex-col footer-links">
                    <a href="#">X</a>
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Youtube</a>
                </ul>
            </div>
            <div>
                <h3  className="footer-title">Contato</h3>
                <ul className="flex flex-col footer-links">
                    <a href="https://github.com/JRodriguesDev" target="_blank">GitHub</a>
                    <a href="https://www.linkedin.com/in/joserodrigues-dev/" target="_blank">Linkedin</a>
                    <a href="https://www.instagram.com/jose.rodriguess1/" target="_blank">Instagram</a>
                </ul>
            </div>
            <div>
                <h3  className="footer-title">Minha conta</h3>
                <ul className="flex flex-col footer-links">
                    <a href="#">Favoritos</a>
                    <a href="#">Vender</a>
                </ul>
            </div>
        </footer>
    )
}

export default Footer