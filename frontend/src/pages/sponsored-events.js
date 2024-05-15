import React,{ useState, useEffect }from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function SponsoredEvents() {   
  
    const [events, setEvents] = useState([]);
    const fetchEvents = async () => {
        try {
            let apiUrl = 'https://sponsor-connect.vercel.app/getorganizedevents';

            const res = await fetch(apiUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (!res.ok) {
              throw new Error('Failed to fetch events');
            }
        
            const data = await res.json();
            setEvents(data);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        fetchEvents();
      }, []);

    return (
        <div class="container-xxl p-0">
                     <Navbar/>
                     <div className="container-xxl py-5 bg-white">
        <div className="container">
          <div className="row g-0 gx-5 align-items-end">
            <div className="col">
              <div className="text-center mx-auto mb-5">
              {events.length > 0 && <h1 className="mb-3">Sponsored Events</h1>}
              </div>

            </div>
          </div>
          <div className="tab-content">
            <div id="tab-1" className="tab-pane fade show p-0 active">
              <div className="row g-4">
              {events.length > 0 ? (
  events.map((event) => (
    <div key={event._id} className="col-lg-4 col-md-6">
      <div className="Event-item rounded overflow-hidden bg-dark">
        <div className="position-relative overflow-hidden">
          <Link to={`/eventdetails?id=${event._id}`}>
            <img className="img-fluid w-100" src={`http://localhost:5000/${event.eventlogo}`} alt="" />
          </Link>
        </div>
        <div className="p-4 pb-0 position-relative">
          <Link className="d-block h5 mb-2 text-white" to={`/eventdetails?id=${event._id}`}>{event.title}</Link>
          

          {event.sponsorPackages.map((sponsorPackage, index) => (
            <div key={index}>
              <p className="text-primary"><strong>Sponsor: </strong>{sponsorPackage.sponsorName}</p>
              <p className="text-white"><strong>Selected Package: </strong>{sponsorPackage.selectedPackage.amount} & {sponsorPackage.selectedPackage.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ))
) : (
  <div className="col-12 text-center">
    <img src="assets/img/no-events.jpg" alt="" className='img-fluid'/>
  </div>
)}


              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
        
       );
}

export default SponsoredEvents;
