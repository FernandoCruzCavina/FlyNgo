import { Calendar, MapPin, Plus, X } from "lucide-react";
import { Modal } from "../../components/modal";
import { Button } from "../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns/format";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface Trip{
    id: string
    destination: string
    starts_at: string
    ends_at: string
    is_confirmed: boolean
}
interface Activities {
  date: string
  activities: {
      id: string
      title: string
      occurs_at: string
  }[]
}

interface UpdateDestinationNDateModalProps{
    closeUpdateDestinationNDateModal: () => void
    setDestination: (destination: string ) => void
    setTrip: React.Dispatch<React.SetStateAction<Trip | undefined>>
    setActivities: React.Dispatch<React.SetStateAction<Activities[]>>
    closeDestinationNDateModal: () => void
    setEventStartAtNEndAt: (dates: DateRange | undefined)=> void
    eventStartAtNEndAt: DateRange | undefined
    destination: string | undefined
    trip: Trip | undefined
}

export function UpdateDestinationNDateModal({closeUpdateDestinationNDateModal, setDestination ,trip, eventStartAtNEndAt, destination, setEventStartAtNEndAt, setTrip, setActivities, closeDestinationNDateModal }: UpdateDestinationNDateModalProps){
    const {tripId} = useParams()
    const [calendarModal, setCalendarModal] = useState(false)

    const today = new Date();
    
    function openCalendarModal(){
      setCalendarModal(true)
    }
    function closeCalendarModal(){
      setCalendarModal(false)
    }

    const updateDestinationNDate = async () => {
      await api.put(`/trips/${tripId}`, {
          destination: destination,
          starts_at: eventStartAtNEndAt?.from,
          ends_at: eventStartAtNEndAt?.to
      })
      await api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
      await api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
      closeDestinationNDateModal()
  }
    
    return (
        <Modal onClick={closeUpdateDestinationNDateModal} title="Change local/date">
            <p></p>
            <div className="space-y-4">    
              <div className="flex h-10 items-center space-x-3 rounded-md bg-zinc-800">
                <MapPin className=" size-6 text-zinc-400"/>
                <input  type="text" placeholder={`${trip?.destination} ?`} name="nameLink" className="text-lg bg-transparent placeholder:text-zinc-400 outline-none flex-1" onChange={event => setDestination(event.target.value)}/>
              </div>
              <Button onClick={openCalendarModal} variant="tertiary">
                <Calendar/>
                {eventStartAtNEndAt && eventStartAtNEndAt.from && eventStartAtNEndAt.to? 
                format(eventStartAtNEndAt.from, "MMM  do ")
                .concat('to ')
                .concat(format(eventStartAtNEndAt.to, "MMM do',' yyyy"))
                : 'when ?'}
              </Button>
              <Button onClick={updateDestinationNDate} size="full">
                Save link
                <Plus/>
              </Button>
            </div>
            {calendarModal && (
            <div className="fixed inset-0  bg-black/60 flex items-center justify-center">
                <div className="w-[640px] rounded-xl py-5 px-6 space-y-3 shadow-shape bg-zinc-900">
                    <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl">Confirm create your trip</p>
                    <Button onClick={closeCalendarModal} button="ball" variant="tertiary">
                        <X/>
                    </Button>
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                    <p className="text-zinc-400">
                        For finish the trip fill in the blanks 
                    </p>          
                    <DayPicker mode="range" selected={eventStartAtNEndAt}   onSelect={setEventStartAtNEndAt}
                    disabled={{before: today}}/>
                    </div>
                </div>
            </div>
            )}
        </Modal>
    )
}