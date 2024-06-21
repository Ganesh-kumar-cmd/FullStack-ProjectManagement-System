import React, { useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusIcon } from '@radix-ui/react-icons';
import InviteUserForm from './InviteUserForm';
import IssueList from './IssueList';
import ChatBox from './ChatBox';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProjectById } from '@/Redux/Project/Action'; // Ensure this path is correct

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const project = useSelector(store => store.project.projectDetails);

  const handleProjectInvitation = () => {};

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id, dispatch]);

  return (
    <div className="mt-5 lg:px-10">
      <div className="lg:flex gap-5 justify-between pb-4">
        <ScrollArea className="h-screen lg:w-[69%] pr-2">
          <div className="text-gray-400 pb-10 w-full">
            <h1 className="text-lg font-semibold pb-5">
              {project?.name}
            </h1>
          </div>
          <div className="space-y-5 pb-5 text-sm">
            <p className="w-full md:max-w-lg lg:max-xl">
              {project?.description}
            </p>
            <div className="flex">
              <p className="w-36">Project Lead :</p>
              <p>{project?.owner.fullName}</p>
            </div>
            <div className="flex">
              <p className="w-36">Members :</p>
              <div className="flex items-center gap-2">
                {project?.team.map((item) => (
                  <Avatar className="cursor-pointer" key={item.id}>
                    <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleProjectInvitation}
                    className="ml-2"
                  >
                    <span>Invite</span>
                    <PlusIcon className="w-3 h-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>Invite User</DialogHeader>
                  <InviteUserForm />
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex">
              <p className="w-36">Category :</p>
              <p>{project?.category}</p>
            </div>
            <div className="flex">
              <p className="w-36">Project Lead :</p>
              <Badge>{project?.owner.fullName}</Badge>
            </div>
            <section>
              <p className="py-5 border-b text-lg tracking-wider">Tasks</p>
              <div className="lg:flex md:flex gap-3 justify-between py-5">
                <IssueList status="pending" title="Todo List" />
                <IssueList status="in_progress" title="In progress" />
                <IssueList status="done" title="Done" />
              </div>
            </section>
          </div>
        </ScrollArea>
        <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
