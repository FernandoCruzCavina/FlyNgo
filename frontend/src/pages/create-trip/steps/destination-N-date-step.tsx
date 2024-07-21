import { ArrowRight, Calendar, MapPin, Settings2, X, } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";

interface DestinationNDateTripProps{
    isPhase2: boolean
    openPhase2: () => void
    closePhase2: () => void
    setDestination: (destination: string) => void
    eventStartAtNEndAt: DateRange | undefined
    setEventStartAtNEndAt: (dates: DateRange | undefined)=> void 
}

export function DestinationNDateTrip({isPhase2, openPhase2, closePhase2, setDestination, setEventStartAtNEndAt, eventStartAtNEndAt}: DestinationNDateTripProps){

    const [calendarModal, setCalendarModal] = useState(false)

    const today = new Date();
    
    function openCalendarModal(){
      setCalendarModal(true)
    }
    function closeCalendarModal(){
      setCalendarModal(false)
    }

    return(
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex justify-center items-center shadow-shape">
            <div className="flex items-center space-x-3 flex-1">
              <MapPin className=" size-6 text-zinc-400"/>
              <input disabled={isPhase2} type="text" placeholder="where are you going ?" name="local" className="text-lg bg-transparent placeholder:text-zinc-400 outline-none flex-1" 
              onChange={event => setDestination(event.target.value)}/>
            </div>
            <div className="flex items-center space-x-3 px-5">
              <Button onClick={openCalendarModal} variant="tertiary">
                <Calendar/>
                {eventStartAtNEndAt && eventStartAtNEndAt.from && eventStartAtNEndAt.to? 
                format(eventStartAtNEndAt.from, "MMM  do ")
                .concat('to ')
                .concat(format(eventStartAtNEndAt.to, "MMM do',' yyyy"))
                : 'when ?'}
              </Button>
            </div>
            {isPhase2? (
              <Button onClick={closePhase2} variant="secondary">
                Change local/date
                <Settings2 />
              </Button>
            ): (
              <Button onClick={openPhase2}>
                Continue
                <ArrowRight />
              </Button>
            )}
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
              <DayPicker mode="range" selected={eventStartAtNEndAt} onSelect={setEventStartAtNEndAt}
              disabled={{before: today}}/>
            </div>
          </div>
        </div>
        )}
      </div>
    )
}