import { Link2, Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface Links{
    id: string
    title: string
    url: string
}

interface ImportantLinksProps{
    openLinkModal: () => void
    links: Links[]
    refreshLinks: () => void
}

export function ImportantLinks({openLinkModal, links, refreshLinks}: ImportantLinksProps){
    
    const {tripId} = useParams()

    function copyToClipboard(linkCopy: string){
        navigator.clipboard.writeText(linkCopy)
        .then(() => {
            alert('Texto copiado para a área de transferência!')
        })
        .catch((err) => {
            console.error('Erro ao copiar o texto: ', err)
        })
    }

    
    async function excludeLinks(linkId: string){
        await api.delete(`/trips/${tripId}/links`, {
            data: { linkId }
        })
        refreshLinks()
    }

    return(
        <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-medium">Important links</h2>
            <div className="space-y-5">
                
                {links.length > 0 ?(
                links.map( link => {
                    return(
                    <div key={link.id} className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="font-medium text-zinc-200">{link.title}</span>
                            <span className="text-sm text-zinc-400 truncate">{link.url}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 shrink-0">
                            <Button button="ball" variant="tertiary" onClick={() => copyToClipboard(link.url)}><Link2/></Button>
                            <Button button="ball" variant="tertiary" onClick={() => excludeLinks(link.id)}><Trash2/></Button>
                        </div>
                    </div>
                    )}
                )):(
                    <p className="text-zinc-400" >no links for this trip</p>
                )}
            </div>
            <Button button="square" variant="secondary" onClick={openLinkModal}>
                <Plus/>
                Add new link
            </Button>
        </div>
    )
}