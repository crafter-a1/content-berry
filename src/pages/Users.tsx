import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react';
import { InputTextField } from '@/components/fields/inputs/InputTextField';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    status: "Inactive",
  },
  {
    id: "3",
    name: "Robert Jones",
    email: "robert.jones@example.com",
    role: "Viewer",
    status: "Active",
  },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  // Implement onChange handlers that conform to the expected types
  const handleInputChange = (value: string) => {
    // Implementation here - extract from e.target.value if needed
    console.log("Value changed:", value);
  };

  // Replace incorrect keyFilter "numeric" with "numbers"
  const keyFilter = "numbers"; // Use one of the allowed values: "none", "letters", "numbers", "alphanumeric"

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Users</h1>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-md shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Create New User</h2>
            <div className="space-y-4">
              <InputTextField 
                id="user-name" 
                label="Username" 
                value={name || ""}
                onChange={handleInputChange} 
                keyFilter="letters"
              />
              <InputTextField
                id="user-email"
                label="Email"
                value={email || ""}
                onChange={handleInputChange}
              />
              <InputTextField
                id="user-role"
                label="Role"
                value={role || ""}
                onChange={handleInputChange}
              />
              <Button className="w-full">Create User</Button>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white rounded-md shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">User List</h2>
              <Input
                type="search"
                placeholder="Search users..."
                className="max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>A list of your registered users.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {USERS.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
