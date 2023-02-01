import moment from 'moment'
import React, { useEffect, useState } from 'react'
import useAuth from '../hook/useAuth'

const DateDisplay: React.FC = () => {
    const [date, setDate] = useState('')

    /**
     * On component render sets the date state to current date and time
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(moment().toDate().toString())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const userAuth = useAuth()

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <span style={{ color: 'orange' }} onClick={() => userAuth.logOutUser()}>
                {date}
            </span>
        </div>
    )
}

export default DateDisplay
