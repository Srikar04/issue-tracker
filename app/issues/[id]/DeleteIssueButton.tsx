'use client';

import Spinner from '@/app/components/Spinner';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import delay from 'delay';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    // Note: We have to import the useRouter hook from next/navigation
    // not from next/router because we are using the new app structure
    const router = useRouter();

    const [error, setError] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteIssue = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(`/api/issues/${issueId}`);
            router.push('/issues/list');
            router.refresh();
        } catch (error) {
            setIsDeleting(false);
            setError(true);
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" disabled={isDeleting}>
                        Delete Issue
                        {isDeleting && <Spinner />}
                    </Button>
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
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        There was an error deleting the issue.
                    </AlertDialog.Description>
                    <AlertDialog.Action>
                        <Flex gap="3" mt="4" justify="end">
                            <Button variant="soft" color="gray" onClick={() => setError(false)}>
                                Close
                            </Button>
                        </Flex>
                    </AlertDialog.Action>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton
