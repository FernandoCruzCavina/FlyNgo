import { ArrowRight, UserPlus2 } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestStepProps{
    emailToInvite: string[]
    openPersonsModal: () => void
    openConfirmTrip: () => void
}

export function InviteGuestStep({emailToInvite, openPersonsModal, openConfirmTrip }:InviteGuestStepProps){
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex justify-center items-center shadow-shape">
            <button onClick={openPersonsModal} className="flex items-center space-x-3 flex-1">
            <UserPlus2 className=" size-6 text-zinc-400"/>
            {emailToInvite.length>0? (
                <span className="text-lg bg-transparent text-zinc-100 outline-none flex-1 text-left">
                    {emailToInvite.length} person(s) will be part of your trip
                </span>
                ):(
                <span className="text-lg bg-transparent text-zinc-400 outline-none flex-1 text-left">who will be part of this trip ?</span>
                )
            }
            </button>
            <Button onClick={openConfirmTrip}>
                Confirm trip
                <ArrowRight/> 
            </Button>
        </div>
    )
}