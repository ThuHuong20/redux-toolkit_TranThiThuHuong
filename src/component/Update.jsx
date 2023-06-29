import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { updateTask } from '../redux/cartSlice';
import toast, { Toaster } from 'react-hot-toast';
function Update({ item }) {
    const [editTask, setEditTask] = useState(item.todoList);
    const [editStatus, setEditStatus] = useState(item.status ? "Complete" : "Incomplete")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const UpdateToast = () => {
        toast.success('This is a update task!', {
            position: 'top-center',
        });
    };
    return (
        <>
            <span variant="primary" onClick={() => {
                handleShow()
            }
            }>
                <i style={{ color: "rgb(61, 88, 222)" }} class="fa-solid fa-pen-clip"></i>
            </span>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add task"
                                autoFocus
                                value={editTask}
                                onChange={(e) => setEditTask(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Status</Form.Label><br />
                            <select style={{ width: "100%" }} value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Complete">Complete</option>
                            </select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        UpdateToast()
                        if (editStatus === "Complete") {
                            dispatch(updateTask({
                                ...item,
                                todoList: editTask,
                                status: true,
                            }))
                            setEditStatus("Incomplete")
                        } else if (editStatus === "Incomplete") {
                            dispatch(updateTask({
                                ...item,
                                todoList: editTask,
                                status: false,
                            }))
                            setEditStatus("Incomplete")
                        }
                    }}>
                        Update Task
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Toaster />
        </>
    );
}

export default Update;