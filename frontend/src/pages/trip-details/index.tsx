import { ArrowRight} from "lucide-react";
import { useEffect, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activity } from "./activity";
import { DestinationNDateHeader } from "./destination-N-date-header";
import { CreateInviteGuestsModal } from "./create-Invite-guests-modal";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { CreateLinkModal } from "./create-link-modal";
import { UpdateDestinationNDateModal } from "./update-destination-N-date-modal";
import { DateRange } from "react-day-picker";

interface Trip{
    id: string
    destination: string
    starts_at: string
    ends_at: string
    is_confirmed: boolean
}

interface Participant{
    id: string
    name: string | null
    email: string
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
interface Links{
    id: string
    title: string
    url: string
}
export function TripDetails (){

    const { tripId } = useParams();

    const [isNewActivityModal, setIsNewActivityModal] = useState(false)
    const [isGuestModal, setIsGuestModal] = useState(false)
    const [isLinkModal, setIsLinkModal] = useState(false)
    const [isDestinationNDateModal, setIsDestinationNDateModal ] = useState(false)
    
    
    const [trip, setTrip] = useState< Trip | undefined >()
    const [destination, setDestination] = useState<string>()
    const [eventStartAtNEndAt, setEventStartAtNEndAt] = useState<DateRange | undefined>()
    const [participants, setParticipants] = useState<Participant[]>([])
    const [activities, setActivities] = useState<Activities[]>([])
    const [links, setLinks] = useState<Links[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
    }, [tripId])

    useEffect(() => {
        api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
    }, [tripId])
    
    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId])

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
    }, [tripId])

    function openNewActivityModal(){
        setIsNewActivityModal(true)
    }
    function closeNewActivityModal(){
        setIsNewActivityModal(false)
    }

    function openGuestModal(){
        setIsGuestModal(true)
    }

    function closeGuestModal(){
        setIsGuestModal(false)
    }

    function openLinkModal(){
        setIsLinkModal(true)
    }

    function closeLinkModal(){
        setIsLinkModal(false)
    }

    function openDestinationNDateModal(){
        setIsDestinationNDateModal(true)
    }

    function closeDestinationNDateModal(){
        setIsDestinationNDateModal(false)
    }

    const refreshParticipants = async () => {
        const response = await api.get(`/trips/${tripId}/participants`);
        setParticipants(response.data.participants)
    }

    const refreshActivities = async () => {
        const response = await api.get(`/trips/${tripId}/activities`);
        setActivities(response.data.activities)
    }

    const refreshLinks = async () => {
        const response = await api.get(`/trips/${tripId}/links`)
        setLinks(response.data.links)
    }

    return(
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <DestinationNDateHeader openDestinationNDateHeader={openDestinationNDateModal} trip={trip}/>
            <main className="flex gap-16">
                <div className="flex flex-col flex-1 space-y-6">
                    <div className="w-full flex items-center justify-between">
                        <h2 className="text-3xl font-medium">Activities</h2>
                        <button onClick={openNewActivityModal} className="w-auto h-9 px-4 bg-lime-500 rounded-md font-semibold flex items-center gap-2 hover:bg-lime-600 hover:animate-pulse ">
                            Add activity
                            <ArrowRight/> 
                        </button>
                    </div>
                    <Activity activities={activities} setActivities={setActivities}/>
                </div>

                <div className="w-80 flex flex-col space-y-6">
                    <ImportantLinks openLinkModal={openLinkModal} refreshLinks={refreshLinks} links={links}/>
                    <Guests openCreateInviteGuestsModal={openGuestModal} participants={participants}/>
                </div>
            </main>
            {isNewActivityModal && (
                <CreateActivityModal closeActivityModal={closeNewActivityModal} refreshActivities={refreshActivities}/>
            )}
            {isGuestModal &&( 
                <CreateInviteGuestsModal closeCreateInviteGuestsModal={closeGuestModal} participants={participants} refreshParticipants={refreshParticipants}/>
            )}
            {isLinkModal && (
                <CreateLinkModal closeLinkModal={closeLinkModal} setRefresh={refreshLinks}/>
            )}
            {isDestinationNDateModal && (
                <UpdateDestinationNDateModal closeUpdateDestinationNDateModal={closeDestinationNDateModal} trip={trip} eventStartAtNEndAt={eventStartAtNEndAt} setEventStartAtNEndAt={setEventStartAtNEndAt} setDestination={setDestination} closeDestinationNDateModal={closeDestinationNDateModal} destination={destination} setActivities={setActivities} setTrip={setTrip}/>
            )}
        </div>
    )
}