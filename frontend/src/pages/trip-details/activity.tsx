import { CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "../../components/button";
import { format } from "date-fns";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface Activities {
    date: string
    activities: {
        id: string
        title: string
        occurs_at: string
    }[]
}

 interface ActivityProps{
    activities: Activities[]
    setActivities: React.Dispatch<React.SetStateAction<Activities[]>>
} 

export function Activity({activities, setActivities}: ActivityProps){

    const {tripId} = useParams()

    async function deleteActivity(activityId: string){
        await api.delete(`/trips/${tripId}/activities`, {
            data: {
                activityId
            }
        })
        const response = await api.get(`/trips/${tripId}/activities`);
        setActivities(response.data.activities)
    }

    return(
        <div className="w-full flex flex-col space-y-2">
            {activities.map(category => {
                return (
                    <div key={category.date} className="py-2 space-y-3">
                        <div className="flex items-end space-x-2">
                            <span className="text-xl text-zinc-300">{format(category.date, "d 'Day'")}</span>
                            <span className="text-sm text-zinc-400">{format(category.date, 'EEEE')}</span>
                        </div>
                        {category.activities.length > 0 ?(
                            <div className="space-y-2">
                            {category.activities.map(activity => {
                                return (
                                    <div key={activity.id}  className="w-full h-10 px-4 py-6 space-x-6 rounded-xl bg-zinc-900 flex items-center justify-between shadow-shape">
                                        <button className="flex gap-2 text-zinc-200 hover:text-zinc-100 flex-1">
                                            <CheckCircle2 className="size-6 text-lime-200"/>
                                            {activity.title}
                                        </button>
                                        <div className="flex space-x-2">
                                            <span className="flex justify-center items-center text-zinc-400">
                                                {format(activity.occurs_at, 'h:mm a')}
                                            </span>
                                            {/* <Button button="ball" variant="tertiary"><Settings/></Button> */}
                                            <Button button="ball" variant="tertiary" onClick={() => deleteActivity(activity.id)}><Trash2/></Button>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        ):(
                            <p className="text-zinc-400 text-base">no activities for this day</p>
                        )}
                    </div>
                )
            })}
            
            
        </div>
    )
}