import { Tag, Plus, Calendar } from "lucide-react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps{
  closeActivityModal: () => void
  refreshActivities: () => void
}

  export function CreateActivityModal({closeActivityModal,refreshActivities}: CreateActivityModalProps){

    const { tripId } = useParams()
    const [isMiss, setIsMiss] = useState(false)
  
    async function createActivity(event: FormEvent<HTMLFormElement>){
      event.preventDefault()

      const data = new FormData(event.currentTarget)

      const title = data.get('activity')?.toString()
      const occurs_at = data.get('occursAt')?.toString()

      try {
        await api.post(`/trips/${tripId}/activities`, {
          title,
          occurs_at
        })
              
        refreshActivities()
        closeActivityModal()
      } catch (error) {
        setIsMiss(true)
      }
    }

    

    return(
        <Modal title="Create new activity!" onClick={closeActivityModal} >
            <p className="text-zinc-400">
              For save your activity fill in the blanks
            </p>
            {isMiss? <p className="text-pink-700 font-semibold">please select the date within the travel period </p>: null}
            <form onSubmit={createActivity} className="space-y-4">    
              <div className="flex h-10 items-center space-x-3 rounded-md bg-zinc-800">
                <Tag className=" size-6 text-zinc-400"/>
                <input  type="text" placeholder="Enter your new activity" name="activity"  className="text-lg bg-transparent placeholder:text-zinc-400 outline-none flex-1"/>
              </div>
              <div className="flex h-10 items-center space-x-3 rounded-md bg-zinc-800">
                <Calendar className=" size-6 text-zinc-400"/>
                <input  type="datetime-local"  name="occursAt"  className="text-lg bg-transparent text-zinc-400 outline-none flex-1"/>
              </div>
              <Button type="submit" size="full">
                Save activity
                <Plus/>
              </Button>
            </form> 
        </Modal>
    )
}