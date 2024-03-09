'use client';

import { TextField,Button ,Callout} from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { MdError } from "react-icons/md";


import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import {z} from 'zod';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import {useState} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateIssueSchema } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';

const newIssue = () => {

  type Issue = z.infer<typeof CreateIssueSchema>

  const {register,control,handleSubmit,formState:{errors}} = useForm<Issue>({
     resolver : zodResolver(CreateIssueSchema)
  });

  const router = useRouter();

  const [error,setError] = useState("");


  const submitForm = async (data: object) => {
     await await axios.post('/api/issues',data).
     then(response => router.push('/issues')).
     catch((error) => {
        setError("An error occurred while creating the issue. Please try again.")
     });
  }

  return (
    <div className=" max-w-xl space-y-4">
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
        <form className = "space-y-4" onSubmit={handleSubmit(submitForm)}>
            <TextField.Root>
                <TextField.Input placeholder="Title" {...register("title")}/>
            </TextField.Root>
            <ErrorMessage>
              {errors.title?.message}
            </ErrorMessage>
            <Controller 
              name="description"
              control={control}
              render={({ field }) => (
                <SimpleMDE placeholder="Enter the description of the issue" {...field}/>
              )}
            />
            <ErrorMessage>
              {errors.description?.message}
            </ErrorMessage>
            <Button>Create new Issue</Button>
        </form>
    </div>
  )
}

export default newIssue