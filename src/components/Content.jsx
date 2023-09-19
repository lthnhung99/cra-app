import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const studentSchema = yup.object({
    name: yup.string()
        .required("Name là bắt buộc")
        .min(5, "Tên phải từ 5 ký tự!"),
    city: yup.string().required("City là bắt buộc"),
    gender: yup.string().required(),
    mark: yup.number()
        .required("Mark bắt buộc phải nhập")
        .min(0, "Mark phải lớn hơn hoặc 0")
        .max(10, "Mark phải nhỏ hơn hoặc bằng 10")
        .typeError("Không hợp lệ")
    ,
    age: yup.number()
        .required()
        .positive()
        .max(25, "Age phải nhỏ hơn 25")
        .typeError("Không hợp lệ")
})
const Content = () => {
    const [studentList, setStudentList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [action, setAction] = useState('next')
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(studentSchema)
    })

    const handleCreate = (data) => {
        console.log(data);
        postData("https://js-post-api.herokuapp.com/api/students", data)
        setShow(false);
        reset()
    }
    async function postData(url, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }


    useEffect(() => {
        async function getPost() {
            let response = await fetch(`https://js-post-api.herokuapp.com/api/students?_page=${currentPage}`)
            let json = await response.json();
            setStudentList(json.data);
            setTotalPage(Math.ceil(Number(json.pagination._totalRows) / Number(json.pagination._limit)))
        }
        getPost();
    }, [currentPage])

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
            setAction('next')
        }
    }
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setAction('previous')
        }
    }
    const handleFirstPage = () => {
        setCurrentPage(1);
        setAction('first')
    }
    const handleLastPage = () => {
        setCurrentPage(totalPage);
        setAction('last')
    }
    // const handleRemove = (studentRemove) => {
    //     let confirm = window.confirm(`Bạn có chắc chắn muốn xóa không ?`)
    //     if (!confirm) return;
    //     setStudentList(() => {
    //         let newStudent = studentList.filter((item) => item !== studentRemove);
    //         return newStudent;
    //     })

    // }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        //clearErrors();
        reset()
        setShow(false);
    }
    const handleShow = () => setShow(true);



    return (
        <div className="container-fluid">
            <h1>List Student</h1>
            <Button variant="primary" onClick={handleShow}>
                <i className="fa fa-plus"></i>
                Add
            </Button>
            <table className="table table-bordered">
                <thead className="table-success">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>Mark</th>
                        {/* <th colSpan={2}>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {studentList.map((student) => (
                        <tr>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.gender}</td>
                            <td>{student.age}</td>
                            <td>{student.city}</td>
                            <td>{student.mark}</td>
                            {/* <td>
                                <button className="btn btn-success me-3">
                                    <i class="fa-solid fa-user-pen"></i>
                                </button>
                                <button className="btn btn-danger" onClick={() => handleRemove(student)}>
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </td> */}

                        </tr>
                    ))}
                </tbody>
            </table >

            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`${currentPage === 1 ? 'page-item disabled' : 'page-item '} ${action === 'first' ? 'active' : ''}`}>
                        <button className="page-link" onClick={handleFirstPage}>First</button>
                    </li>

                    <li className={`${currentPage <= 1 ? 'page-item disabled' : 'page-item '} ${action === 'previous' ? 'active' : ''}`}>
                        <button className="page-link" onClick={handlePreviousPage}>
                            Previous
                        </button>
                    </li>
                    <li className={`${currentPage >= totalPage ? 'page-item disabled' : 'page-item '} ${action === 'next' ? 'active' : ''}`}>
                        <button className="page-link" onClick={handleNextPage}>
                            Next
                        </button>
                    </li>
                    <li className={`${currentPage >= totalPage ? 'page-item disabled' : 'page-item '} ${action === 'last' ? 'active' : ''}`}>
                        <button className="page-link" onClick={handleLastPage}>
                            Last
                        </button>
                    </li>
                </ul>
            </nav>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal create</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleCreate)} className="mx-3">
                        <div className="form-group mb-3">
                            <label className="lable-form">Name</label>
                            <input type="text" className="form-control" {...register('name')} />
                            <span className="text-danger">{errors?.name?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label className="lable-form">Gender</label>
                            <select className="form-select" {...register('gender')}>

                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {/* <input type="text" className="form-control" {...register('gender')} /> */}

                        </div>
                        <div className="form-group mb-3">
                            <label className="lable-form">Age</label>
                            <input type="number" className="form-control" {...register('age')} />
                            <span className="text-danger">{errors?.age?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label className="lable-form">City</label>
                            <input type="text" className="form-control" {...register('city')} />
                            <span className="text-danger">{errors?.city?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label className="lable-form">Mark</label>
                            <input type="text" className="form-control" {...register('mark')} />
                            <span className="text-danger">{errors?.mark?.message}</span>
                        </div>
                        {/* <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary me-3">Save</button>
                            <button type="button" className="btn btn-danger" onClick={() => reset()}>Cancel</button>
                        </div> */}
                        <Modal.Footer>
                            <Button variant="secondary" type="button" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>

            </Modal>

        </div >
    )
}

export default Content;