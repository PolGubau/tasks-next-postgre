import { useState } from "react";
import { Button, Card, Form, Icon } from "semantic-ui-react";
import { Task } from "src/interfaces/taks";

export default function FormNewTask() {
  const [task, setTasks] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTasks({
      ...task,
      [name]: value, // deja task como esta, pero cambia el valor de name por value
    });
  };

  
    const createTask=async (task: Task)=>{
        await fetch ("http://localhost:3000/api/tasks", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task),
        })
    }  
    
    
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{

    try {
        e.preventDefault(); 
        await createTask(task)
    }

     catch (error) {
        console.log(error)
    } 
    }
  return (
    <>
      <Card>
        <Card.Content>
          <Card.Header>
            <h3>Create a new one</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label htmlFor="title">Title</label>
                <input
                  onChange={handleChange}
                  type="text"
                  value={task.title}
                  placeholder="Title"
                  name="title"
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="description">Description</label>
                <textarea
                  onChange={handleChange}
                  value={task.description}
                  rows={2}
                  placeholder="Description"
                  name="description"
                ></textarea>
              </Form.Field>
              <Form.Field>
                <label htmlFor="status">Status</label>
                <input
                  onChange={handleChange}
                  value={task.status}
                  placeholder="Priority"
                  name="status"
                />
              </Form.Field>
              <Button type="submit">
                <Icon name="save" />
                Save
              </Button>
            </Form>
          </Card.Header>
        </Card.Content>
      </Card>
    </>
  );
}
