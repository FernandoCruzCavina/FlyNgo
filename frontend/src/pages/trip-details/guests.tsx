import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";

interface Participant{
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}

interface GuestsProps{
    openCreateInviteGuestsModal: () => void
    participants: Participant[];
}

export function Guests({ openCreateInviteGuestsModal, participants}: GuestsProps){

    return(
        <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-medium">Guests</h2>
            <div className="space-y-5">
                {participants.map((participant, index) => {
                    return (
                        <div key={participant.id} className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="font-medium text-zinc-200">{participant.name? participant.name : `Guest ${index}`}</span>
                                <span className="text-sm text-zinc-400 truncate">{participant.email}</span>
                            </div>
                            <button className="size-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-300 hover:bg-zinc-50/10">
                                {participant.is_confirmed? <CircleCheck className="text-lime-200"/> : <CircleDashed/>}
                            </button>
                        </div>    
                    )
                })}
            </div>
            <Button onClick={openCreateInviteGuestsModal} variant="secondary">
                <UserCog/>
                Add new guests
            </Button>
        </div>
    )
}