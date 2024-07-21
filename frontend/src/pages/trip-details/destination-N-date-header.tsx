import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { format } from "date-fns";

interface Trip{
    id: string
    destination: string
    starts_at: string
    ends_at: string
    is_confirmed: boolean
}

interface DestinationNDateHeaderProps{
    openDestinationNDateHeader: () => void
    trip: Trip | undefined
}

export function DestinationNDateHeader({openDestinationNDateHeader, trip}: DestinationNDateHeaderProps){
    

    return(
        <div className="h-16 px-5 rounded-lg bg-zinc-800 flex shadow-shape">
            <div className="flex items-center space-x-2 flex-1">
                <MapPin className="size-6 text-zinc-400"/>
                <span className="text-lg font-medium">{
                    trip?.destination    
                }</span>
            </div>
            <div className="flex items-center space-x-5 px-6">
                <div className="flex items-center space-x-2">
                    <Calendar className="size-6 text-zinc-400 "/>
                    <span className="text-lg font-medium">{
                        trip? (format(trip.starts_at, "MMM do "))
                        .concat('to ')
                        .concat(format(trip.ends_at, "MMM do',' yyyy")) : null
                    }</span>
                </div>
                <Button variant="secondary" onClick={openDestinationNDateHeader}>
                    Change local/date
                    <Settings2 />
                </Button>
            </div>  
        </div>
    )
}