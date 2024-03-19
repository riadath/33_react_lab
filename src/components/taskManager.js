import React, { useState } from 'react';
import { Container, ListGroup, Button, Row, Col, FormControl } from 'react-bootstrap';

const TaskManager = () => {
    const [tasks, setTasks] = useState([
    ]);

    const toggleEdit = (taskId) =>
        setTasks((current) =>
            current.map((task) => (task.id === taskId ? { ...task, isEditing: !task.isEditing } : task))
        );

    const updateTask = (taskId, event) => {
        const { name, value } = event.target;
        setTasks((current) =>
            current.map((task) => (task.id === taskId ? { ...task, [name]: value } : task))
        );
    };

    const handleAddTask = () => {
        const newTask = {
            id: Math.random(),
            title: '',
            description: '',
            isEditing: true, // set isEditing to true so the user can input the task details
        };
        setTasks((current) => [...current, newTask]);
    };


    const handleDelete = (taskId) => setTasks((current) => current.filter((task) => task.id !== taskId));

    const renderTaskContent = (task) => (
        <>
            <h5>{task.title}</h5>
            <p>{task.description}</p>
        </>
    );

    const renderTaskForm = (task) => (
        <>
            <FormControl size="sm" type="text" name="title" value={task.title} onChange={(e) => updateTask(task.id, e)} />
            <FormControl size="sm" as="textarea" name="description" value={task.description} onChange={(e) => updateTask(task.id, e)} />
        </>
    );

    return (
        <Container className="my-3">
            <Button className="mb-3" onClick={handleAddTask}>
                Add New Task
            </Button>
            <ListGroup>
                {tasks.map((task) => (
                    <ListGroup.Item key={task.id}>
                        <Row>
                            <Col>{task.isEditing ? renderTaskForm(task) : renderTaskContent(task)}</Col>
                            <Col md="auto">
                                <Button variant={task.isEditing ? 'success' : 'info'} className="mr-2" onClick={() => toggleEdit(task.id)}>
                                    {task.isEditing ? 'Save' : 'Edit'}
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(task.id)}>
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default TaskManager;
