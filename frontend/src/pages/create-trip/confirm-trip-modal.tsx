import { Mail, Plus, User, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";

interface ConfirmTripModalProps{
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    closeConfirmTrip: () => void
    setOwnerName: (ownerName: string) => void
    setOwnerEmail: (ownerEmail: string) => void
}

export function ConfirmTrip( { createTrip, closeConfirmTrip, setOwnerName, setOwnerEmail} : ConfirmTripModalProps){

    return (
        <div className="fixed inset-0  bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 space-y-3 shadow-shape bg-zinc-900">
            <div className="flex justify-between items-center">
              <p className="font-bold text-2xl">Confirm create your trip</p>
              <Button onClick={closeConfirmTrip} button="ball" variant="tertiary">
                <X/>
              </Button>
            </div>
            <p className="text-zinc-400">
              For finish the trip fill in the blanks 
            </p>          
            <form onSubmit={createTrip} className="py-2 space-y-4 rounded-xl ">
              <div className="flex h-10 items-center space-x-3 rounded-md bg-zinc-800">
                <User className=" size-6 text-zinc-400"/>
                <input  type="text" placeholder="Enter your name" name="userName"  className="text-lg bg-transparent placeholder:text-zinc-400 outline-none flex-1"
                onChange={event => setOwnerName(event.target.value)}
                />
              </div>
              <div className="flex h-10 items-center space-x-3 rounded-md bg-zinc-800">
                <Mail className=" size-6 text-zinc-400"/>
                <input  type="email" placeholder="Enter your email" name="userEmail"  className="text-lg bg-transparent placeholder:text-zinc-400 outline-none flex-1"
                onChange={event => setOwnerEmail(event.target.value)}/>
              </div>
            
              <Button type="submit" size="full">
                Finish
                <Plus/>
              </Button>
            </form>
          </div>
        </div>
    )
}