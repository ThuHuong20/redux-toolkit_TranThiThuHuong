import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { randomId } from '@mieuteacher/meomeojs';
import { addToTask } from '../redux/cartSlice';
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
function AddTask() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [todoList, setTodoList] = useState("")
    const [status, setStatus] = useState("Incomplete")
    const dispatch = useDispatch()
    const AddToast = () => {
        toast.success('This is a add task!', {
            position: 'top-center',
        });
    };

    function getCurrentTime() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        var currentTime = hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm + " " + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        return currentTime;
    }

    const handleAddTask = ({ id, todoList, status, time }) => {
        dispatch(addToTask({ id, todoList, status, time: getCurrentTime() }))
        AddToast();
        setTodoList("")
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                ADD TODO
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add task"
                                autoFocus
                                value={todoList}
                                onChange={(e) => setTodoList(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Status</Form.Label><br />
                            <select style={{ width: "100%" }} value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Complete">Complete</option>
                            </select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        if (status === "Complete") {
                            handleAddTask({ id: randomId(), todoList, status: true })
                            setStatus("Incomplete")
                        } else if (status === "Incomplete") {
                            handleAddTask({ id: randomId(), todoList, status: false })
                            setStatus("Incomplete")
                        }
                    }}>
                        Add Task
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal >
            <Toaster />
        </>
    );
}

export default AddTask;