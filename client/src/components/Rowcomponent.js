import React, { useState, useEffect } from "react";
import "./Rowcomponent.css";
import moment from "moment";
import viewicon from "./images/viewicon.png";
import axios from "axios";
import Summarypopup from './Summarypopup'
import "./Cancelpopup.css";
import "./Summarypopup.css"
// import { useNavigate } from "react-router";
import Calculationcomponent from "./Calculationcomponent";
import alert from './images/alert.jpg'
import Cancelpopup from './Cancelpopup'
import { getToken } from './Auth';


function Rowcomponent(props) {
  // console.log(props)
  const [summaryItems, setSummaryItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCancel, setIsCancel] = useState(false)
  // const navigate = useNavigate();
  const totalwithoutpickup = summaryItems.map((item)=>item.price).reduce((acc,cost)=>acc+parseInt(cost),0)
  // console.log(totalwithoutpickup)

  const count = 0;
  const currToken = getToken()
  const showSummaryHandler = () => {
    axios
      .get(`https://laundry-cart-backend-api.vercel.app/api/v1/order/${props._id}`, {
        headers: {
          Authorization: "test " + currToken,
        },
      })
      .then((res) => {
        console.log(res.data.data.orderDetails);
        setSummaryItems(res.data.data.orderDetails);
        setIsOpen(!isOpen);
      });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const cancelHandler = () =>{
    if (isOpen === true){
      setIsOpen(!isOpen)
    }
    setIsCancel(!isCancel)
  }

  const updateStatus = async () => {
    console.log(props._id)
    await axios.put(`https://laundry-cart-backend-api.vercel.app/api/v1/order/${props._id}`, {}, {    
        headers: {
          Authorization: "test " + currToken,
        },
      }).then(res => {
                console.log(res);
                cancelHandler()
                window.location.href = '/pastorders';
            })
            .catch(err => console.log(err)
            );
  }

  return (
    <div className="each-order">
      <p className="rcorderid">{props.order_id}</p>
      <pre>       </pre>
      <p className="rcorderdateandtime">
        {moment(props.createdAt).format("DD MMM YYYY,HH:mm")}
      </p>
      <pre>           </pre>
      <p className="rcstorelocation">koti</p>
      <pre>         </pre>
      <p className="rccity">hyderabad</p>
      <pre>           </pre>
      <p className="rcstorephone">9999999999</p>
      <pre>           </pre>
      <p className="rctotalitems">{props.total_quantity}</p>
      <pre>               </pre>
      <p className="rctotalprice">{props.total_price + 80}</p>
      <pre>           </pre>
      <p className="rcstatus">{props.status}</p>
      
      {props.status === "Ready to Pick Up" && (<>
        <pre>     </pre>
        <p className="rcforcancel" onClick={cancelHandler}>
          cancel order
        </p>
        <pre>   </pre>
        <input
        type="image"
        src={viewicon}
        className="rcview"
        onClick={showSummaryHandler}/>

        </>
        
      )}

      {props.status === "Cancelled" && (<>
      <pre>                  </pre>
      <input
        type="image"
        src={viewicon}
        className="rcview"
        onClick={showSummaryHandler}
      />

      </>)}
      
      {isOpen && (
        <Summarypopup
          content={
            <>
              <div className="bluehead">
                <div className="summarytext">Summary</div>
              </div>
              <div className="lightbluehead">
                <div className="leftchild">
                  <div className="newstore">Store Location</div>
                  <div className="newkoti">Koti</div>
                </div>
                <div className="middlechild">
                  <div className="newstore">Store Address:</div>
                  <div className="newkoti">Near Gokul Chat</div>
                </div>
                <div className="rightchild">
                  <div className="newstore">Phone</div>
                  <div className="newkoti">91 9999999999</div>
                </div>
              </div>
              <hr className="hline"></hr>
              <div className="orderdetails">Order Details</div>              
              
              <div className="dynamicorders"> 
                {summaryItems.map((item) => {
                  return <Calculationcomponent {...item} />;
                })}
              </div> 
              <hr className="hline"></hr>
              <span className="sub-total">Sub total: </span>

              <span>{summaryItems.map((item)=>item.price).reduce((acc,cost)=>acc+parseInt(cost),0)}</span>
              <div className="pickup-charges"></div>
              <span className="pickup-charges">Pickup Charges:</span>
              <span>90</span>
              <div className="total-cost">
                <div className="innertotalcost">Total:{totalwithoutpickup+90}</div>
              </div>
              <div className="address-bottom">Address</div>
              <div className="outer-add-box">
                <div className="home-in-address">Home</div>
                <div className="street-in-address">Near Gokul Chat, koti, Hyderabad</div>

              </div>

              {props.status === "Ready to Pick Up" && <input
                type="button"
                value="cancel order"
                className="cancel-btn-active" 
                onClick={cancelHandler}
              />}
            </>
          }
          handleClose={togglePopup}
        />
      )}

      {isCancel && <Cancelpopup
      content={<>
        <div className="purpleheader"></div>
        <div className="alertheader">Alert</div>
        <div className="suretocancel">Are you sure you want to cancel the order No:{props.order_id}</div>
        <img className="alert-image" src={alert}></img>
        <button className='proceed-btn' onClick={updateStatus}>Proceed</button>
      </>}
      handleClose={cancelHandler}
    />}
    </div>
  );
}
export default Rowcomponent;