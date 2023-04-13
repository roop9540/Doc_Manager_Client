import axios from 'axios';
import React, { useEffect, useRef, useState, useContext } from 'react'
import { Userlogg } from '../App'

function Home() {
  let { loggedIn, setLoggedIn } = useContext(Userlogg)
  let {token, setToken} = useContext(Userlogg)

  let [documentName, setDocumentName] = useState('');
  let [documentDescritpion, setDocumentDescritpion] = useState('');
  let [document, setDocument] = useState('');
  let [documentEdit, setDocumentEdit] = useState('');
  let [documentNameEdit, setDocumentNameEdit] = useState('');
  let [documentDescritpionEdit, setDocumentDescritpionEdit] = useState('');
  let [documentIdEdit, setDocumentIdEdit] = useState('');
  let [documentIdDelete, setDocumentIdDelete] = useState('')
  let [data, setData] = useState([]);
  let [update, setUpdate] = useState(0);
  const closeBtn = useRef()
  const getDocuments = async () => {
    try {
      const result = await axios.get( process.env.REACT_APP_API_BASE_URL+ "document?id="+ localStorage.getItem("userId"), {
        headers:{
          headers:{
            "Content-Type": "multipart/form-data",
          }
        }
      })
      if (result.status === 200) {

        setData(result?.data?.result)
      }
    } catch (err) {
      console.log(err);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let formData = new FormData();
    formData.append('file', document);
    formData.append('name', documentName);
    formData.append('description', documentDescritpion)

      for (var pair of formData.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
    try {
      let link ="";
      if(localStorage.getItem("userId")){
        link = "document?id="+ localStorage.getItem("userId");
      }else{
        link = "document"
      }
      const res = await axios.post(process.env.REACT_APP_API_BASE_URL+ link, formData, { headers:{
        headers:{
          "Content-Type": "multipart/form-data",
        }
      }})
     
      if (res.status === 200) {
        // alert("Data Submitted succesfully")
        setUpdate(update+1)

      }
   
    } catch (err) {
      console.log(err);
      // alert(err?.response?.data?.message);
    }

  }
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', documentEdit);
    formData.append('name', documentNameEdit);
    formData.append('description', documentDescritpionEdit);
    formData.append('id', documentIdEdit)
    try {
      const res = await axios.put( process.env.REACT_APP_API_BASE_URL+"document",formData, {
        headers:{
          "Content-Type": "multipart/form-data",
        }
      })
      if (res.status === 200) {
        setUpdate(update+1)
      }
      
    } catch (err) {
      console.log(err);
      // alert(err?.response?.data?.message);
    }


  }

  const handleDelete = async () => {
    try {

      const res = await axios.delete(process.env.REACT_APP_API_BASE_URL+"document?id=" + documentIdDelete)
      if (res.status === 200) {
        setUpdate(update+1)
      }
    } catch (err) {
      console.log(err);
      // alert(err?.response?.data?.message);
    }

  }
  useEffect(() => {
    getDocuments();
  }, [token , update])


  return (
    <>
    <div className='home-bg vh-100'>
      {/* <h1 className='text-center '>Home</h1> */}
      <div className='container ' >
      {token? <div>
          <h2 className='text-center p-4' >LIST OF DOCUMENTS</h2>
        

          <table className="table">
            <thead className='bg-warning bg-opacity-25' >
              <tr>
                <th scope="col">Document Name</th>
                <th scope="col">Document Description</th>
                <th scope="col">Document</th>
                {token?
               <th scope="col">Actions</th>:""}
               
              </tr>
            </thead>
            <tbody>
              {data?.map((value) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{value?.name}</th>
                      <td>{value?.description}</td>
                      <td> <a href={process.env.REACT_APP_API_BASE_URL+value?.document} target='_blank' ><i class="bi fs-2 bi-file-earmark-pdf"></i></a></td>
                     
                    <td className='d-flex justify-content-around' ><button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => {
                        setDocumentNameEdit(value?.name);
                        setDocumentDescritpionEdit(value?.description);
                        setDocumentEdit(value?.document)
                        // console.log(value?._id)
                        setDocumentIdEdit(value?._id)

                      }} > Edit </button>
                        <br /><button className='btn btn-warning' onClick={() => {
                          setDocumentIdDelete(value?._id);
                          handleDelete()
                        }}> Delete </button>
                         </td>
                        
                    
                    </tr>
                  </>
                )
              })}

       
            </tbody>
          </table>
        </div>:""}
       
        
        {token?
   <div className='d-grid gap-2 col-6 mx-auto mt-4' >
<button type="button" class="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add Document
</button>
</div>:<h2 className='text-center mt-4'> Please LogIn to Add, Edit and Delete the Document</h2>}
       


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">ADD Document</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className='add-document' >
          <h2 className='text-center' ></h2>
          <form onSubmit={handleSubmit} >
            <div className="mb-3">
              <label htmlfor="documentName" className="form-label">Document Name</label>
              <input type="text" className="form-control" onChange={(e) => {
                setDocumentName(e.target.value)
              }} name='name' id="documentName" aria-describedby="documentHelp" />
              {/* <div id="documentHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
              <label htmlfor="documentDescritpion" className="form-label">Document Description</label>
              <input type="text" className="form-control" name='description' onChange={(e) => {
                setDocumentDescritpion(e.target.value)
              }} id="documentDescritpion" aria-describedby="documentHelp" />
              {/* <div id="documentDescritpion" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-4">
              <label htmlfor="document" className="form-label">Document</label>
              <input type="file" onChange={(e) => {
                if (e.target.files.length) {
                 
                  setDocument(e.target.files[0]);
                }

              }} className="form-control" name='file' id="exampleInputPassword1" />
            </div>
            
          <div className='d-grid gap-2 col-10 mx-auto mt-3' >
            <button type="submit" data-bs-dismiss="modal"  className="btn btn-primary position-relative bottom-0 start-90">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" ref={closeBtn} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">EDIT Document</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className='edit-document' >
          <h2 className='text-center' >Edit Document</h2>
          <form onSubmit={handleSubmitEdit} >
            <div className="mb-3">
              <label htmlfor="documentName" className="form-label">Document Name</label>
              <input type="text" className="form-control" value={documentNameEdit} onChange={(e) => {
                setDocumentNameEdit(e.target.value)
              }} name='name' id="documentName" aria-describedby="documentHelp" />
              {/* <div id="documentHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
              <label htmlfor="documentDescritpion" className="form-label">Document Description</label>
              <input type="text" className="form-control" name='description' value={documentDescritpionEdit} onChange={(e) => {
                setDocumentDescritpionEdit(e.target.value)
              }} id="documentDescritpion" aria-describedby="documentHelp" />
            </div>
            <div className="mb-3">
              <label htmlfor="document" className="form-label">Document</label>
              <input type="file" onChange={(e) => {
                if (e.target.files.length) {
                 
                  setDocumentEdit(e.target.files[0]);
                }

              }} className="form-control" name='file' id="exampleInputPassword1" />
            </div>
            {/* <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" htmlfor="exampleCheck1">Check me out</label>
          </div> */}
          <div className='d-grid gap-2 col-10 mx-auto mt-3' >
            <button type="submit" ref={closeBtn}  data-bs-dismiss="modal" className=" btn btn-primary position-relative bottom-0 start-90">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div>
     
        
      </div>
      </div>

    </>
  )
}

export default Home
