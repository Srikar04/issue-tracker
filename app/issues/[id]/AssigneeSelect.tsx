'use client'

import React from 'react'
import { Select } from "@radix-ui/themes";
import { Issue, User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@/app/components/Skeleton';
import Toast, { Toaster } from 'react-hot-toast';
import IssueDetails from './IssueDetails';


/*
React Query automatically caches the results of your queries in memory. 
This means that if you navigate away from a page and then return, 
React Query will first show you the cached data and then silently refetch in the 
background to sync the data with the server.
*/

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const { data: users, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axios.get<User[]>("/api/users");
            return data;
        },
        staleTime: 60 * 1000, //60s
        retry: 3
    });

    if (isLoading) return <Skeleton />

    if (error) return null;

    return (
        <>
            <Select.Root defaultValue={issue.assignedToUserId || "none"} onValueChange={(userId) => {
                console.log(issue.id, userId);
                axios.patch("/api/issues/" + issue.id, {
                    assignedToUserId: userId != "none" ? userId : null,
                }).catch((error) => {
                    Toast.error("Failed to assign user");
                });
            }}>
                <Select.Trigger placeholder="Assign to User" />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="none">Unassign</Select.Item>
                        {
                            users?.map((user) => {
                                return <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                            })
                        }
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

export default AssigneeSelect
