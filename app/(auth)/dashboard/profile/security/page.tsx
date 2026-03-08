import { LuLock, LuSmartphone } from "react-icons/lu"
import { SecurityActionButton } from './_components/button'
import { Card } from "@/components/ui/card"
import { getSecurityInfomatiosAction } from './actions'

const Security = async () => {
    // 1. Busca os dados reais da sua action
    const data = await getSecurityInfomatiosAction()

    // 2. Extraímos os dados da resposta da action
    const isTwoFactorEnabled = data?.twoFactor ?? false;

    // Caso você precise formatar a data de mudança de senha no futuro, 
    // pode vir do campo updatedAt do Prisma. Por enquanto usaremos um placeholder:

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20 px-4 pt-4">

            {/* TÍTULO E INTRO */}
            <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase italic">
                    Segurança
                </h1>
                <p className="text-zinc-500 text-sm font-medium">
                    Configurações de proteção e acesso à sua conta.
                </p>
            </div>

            <div className="grid gap-8">

                {/* SEÇÃO 1: ACESSO POR SENHA */}
                <section className="space-y-4">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-500/80 px-1">
                        Credenciais de Login
                    </h2>
                    <Card className="bg-zinc-900/20 border-zinc-800/50 backdrop-blur-sm divide-y divide-zinc-800/50 overflow-hidden shadow-2xl">
                        <div className="p-6 flex items-center justify-between hover:bg-zinc-800/20 transition-all cursor-pointer group">
                            <div className="flex items-center gap-5">
                                <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-600 group-hover:text-blue-500 group-hover:border-blue-500/20 transition-all">
                                    {<LuLock size={20} className={"text-blue-500"} />}
                                </div>

                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Senha da Conta</p>
                                    <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                                        {"••••••••••••"}
                                    </p>
                                </div>
                            </div>

                            <SecurityActionButton type="PASSWORD" label={"ALTERAR"} />
                        </div>

                    </Card>
                </section>

                {/* SEÇÃO 2: VERIFICAÇÃO EM DUAS ETAPAS */}
                <section className="space-y-4">
                    <div className="flex flex-col gap-1 px-1">
                        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-600">
                            Segurança Adicional
                        </h2>
                    </div>

                    <Card className="bg-zinc-900/20 border-zinc-800/50 backdrop-blur-sm divide-y divide-zinc-800/50 overflow-hidden shadow-2xl">

                        {/* 2FA TOGGLE */}
                        <div className="p-6 flex items-center justify-between hover:bg-zinc-800/20 transition-all cursor-pointer group">
                            <div className="flex items-center gap-5">
                                <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-600 group-hover:text-blue-500 group-hover:border-blue-500/20 transition-all">
                                    {<LuSmartphone size={20} className={isTwoFactorEnabled ? "text-emerald-500" : ""} />}
                                </div>

                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Autenticação de Dois Fatores (2FA)</p>
                                    <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                                        {isTwoFactorEnabled ? "Ativado" : "Desativado"}
                                    </p>
                                    <p className="text-[11px] text-zinc-500 font-medium leading-tight max-w-[280px] md:max-w-md italic">
                                        Adicione uma camada extra de segurança exigindo um código no login.
                                    </p>
                                </div>
                            </div>

                            <SecurityActionButton type="2FA" label={isTwoFactorEnabled ? "DESATIVAR" : "ATIVAR"} isTwoFactorEnabled={isTwoFactorEnabled} />
                        </div>
                    </Card>
                </section>
                {/* NOTA DE RODAPÉ */}
                <p className="text-[10px] text-zinc-600 px-1 italic">
                    * Alterar sua senha ou desativar o 2FA pode encerrar suas sessões ativas em outros dispositivos por segurança.
                </p>
            </div>
        </div>
    )
}

export default Security;