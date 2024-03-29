'use client'

import React from 'react'
import { Select } from "@radix-ui/themes";
import { User } from '@prisma/client';
import axios from 'axios';

const AssigneeSelect = () => {
    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get<User[]>("/api/users");
            setUsers(data);
        }
        fetchUsers();
    }, []);


    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign to User" />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {
                        users.map((user) => {
                            return <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        })
                    }
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect
