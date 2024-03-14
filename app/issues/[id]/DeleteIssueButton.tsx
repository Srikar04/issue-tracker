'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    // Note: We have to import the useRouter hook from next/navigation
    // not from next/router because we are using the new app structure
    const router = useRouter();

    const deleteIssue = async () => {
        await axios.delete(`/api/issues/${issueId}`);
        router.push('/issues');
        router.refresh();
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red">Delete Issue</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure? This Issue will no longer be accessible.
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={deleteIssue}>
                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteIssueButton
