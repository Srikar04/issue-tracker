'use client';

import { TextField,Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const newIssue = () => {
  return (
    <div className = "space-y-4 max-w-xl">
        <TextField.Root>
            <TextField.Input placeholder="Title" />
        </TextField.Root>
        <SimpleMDE />
        <Button>Create new Issue</Button>
    </div>
  )
}

export default newIssue
