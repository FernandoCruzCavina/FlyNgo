import { AtSign, Plus, X } from "lucide-react";
import { Modal } from "../../components/modal";
import { Button } from "../../components/button";
import { FormEvent} from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";



interface CreateInviteGuestsModalProps{
    closeCreateInviteGuestsModal: () => void
    participants: Participant[];
    refreshParticipants: () => void;
}

interface Participant{
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function CreateInviteGuestsModal({closeCreateInviteGuestsModal, participants, refreshParticipants}: CreateInviteGuestsModalProps){

  const {tripId} = useParams()

  async function addEmail(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email){
      return
    }

    if (participants.some(participant => participant.email === email)){
      return
    }

    console.log(email)
    
    await api.post(`/trips/${tripId}/invites`, {
      email
    })

    refreshParticipants()

  }
  
  async function removeEmail(participantId: string){
    await api.delete(`/trips/${tripId}/participants`, {
      data: { participantId }
    });

    refreshParticipants
  }


    return(
        <Modal onClick={closeCreateInviteGuestsModal} title="Manage your guests">
             <p className="text-zinc-400">
              the guest(s) will receive an email for confirm participing in this trip
            </p>

            <div className="flex flex-wrap gap-2 pt-4 pb-4 ">
              {participants.map(participant => {
                return(
                  <div key={participant.id} className="w-fit px-3 py-1 space-x-2 rounded-md flex items-center bg-zinc-800">
                    <span className="text-zinc-400">{
                        participant.email
                    }</span>
                    <Button onClick={() => removeEmail(participant.id)} button='ball' variant='tertiary'>
                      <X className="text-zinc-300"/>
                    </Button>
                  </div>
                )
              })}
            </div>

            <form onSubmit={addEmail} className="w-full flex space-x-4">
              <div className="flex items-center space-x-3 flex-1">
                <AtSign className=" size-6 text-zinc-400"/>
                <input  type="email" placeholder="Enter emails of persons" name="email"  className="text-lg bg-transparent placeholder:text-zinc-400 outline-none flex-1"/>
              </div>
              <Button type="submit">
                Invite
                <Plus/>
              </Button>
            </form>
        </Modal>
    )
}