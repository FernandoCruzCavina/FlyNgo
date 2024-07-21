import { Rocket} from "lucide-react"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestModal } from "./invite-guest-modal"
import { ConfirmTrip } from "./confirm-trip-modal"
import { DestinationNDateTrip } from "./steps/destination-N-date-step"
import { InviteGuestStep } from "./steps/invite-guest-steps"
import { DateRange } from "react-day-picker"
import { api } from "../../lib/axios"

export function CreateTrip() {
  
  const navigate = useNavigate()

  const [isPhase2, setIsPhase2] = useState(false)
  const [isPersonsModal, setIsPersonsModal] = useState(false)
  const [isConfirTrip, setConfirmTrip] = useState(false)
  
  const [emailToInvite, setEmailToInvite] = useState([''])

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  
  const [eventStartAtNEndAt, setEventStartAtNEndAt] = useState<DateRange | undefined>()

  function openPersonsModal(){
    setIsPersonsModal(true) 
  }

  function closePersonsModal(){
    setIsPersonsModal(false)
  }

  function openPhase2 (){
    setIsPhase2(true)
  }

  function closePhase2(){
    setIsPhase2(false)
  }

  function openConfirmTrip(){
    setConfirmTrip(true)
  }
  function closeConfirmTrip(){
    setConfirmTrip(false)
  }

  function addEmail(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email){
      return
    }

    if (emailToInvite.includes(email)){
      return
    }

    setEmailToInvite(
      [...emailToInvite,
        email
      ]
    )
    event.currentTarget.reset()

  }

  function removeEmail(emailToRemove: string){
    const newEmailList = emailToInvite.filter(email => email !== emailToRemove)

    setEmailToInvite(newEmailList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    if(!eventStartAtNEndAt?.from || !eventStartAtNEndAt?.to) return
    
    if(!destination){return}

    if(!ownerName || !ownerEmail){return}

    console.log(destination)
    console.log(eventStartAtNEndAt.from)
    console.log(eventStartAtNEndAt.to)
    console.log(emailToInvite)
    console.log(ownerName)
    console.log(ownerEmail) 

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAtNEndAt.from,
      ends_at: eventStartAtNEndAt.to,
      emails_to_invite: emailToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const {tripId} = response.data
    
    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 flex flex-col text-center gap-y-6">
        <div className="flex justify-center space-x-3">
          <Rocket className="size-10"/>
          <h2 className="text-4xl">FlyNgo</h2>
        </div>
        <p>
          invite your friends and plan your trip!
        </p>
        <div className="flex flex-col space-y-4">
          <DestinationNDateTrip isPhase2={isPhase2} openPhase2={openPhase2} closePhase2={closePhase2} setDestination={setDestination} eventStartAtNEndAt={eventStartAtNEndAt} setEventStartAtNEndAt={setEventStartAtNEndAt}/>
          {isPhase2? (
          <InviteGuestStep emailToInvite={emailToInvite} openConfirmTrip={openConfirmTrip} openPersonsModal={openPersonsModal}/>
          ): null}
        </div>
        <p>
          When planning your trip with FlyNgo <br/> 
          you automatically agree to our <a href="#" className="underline"> terms of use</a> and <a href="#" className="underline">privacy policies</a>
        </p>
      </div>
      {isPersonsModal? (
        <InviteGuestModal addEmail={addEmail} closePersonsModal={closePersonsModal} emailToInvite={emailToInvite} removeEmail={removeEmail}/>
      ): null}
      {isConfirTrip? (
        <ConfirmTrip closeConfirmTrip={closeConfirmTrip} createTrip={createTrip} setOwnerName={setOwnerName} setOwnerEmail={setOwnerEmail}/>
      ): null}
    </div>
  )
}
