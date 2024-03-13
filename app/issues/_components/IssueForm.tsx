'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { MdError } from "react-icons/md";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
});

import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { CreateIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const IssueForm = async ({issue} : {issue? : Issue}) => {


    type Issue = z.infer<typeof CreateIssueSchema>

    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<Issue>({
        resolver: zodResolver(CreateIssueSchema)
    });

    const router = useRouter();

    const [error, setError] = useState("");
    // const [isSubmitting,setIsSubmitting] = useState(false);


    const submitForm = async (data: object) => {
        //  setIsSubmitting(true);
        await axios.post('/api/issues', data).
            then(response => router.push('/issues')).
            catch((error) => {
                // setIsSubmitting(false);
                setError("An error occurred while creating the issue. Please try again.")
            });
    }

    return (
        <div className=" max-w-2xl space-y-4">
            {error &&
                <Callout.Root color="red">
                    <Callout.Icon>
                        <MdError />
                    </Callout.Icon>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            }
            <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register("title")} />
                </TextField.Root>
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Enter the description of the issue" {...field} />
                    )}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button disabled={isSubmitting}>Create new Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssueForm