import React, { useState } from "react";
import Footer from "./Orderfooter";
import Orderheader from "./orderheader";
import "./orderlist.css";
import "./mainhome.css";
import "font-awesome/css/font-awesome.min.css";
import { Modal } from "react-bootstrap";
import Ordercomponent from "./ordercomponent";
import Summaryorder from "./summaryorder";
import { useHistory } from "react-router-dom";

const order = { orderId: "orderId", userId: "userId", details: new Map() };
let orderedDate = [];

function Orderlist() {
  const [show, setShow] = useState(false);
  const history = useHistory();

  function handleCallback(props) {
    order.details.set(props.name, props.value);
    orderedDate = [...order.details].map(([name, value]) => ({
      name,
      value,
    }));
    console.log("orderData", orderedDate);
    return;
  }

  const orderComponents = [
    {
      image: "https://e7.pngegg.com/pngimages/723/938/png-clipart-t-shirt-denim-jeans-sleeve-women-s-jeans-blue-women-accessories.png",
      description:
        "SHIRT",
      name: "Shirts",
      type: "Boolean",
    },
    {
      image: "data:image/jpeg;base64,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",
      description:
        "T-SHIRT",
      name: "Tshirts",
      type: "Boolean",
    },
    {
      image: "https://banner2.cleanpng.com/20180208/yge/kisspng-jeans-denim-stock-photography-clothing-fly-a-stacked-pair-of-jeans-5a7d1704eb5b18.339399861518147332964.jpg",
      description:
        "JEANS",
      name: "Jeans",
    },
    {
      image: "https://www.pngitem.com/pimgs/m/334-3341433_men-tack-pant-men-trousers-image-png-transparent.png",
      description:
        "TROUSERS",
      name: "Trousers",
      type: "Boolean",
    },
    {
      image: "https://w7.pngwing.com/pngs/439/842/png-transparent-hoodie-sweatpants-t-shirt-sweater-t-shirt-zipper-hoodie-sweatpants.png",
      description:
        "JOGGERS",
      name: "Joggers",
      type: "Boolean",
    },
    {
      image: "https://w7.pngwing.com/pngs/166/791/png-transparent-sweater-knitting-icon-round-neck-knit-sweater-children-blue-child-effect.png",
      description:
        "SWEATER",
      name: "Sweater",
      type: "Boolean",
    }
  ];
  return (
    <div>
      <Orderheader />
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-1 main-head" style={{width:"3%", padding:"0px"}}>
            <div class="row">
              <div class="col-lg-12">
                <i
                  class="fa fa-home fontmain"
                  onClick={() => history.push("/")} style={{marginBottom:"7px"}}
                ></i>
              </div>
              <div class="col-lg-12">
                <i
                  class="fa fa-plus-circle fontmain1"
                  onClick={() => history.push("/createorder")} style={{marginBottom:"7px"}}
                ></i>
              </div>
              <div class="col-lg-12">
                <i
                  class="fa fa-bars fontmain"
                  onClick={() => history.push("/pastorders")}
                ></i>
              </div>
            </div>
          </div>
          <div class="col-lg-11">
            <div class="row">
              <div class="col-lg-2">
                <p style={{font:"normal normal 600 16px/48px Open Sans", marginLeft:"30px"}}>Create Order</p>
              </div>
              <div class="col-lg-8"></div>
              <div class="col-lg-2">
                <div class="form-group has-search">
                  <span class="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    class="form-control"
                    id="searchbar"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>

            <table className="table maintable" style={{marginLeft:"35px"}}>
              <thead>
                <tr class="table-dark ">
                  <th style={{font:"normal normal 600 16px/48px Open Sans"}}>Product Types</th>
                  <th style={{font:"normal normal 600 16px/48px Open Sans"}}>Quantity </th>
                  <th style={{textAlign:"center", font:"normal normal 600 16px/48px Open Sans"}}>Wash Type</th>
                  <th style={{font:"normal normal 600 16px/48px Open Sans"}}>Price</th>
                  <th style={{font:"normal normal 600 16px/48px Open Sans"}}>Reset</th>
                </tr>
              </thead>
              <tbody>
                {orderComponents.map((orderItem) => (
                  <Ordercomponent
                    image={orderItem.image}
                    description={orderItem.description}
                    name={orderItem.name}
                    handleClick={handleCallback}
                  />
                ))}
              </tbody>
            </table>
            <div class="but-com">
              <button class="btn btn btn-outline-primary cancel" onClick={() => history.push("/createorder")} style={{color:"#5861ae",border:"1px solid #5861ae"}}>Cancel</button>
              <button
                class="btn btn btn-primary proceed"
                onClick={() => setShow(true)} style={{background:"#5861ae 0% 0% no-repeat padding-box", border:"1px solid #5861ae"}}
              >
                Proceed
              </button>
            </div>

            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Summary
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="confirm_page">
                  <div class="row mainadd">
                    <div class="col-lg-4">
                      <h6>Store Location</h6>
                      <p>Jp Nagar</p>
                    </div>
                    <div class="col-lg-4">
                      <h6>Store Address</h6>
                      <p>Near Phone Booth, 10th Road</p>
                    </div>
                    <div class="col-lg-4">
                      <h6>Phone</h6>
                      <p>+91 99999999</p>
                    </div>
                  </div>
                </div>

                <Summaryorder
                  total={orderedDate
                    .map((order) => order.value.price)
                    .reduce((acc, curr) => acc + parseInt(curr, 10), 0)}
                  orderedDate={orderedDate}
                />
              </Modal.Body>
            </Modal>
            <div class="createbtn"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Orderlist;
