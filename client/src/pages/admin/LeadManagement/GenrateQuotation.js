import { useState, useEffect, useRef } from "react";
import axios from "axios";
import api, { baseURL } from '../../../API/api.url';
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvBG from "../../../assets/img/invoiceBG.png";
import { FaCheckCircle } from "react-icons/fa";

const GenrateQuotation = () => {
  const componentRef = useRef();
  const location = useLocation();
  const quotationId = location.state;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}${api.quotation.genrateQuotation.url}/${quotationId}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching quotations:", error);
      }
    };

    if (quotationId) {
      fetchData();
    }
  }, [quotationId]);

  // 🖨️ Print Function
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  // 📄 PDF Download Function
  const handleDownloadPDF = () => {
    const input = componentRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("quotation.pdf");
    });
  };



  return (
    <div className="container py-4">
      {/* Buttons for Print & PDF Download */}
      <div className="d-flex justify-content-end mb-3">
        {/* <button className="btn btn-primary me-2" onClick={handlePrint}>
          Print
        </button> */}
        <button className="btn btn-success" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>

      {/* Quotation Content */}
      <div ref={componentRef} className="invoice-section bg-white p-4 shadow-lg">
        {/* 🏷️ Banner Image */}
        <div className="position-relative w-100">
          <img src={InvBG} alt="Banner" className="img-fluid w-100" />
        </div>

        <div className="mt-4 mt-4 justify-content-between d-flex">
          <h4><b>Quotation no: </b><span>{data?.quotationNo}</span></h4>
          <h4 className="float-end"><b>Quotation Date: </b>
            <span>{data?.quotationDate
              ? new Date(data.quotationDate)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : ""}</span></h4>
        </div>

        {/* 📑 Invoice Header */}
        <div className="row mt-4">
          <div className="col-md-4">
            <p>
              <FaCheckCircle color="#0084C3" size={20} className="me-2" />
              Bill To:
            </p>
            <div className="card p-3">
              <h3 className="fw-bold h5 mb-2">{data?.name}</h3>
              <p className="mb-1">{data?.phone}</p>
              <p className="mb-1">{data?.email}</p>
              <p className="mb-1">
                {data?.address}
              </p>
            </div>
          </div>

          <div className="col-md-5">
            <p>
              <FaCheckCircle color="#0084C3" size={20} className="me-2" />
              Bill From:
            </p>
            <div className="card p-3">
              <h3 className="fw-bold h5 mb-2">Ubikon Technologies Pvt.Ltd</h3>
              <p className="mb-1">+91 6264818989</p>
              <p className="mb-1">
                Behind C21, Vijay Nagar, Indore, MP 452010
              </p>
              <p className="mb-1">GSTIN: 12345 6789 US0001</p>
            </div>
          </div>

          <div className="col-md-3">
            <p>
              <FaCheckCircle color="#0084C3" size={20} className="me-2" />
              Contact Us:
            </p>
            <div className="card p-3">
              <h3 className="fw-bold h5 mb-2">Support</h3>
              <p className="mb-1">+91 6264818989</p>
              <p className="mb-1">contact@ubikon.in</p>
              <p className="mb-1">https://www.ubikon.in</p>
            </div>
          </div>
        </div>

        {/* 📊 Invoice Table */}
        <h2 className="fw-semibold mt-5 h4 mb-4">Project Overview</h2>
        <div className="card shadow-lg rounded bg-white">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table border-0">
                <thead className="border-0">
                  <tr>
                    <th style={{ color: "#868DA6" }}>Description</th>
                    <th style={{ color: "#868DA6" }}>Qty</th>
                    <th style={{ color: "#868DA6" }}>Price</th>
                    <th style={{ color: "#868DA6" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.items?.map((item, index) => (
                    <tr key={index} className="border-top border-bottom">
                      <td>{item?.description}</td>
                      <td>{item?.qty}</td>
                      <td>{item?.price}</td>
                      <td>{item?.total}</td>
                    </tr>
                  ))}
                  <tr className="border-top border-bottom mt-3">
                    <td colSpan="4" className="pt-3 pb-3">
                      <div dangerouslySetInnerHTML={{ __html: data.projectOverview }}></div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="text-end fw-bold">
                      Total Amount: {data?.totalAmount}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* 📍 Milestone Section */}
        <h2 className="fw-semibold mt-5 h4 mb-4">Payment Milestones</h2>
        <div className="row g-3">
          {data?.milestone?.map((milestone, index) => (
            <div className="col-md-4" key={index}>
              {/* <p>
              <span className="rounded-pill mx-2" 
                style={{ fontSize: "12px", padding: "6px 11px", backgroundColor: "#0084C3", color: "#fff" }}>
                {index + 1}
              </span>
              {milestone.title}
            </p> */}
              <div className="card p-3 rounded-4">
                <h3 className="fw-bold h5 mb-2">{milestone.title}</h3>
                <p>{milestone.percentage}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 📜 Terms & Conditions */}
        <div className="card-body mt-5">
          <h6 className="fw-semibold mt-1">Terms & Conditions</h6>
          <p>
            Fees and payment terms will be established in the contract. An
            initial deposit is required before work begins. For more details,
            visit{" "}
            <a href="https://www.ubikon.in/policy" style={{ color: "#0084C3" }}>
              https://www.ubikon.in/policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenrateQuotation;
