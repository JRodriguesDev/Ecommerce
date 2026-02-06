import { SiGithub, SiLinkedin, SiInstagram, SiX, SiFacebook, SiYoutube } from "react-icons/si";
import { IoBagHandleOutline, IoHeartOutline, IoHelpCircleOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Coluna 1: Sobre */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100">About</h3>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              <Link href="#" className="hover:text-blue-500 transition-colors w-fit">Our Story</Link>
              <Link href="#" className="hover:text-blue-500 transition-colors w-fit">Blog</Link>
              <Link href="#" className="hover:text-blue-500 transition-colors w-fit">Trends</Link>
            </ul>
          </div>

          {/* Coluna 2: Redes Sociais */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100">Social</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: SiX, href: "#" },
                { Icon: SiFacebook, href: "#" },
                { Icon: SiInstagram, href: "#" },
                { Icon: SiYoutube, href: "#" }
              ].map((item, index) => (
                <Link 
                  key={index}
                  href={item.href} 
                  className="p-2.5 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-all text-zinc-400 hover:text-blue-500 border border-transparent hover:border-zinc-700"
                >
                  <item.Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Coluna 3: Developer */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100">Developer</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-400">
              <a 
                href="https://github.com/JRodriguesDev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-white transition-colors w-fit"
              >
                <SiGithub size={18} /> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/joserodrigues-dev/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-white transition-colors w-fit"
              >
                <SiLinkedin size={18} /> LinkedIn
              </a>
            </ul>
          </div>

          {/* Coluna 4: Minha Conta */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100">Account</h3>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              <Link href="#" className="flex items-center gap-2 hover:text-blue-500 transition-colors w-fit">
                <IoHeartOutline size={18} /> Favorites
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:text-blue-500 transition-colors w-fit">
                <IoBagHandleOutline size={18} /> Orders
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:text-blue-500 transition-colors w-fit">
                <IoHelpCircleOutline size={18} /> Support
              </Link>
            </ul>
          </div>
        </div>

        <Separator className="bg-zinc-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-500 font-medium">
          <p>© 2026 Ecommerce Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:underline hover:text-zinc-300">Privacy Policy</Link>
            <Link href="#" className="hover:underline hover:text-zinc-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;