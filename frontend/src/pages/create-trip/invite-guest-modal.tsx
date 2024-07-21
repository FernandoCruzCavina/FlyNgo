import { X, AtSign, Plus } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from '../../components/button';

interface InviteGuestModalProps {
    closePersonsModal: () => void
    emailToInvite: string[]
    addEmail: (event: FormEvent<HTMLFormElement>) => void
    removeEmail: (emailToRemove: string) => void

}


export function InviteGuestModal({closePersonsModal, emailToInvite, addEmail, removeEmail }: InviteGuestModalProps){

    return(
        <div className="fixed inset-0  bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 space-y-3 shadow-shape bg-zinc-900">
            <div className="flex justify-between items-center">
              <p className="font-bold text-2xl">Select the people on the trip</p>
              <Button onClick={closePersonsModal} button='ball' variant='tertiary'>
                <X/>
              </Button>
            </div>
            <p className="text-zinc-400">
              the guest(s) will receive an email for confirm participing in this trip
            </p>

            <div className="flex flex-wrap gap-2 pt-4 pb-4 ">
              {emailToInvite.map(email => {
                return(
                  <div key={email} className="w-fit px-3 py-1 space-x-2 rounded-md flex items-center bg-zinc-800">
                    <span className="text-zinc-400">{email}</span>
                    <Button onClick={() => removeEmail(email)} button='ball' variant='tertiary'>
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
          </div>
        </div>
    )
}