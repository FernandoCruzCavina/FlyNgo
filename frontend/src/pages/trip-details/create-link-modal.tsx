import { Navigation, Plus, Text } from "lucide-react";
import { Modal } from "../../components/modal";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModal{
    closeLinkModal: () => void
    setRefresh: () => void
}

export function CreateLinkModal ({closeLinkModal, setRefresh}:CreateLinkModal){

    const { tripId } = useParams()
    const [isMiss, setIsMiss] = useState(false)

    async function createLink(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get('nameLink')?.toString()
        const url = data.get('link')?.toString()

        try {
            await api.post(`/trips/${tripId}/links`, {
                title: title,
                url: url,  
            })

            setRefresh()
            setIsMiss(false)
            closeLinkModal()
        } catch (error) {
            console.log("erro:", error)
        }

    }

    return (
        <Modal title="Add new link" onClick={closeLinkModal}>
            <p className="text-zinc-400">
                For save your link fill in the blanks
            </p>
            {isMiss? <p className="text-pink-700 font-semibold">please enter a link in the right blank</p>: null}
            <form onSubmit={createLink} className="space-y-4">    
              <div className="flex h-10 items-center space-x-3 rounded-md bg-zinc-800">
                <Text className=" size-6 text-zinc-400"/>
                <input  type="text" placeholder="Enter a name for link" name="nameLink"  className="text-lg bg-transparent placeholder:text-zinc-400 outline-none flex-1"/>
              </div>
              <div className="flex h-10 items-center space-x-3 rounded-md bg-zinc-800">
                <Navigation className=" size-6 text-zinc-400"/>
                <input  type="text" placeholder="Enter your link"  name="link"  className="text-lg bg-transparent text-zinc-400 outline-none flex-1"/>
              </div>
              <Button type="submit" size="full">
                Save link
                <Plus/>
              </Button>
            </form>
        </Modal>
    )
}