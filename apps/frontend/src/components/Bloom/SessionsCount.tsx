import { FC } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';


interface SessionsCountProps {
    sessions: number;
    completedSessions: {
        leftSessions: number,
        prefferedSessions: number,
        sessionCompleted: number
    }
}

const SessionsCount: FC<SessionsCountProps> = ({ sessions, completedSessions }) => {
    const circles = [];

    for (let i = 1; i <= sessions; i++) {
        circles.push(
            <Tooltip key={i}>
                <TooltipTrigger asChild>
                    <div key={i} className={cn(`w-5 h-5 rounded-full border-2 cursor-pointer border-[#2E2E2E] flex items-center justify-center`, i <= completedSessions?.sessionCompleted && 'bg-green-900')}>
                        {
                            i <= completedSessions?.sessionCompleted && <Check size={12} />
                        }

                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Session {i}</p>
                </TooltipContent>
            </Tooltip>

        );
    }

    return <TooltipProvider><div className="flex space-x-2 mt-10">{circles}</div></TooltipProvider>;


}

export default SessionsCount