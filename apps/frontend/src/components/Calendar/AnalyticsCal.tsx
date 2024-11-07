
import { cn } from '@/lib/utils';
import {
    eachDayOfInterval,
    eachMonthOfInterval,
    endOfMonth,
    endOfYear,
    format,
    getDay,
    isEqual,
    isSameMonth,
    isToday,
    parse,
    startOfMonth,
    startOfToday,

} from 'date-fns'

import { useState } from 'react'
import { Separator } from '../ui/separator';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';


const getMonthsFromDate = (date?: Date) => {
    const year = new Date().getFullYear();
    const startMonth = startOfMonth(date ?? new Date(year, 0, 1));
    const endMonth = endOfYear(new Date(year, 0, 1));

    // Generate all months from the start month to December
    const months = eachMonthOfInterval({ start: startMonth, end: endMonth });
    return months
};



export default function AnalyticsCal() {
    const today = startOfToday()
    const [selectedDay, setSelectedDay] = useState(today)
    const [currentMonth] = useState(format(today, 'MMM-yyyy'))
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    return (
        <ScrollArea>
            <div className='grid grid-cols-6 grid-rows-1 gap-2'>
                {/* Show only the first 6 months */}
                {getMonthsFromDate().map((initalDays, monthIdx) => {
                    const days = eachDayOfInterval({
                        start: initalDays,
                        end: endOfMonth(initalDays),
                    })

                    return (
                        <div key={monthIdx} className='flex-shrink-0'>
                            <p className="text-center text-sm font-medium mb-2">{format(initalDays, 'MMM')}</p>
                            {/* Weekday header */}
                            <div className="grid grid-cols-7 text-xs leading-6 text-center text-gray-500 gap-[5px] mb-2">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                    <div key={i}>{day}</div>
                                ))}
                            </div>
                            <Separator />
                            {/* Days grid */}
                            <div className="grid grid-cols-7 gap-[5px]">
                                {days.map((day, dayIdx) => (
                                    <div
                                        key={day.toString()}
                                        className={cn(
                                            dayIdx === 0 && dayColStartClasses[getDay(day)],
                                        )}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setSelectedDay(day)}
                                            className={cn(
                                                isEqual(day, selectedDay) && 'text-white',
                                                !isEqual(day, selectedDay) &&
                                                isToday(day) &&
                                                'text-red-500',
                                                !isEqual(day, selectedDay) &&
                                                !isToday(day) &&
                                                isSameMonth(day, firstDayCurrentMonth) &&
                                                'text-white',
                                                !isEqual(day, selectedDay) &&
                                                !isToday(day) &&
                                                !isSameMonth(day, firstDayCurrentMonth) &&
                                                'text-gray-400',
                                                isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                                isEqual(day, selectedDay) &&
                                                !isToday(day) &&
                                                'bg-gray-900',
                                                !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                                (isEqual(day, selectedDay) || isToday(day)) &&
                                                'font-semibold',
                                                'mx-auto flex items-center justify-center w-3 h-3 rounded-full'
                                            )}
                                        >
                                            <div className='w-full h-full rounded-[3px] bg-[#171717] shadow border border-[#2E2E2E]'></div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}



const dayColStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
