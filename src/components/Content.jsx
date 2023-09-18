import React, { useState, useEffect } from "react";
const Content = () => {
    const [studentList, setStudentList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [action, setAction] = useState('next')

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
    return (
        <div className="container-fluid">
            <h1>List Student</h1>
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

        </div >
    )
}

export default Content;