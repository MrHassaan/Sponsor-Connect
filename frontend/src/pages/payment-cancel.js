import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function PaymentCancel() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Go back one step in history
    };

    return (
        <div class="container-xxl p-0">
                     <Navbar/>
                     <div class="container-fluid py-5 bg-dark text-center">
                     <img class="img-fluid m-4" src="assets/img/payment-failed.png" alt="payment-failed" />
                     <h1 className='text-danger'>Transaction Failed</h1>
                     <p className='text-white fs-5'>Payment can not be processed due to some error.</p>
                     <button className='m-4 btn btn-lg btn-danger' onClick={goBack}>Try Again</button>
                     </div>               
        </div>
        
       );
}

export default PaymentCancel;


