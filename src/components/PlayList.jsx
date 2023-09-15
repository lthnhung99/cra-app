
import React, { useState } from "react";
function PlayList() {
    const [playList, setPlayList] = useState([
        "Người lạ thoáng qua",
        "Thuyền quyên"
    ])
    const [songName, setSongName] = useState('')
    const [newSongName, setNewSongName] = useState(-1)
    const [editSong, setEditSong] = useState()

    const handleAdd = (e) => {
        e.preventDefault();
        setPlayList([
            ...playList,
            songName
        ])
        setSongName('')
    }
    const handleRemove = (songRemove) => {
        let confirm = window.confirm(`Bạn có chắc chắn muốn xóa bài: ${songRemove} không`)
        if (!confirm) return;
        setPlayList(() => {
            let newPlayList = playList.filter((item) => item != songRemove);
            return newPlayList;
        })
    }
    const handleUpdate = (index, songName) => {
        setNewSongName(index);
        setEditSong(songName);

    }

    const handleSaveUpdate = () => {
        setPlayList((prev) => {
            const newPlayList = [...prev];
            newPlayList[newSongName] = editSong
            return newPlayList;
        })
        setNewSongName(-1);
        setEditSong("")
    }

    return (
        <div>
            <div className="d-flex justify-content-center ">
                <div className="row col-sm-6">
                    <h1 className="text-danger">Play List</h1>
                    <form onSubmit={handleAdd}>
                        <div className="form-group d-flex ">
                            <input class="form-control form-control-ms me-3"
                                onInput={(e) => setSongName(e.target.value)}
                                value={songName} />
                            <button className="btn btn-primary">
                                <i className="fa fa-plus"></i>
                                Add</button>
                        </div>
                    </form>
                    <ul className="list-group mt-4">
                        {playList.map((song, index) => (
                            <li key={index} className="list-group-item list-group-item-success d-flex justify-content-between">

                                {index === newSongName ? (<input className="form-control"
                                    value={editSong}
                                    onChange={(e) => setEditSong(e.target.value)} />) : (song)}
                                <>
                                    {index === newSongName ? (
                                        <div className="d-flex">

                                            <button className="btn btn-success" onClick={handleSaveUpdate} >
                                                <i class="fa-solid fa-circle-check"></i>
                                            </button>


                                            <span onClick={() => setNewSongName(-1)}></span>
                                        </div>
                                    ) : (
                                        <div className="d-flex">
                                            <button className="btn btn-primary" onClick={() => handleUpdate(index, song)} >
                                                <i class="fa-regular fa-pen-to-square"></i>
                                            </button>
                                            <button className="btn btn-danger ms-2" onClick={() => handleRemove(song)}>
                                                <i class="fa-solid fa-circle-xmark"></i>
                                            </button>
                                        </div>
                                    )}
                                </>
                                {/* <div>
                                    <button className="btn btn-primary" onClick={() => handleSaveUpdate(index, song)} >
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </button>
                                    <button className="btn btn-danger ms-2" onClick={() => handleRemove(song)}>
                                        <i class="fa-solid fa-circle-xmark"></i>
                                    </button>
                                </div> */}

                            </li>


                        ))}

                    </ul>


                </div >
            </div >
        </div >
    )
}

export default PlayList;