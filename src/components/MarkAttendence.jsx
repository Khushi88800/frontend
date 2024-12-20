import React, { useState } from 'react'

function MarkAttendence() {
    const [employeeName, setEmployeeName] = useState("")
    const [date, setDate] = useState("")
    const [status, setStatus] = useState("Present")
    return (
        <div className=" m-auto flex justify-center items-center min-h-screen w-full ">
            <form action="">

                <h1 className='text-3xl font-medium text-center text-blue-600'>
                    Mark Attendence
                </h1>
                <label htmlFor="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Employee Name :-
                    <input
                        type="text"
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light '
                        value={employeeName}
                        onChange={(e) => {
                            setEmployeeName(e.target.value)
                        }}
                    />
                </label>
                <label htmlFor="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    date:
                    <input
                        type="date"
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value)
                        }} />
                </label>
                <label htmlFor="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Status:-
                    <select value={status} onChange={(e) => {
                        setStatus(e.target.value)
                    }} >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                </label>
            </form>
        </div>
    )
}

export default MarkAttendence