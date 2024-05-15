import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

function AdminPaymentWalletDetails() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [payments, setReceivedPayments] = useState([]);
    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    const fetchPayments = async () => {
        try {
            let apiUrl = '/adminpaymentwallets';
            const res = await fetch(apiUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (!res.ok) {
              throw new Error('Failed to fetch payments');
            }
        
            const data = await res.json();
            setReceivedPayments(data);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        fetchPayments();
      }, [payments]);

      
    return (
        <div>
            <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className="logo-details">
                     <img className="img-fluid" src="assets/img/fav.ico" alt="Icon" style={{paddingLeft:"20px",width: "45px", height: "30px"}}/> 
                     <span className="logo_name px-4">SPONSOR CONNECT</span> 
                </div>
                <ul className="nav-links" style={{padding:"0"}}>
                <li>
                        <Link to="/admindashboard" >
                            <i className='bx bx-grid-alt' ></i>
                            <span className="links_name">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/adminusers">
                            <i className='bx bx-user'></i>
                            <span className="links_name">Registered Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminevents">
                            <i className='bx bx-calendar' ></i>
                            <span className="links_name">Upcoming Events</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminreceivedpayments">
                            <i className='bx bx-money'></i>
                            <span className="links_name">Payments Received</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminwalletdetails" className='active'>
                            <i className='bx bx-envelope' ></i>
                            <span className="links_name">Organizers Wallet Details</span>
                        </Link>
                    </li> 
                    <li className="log_out mb-5">
                        <Link to="/adminlogout">
                            <i className='bx bx-log-out'></i>
                            <span className="links_name">Log out</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <section className="home-section">
                <nav>
                    <div className="sidebar-button">
                    <i className={`bx ${isSidebarOpen ? 'bx-menu-alt-right' : 'bx-menu'} sidebarBtn`} onClick={toggleSidebar}></i>
                        <span className="dashboard">Dashboard</span>
                    </div>
                    <div className="profile-details">
                        
                        <span className="admin_name">Admin</span>
                    
                    </div>
                </nav>

                <div className="home-content">
                    {payments.length > 0 && (
                <div className="sales-boxes">
                    <div className="recent-sales box">
                        <div className="title">Organizer Account Details</div>
                        <div className="sales-details">
                                    <ul className="details">
                                        <li className="topic">Email</li> 
                                        {payments.map((payment, index) => (
                                        <li key={index}>{payment.organizerEmail}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">Payment Gateway</li> 
                                        {payments.map((payment, index) => (
                                        <li key={index}>{payment.paymentGateway}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">Account Number</li> 
                                        {payments.map((payment, index) => (
                                        <li key={index}>{payment.accountNumber}</li>
                                        ))}                                     
                                    </ul> 
                        </div>
                    </div>
                </div>
            )}
                </div>
            </section>
        </div>
    );
}

export default AdminPaymentWalletDetails;

