'use client'

import Skeleton from '@/app/components/Skeleton';
import { Issue, User } from '@prisma/client';
import { Select } from "@radix-ui/themes";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Toast, { Toaster } from 'react-hot-toast';


/*
React Query automatically caches the results of your queries in memory. 
This means that if you navigate away from a page and then return, 
React Query will first show you the cached data and then silently refetch in the 
background to sync the data with the server.
*/

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const { data: users, error, isLoading } = useUsers();

    const assignUser = (userId: String) => {
        axios.patch("/api/issues/" + issue.id, {
            assignedToUserId: userId != "none" ? userId : null,
        }).catch((error) => {
            Toast.error("Failed to assign user");
        });
    };

    if (isLoading) return <Skeleton />

    if (error) return null;

    return (
        <>
            <Select.Root defaultValue={issue.assignedToUserId || "none"} onValueChange={assignUser}>
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

const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: async () => {
        const { data } = await axios.get<User[]>("/api/users");
        return data;
    },
    staleTime: 60 * 1000, //60s
    retry: 3
});

export default AssigneeSelect
