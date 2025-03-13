import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import invoiceBG from '../assets/img/invoiceBG.png'

const ProposalQuotation = () => {
  const proposalRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = proposalRef.current;
    const options = {
      margin: 10,
      filename: "proposal_quotation.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    html2pdf().from(element).set(options).save();
  };
  

  return (
    <div style={{  display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div ref={proposalRef} style={{ backgroundColor: "#ffffff", borderRadius: "5px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", width: "100%", maxWidth: "100%" }}>
       
        <table style={{ width: "100%", borderCollapse: "collapse", pageBreakInside: "auto" }}>
          <thead style={{ backgroundColor: "#e9ecef", display: "table-header-group" }}>
            <tr>
              <th colSpan="3" style={{ width: "100%", border: "1px solid #dee2e6", padding: "0px" }}><img src={invoiceBG} width="100%" /></th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td  style={{ border: "0", padding: "10px", float: "left" }}><b>Quotation no:</b> 2003</td>
            <td  style={{ border: "0", padding: "10px", float: "right" }}><b>Quotation Date:</b> 12/03/2025</td>
            </tr>
          <tr>
               <td colSpan={3}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        
                
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                   
                    </div>
                </td> 
          </tr>
          <tr>
               <td colSpan={3}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        
                
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                   
                    </div>
                </td> 
          </tr>
          <tr>
               <td colSpan={3}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        
                
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                   
                    </div>
                </td> 
          </tr>
          <tr>
               <td colSpan={3}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        
                
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                   
                    </div>
                </td> 
          </tr>
          <tr>
               <td colSpan={3}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        
                
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{width:"30%", float:"left", margin: "3.333px", textAlign:"left", }}>
                        <p style={{fontWeight:"bold"}}>Bill To:</p>
                        <div style={{}}>
                            <div style={{padding:"20px", backgroundColor:"#EBEFF6", border:"1px solid #ccc", borderRadius:"30px"}}>
                                <h4 style={{fontWeight:"bold"}}>prateek bhawar</h4>
                                <p style={{color:"#868DA6"}}>6264719932</p>
                                <p style={{color:"#868DA6", wordBreak:"break-word"}} class="mb-1">prateekubikon@gmail.com</p>
                                <p style={{color:"#868DA6"}}>Pablo Alto, San Francisco, CA 92102, United States of America</p>
                            </div>
                        </div>
                    </div>
                   
                    </div>
                </td> 
          </tr>
          </tbody>
          <tfoot>
                <tr>
                    <td>
                        <p>sjsjjs sks kjsjss skksjhjksjh sjsj jsj</p>
                        <p>sjsjjs sks kjsjss skksjhjksjh sjsj jsj</p>
                        <p>sjsjjs sks kjsjss skksjhjksjh sjsj jsj</p>
                    </td>
                </tr>
          </tfoot>
        </table>
        
        <p style={{ marginTop: "15px", fontSize: "18px" }}>Total: <strong>$100</strong></p>
        <p style={{ color: "#6c757d" }}>Thank you for your business.</p>
      </div>
      
      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        <button onClick={handlePrint} style={{ backgroundColor: "#0d6efd", color: "#ffffff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Print</button>
        <button onClick={handleDownloadPDF} style={{ backgroundColor: "#198754", color: "#ffffff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Download PDF</button>
      </div>
    </div>
  );
};

export default ProposalQuotation;
