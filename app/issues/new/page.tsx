'use client';

import React from 'react';
import { TextField,TextArea } from '@radix-ui/themes';

const newIssue = () => {
  return (
    <div className = "space-y-4 max-w-xl">
        <TextField.Root>
            <TextField.Input placeholder="Title" />
        </TextField.Root>
        <TextArea placeholder="Description"/>
    </div>
  )
}

export default newIssue
