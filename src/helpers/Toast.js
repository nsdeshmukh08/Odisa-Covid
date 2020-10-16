import { toast as Toast } from 'react-toastify';

export default function toast(message,type="info"){
    Toast[type](message)
}