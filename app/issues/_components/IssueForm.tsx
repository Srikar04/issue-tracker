'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import { MdError } from "react-icons/md";
import  SimpleMDE  from 'react-simplemde-editor';

import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const IssueForm = async ({ issue }: { issue?: Issue }) => {


    type Issue = z.infer<typeof issueSchema>

    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<Issue>({
        resolver: zodResolver(issueSchema)
    });

    const router = useRouter();

    const [error, setError] = useState("");

    const submitForm = async (data: object) => {
        try {
            if (issue) {
                await axios.patch("/api/issues/" + issue.id, data);
            } else {
                await axios.post("/api/issues", data);
            }
            router.push("/issues/list");
            router.refresh();
        } catch (error) {
            console.log(error);
            setError("An error occurred while creating the issue. Please try again.");
        }
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
                <Button disabled={isSubmitting}>
                    {issue ? "Update Issue" : "Create new Issue"} {" "} {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm