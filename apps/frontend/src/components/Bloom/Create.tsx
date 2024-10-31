
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Plus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import formatTime from '@/utils/formateTime'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/axiosInstance'
import Loader from '../Loader'
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    dailytimeGoal: z.number().min(5, {
        message: 'Daily Commitment must be at least 5 minutes'
    }).max(480, {
        message: 'Daily Commitment cannot exceed 480 minutes'
    })
})

const CreateBloom = () => {
    // const queryClient = useQueryClient()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            dailytimeGoal: 5
        },
    })


    const bloomMutation = useMutation({
        mutationFn: (bloomData: z.infer<typeof formSchema>) => {
            return api.post(`/bloom/create`, bloomData)
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        bloomMutation.mutate(values);
    }
    return (
        <Dialog>
            <DialogTrigger>
                <div className="h-44 w-44 p-[1px] bg-gradient-to-r from-lime-500 to-emerald-500 rounded-lg card-hover">
                    <div className="border rounded-lg p-4  flex flex-col items-center justify-center gap-4 cursor-pointer card h-full">
                        <Plus size={32} />
                        <p className="text-lg  font-head font-semibold">Create Bloom</p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="card">
                <DialogHeader>
                    <DialogTitle className="tracking-normal gradient-text">Start Your Bloom</DialogTitle>
                    <DialogDescription>
                        Define what you want to accomplish, set a daily time goal, and watch your progress bloom.
                    </DialogDescription>
                    <div className="pt-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Give your Bloom a name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Reading, Exercise, Skill Practice" {...field} className="text-black outline-none border-none bg-white/90 " />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dailytimeGoal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Daily Commitment</FormLabel>

                                            <div className="grid grid-cols-[5fr_1fr] items-center gap-3">
                                                <Slider value={[field.value]} min={5} max={480} step={5} onValueChange={(value) => field.onChange(value[0])} />
                                                <p className="text-sm whitespace-nowrap text-right">{formatTime(field.value)}</p>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end ">
                                    <Button variant='gradient' type="submit">
                                        {
                                            bloomMutation.isPending ? <Loader size="24px " /> : 'Start'
                                        }


                                    </Button>
                                </div>

                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBloom