
import BadgerBackers from './BadgerBackers';
import AnnouncementToast from './AnnouncementToast'

import { ToastContainer } from 'react-bootstrap';
import { useState } from 'react';
import ToastsContext from '../contexts/ToastsContext';

export default function BadgerBackersParent(props) {

    const [toasts, setToasts] = useState([])

    const removeToast = (delToastIAT) => {
        setToasts(oldToasts => oldToasts.filter(iToast => iToast.iat !== delToastIAT))
    }

    const addToast = (toast) => {
        setToasts(oldToasts => [...oldToasts, { ...toast, iat: new Date().getTime() }])
    }
    return <div style={{ margin: "2rem" }}>
        <ToastsContext.Provider value={[toasts, addToast]}>
            <BadgerBackers />
        </ToastsContext.Provider>
        <ToastContainer position="bottom-end" className="p-3" style={{ position: "fixed" }}>
            {
                toasts.map((toast, i) => <AnnouncementToast key={toast.iat} {...toast} removeToast={removeToast} />)
            }
        </ToastContainer>
    </div>
}
