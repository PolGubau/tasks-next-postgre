import { useRouter } from "next/router";
import { Card } from "semantic-ui-react";
import { Task } from "src/interfaces/taks";
interface Props {
    tasks: Task[];
}

export default function TasksGallery({ tasks }: Props) {
    const router = useRouter()
  return (
    <>
      <Card.Group>
        {tasks.map((task) => (
          <Card key={task.id} onClick={()=>{router.push(`/edit/${task.id}`)}}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <Card.Meta>{task.description}</Card.Meta>
              <Card.Description>{task.status}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  );
}
