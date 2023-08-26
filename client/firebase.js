import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Popup.css'
import { v4 } from 'uuid';
import { storage } from '../../../firebase';
import { FirebaseApp } from 'firebase/app';
import {getDownloadURL, listAll, ref, uploadBytes} from 'firebase/storage';





function Popup() {
    

    const fileListRef=ref(storage,'popup/');


 // const [images,setimages]=useState([]);
  const [imageUpload,setImageUpload]=useState(null);
//   const checking=()=>{
//     // console.log(imageUpload);
//     if(imageUpload.size>400000){
//       return false;
//     }
//     const fileExtension = imageUpload.name.split(".").at(-1);
//     const allowedFileTypes = ["jpg", "png","gif","jpeg"];
//     if (!allowedFileTypes.includes(fileExtension)) {
//         return false;
//     }  
//     return true;
// }


const[FormData,setFormData]=useState({
  imgUrl:""
});

const afterurl=async(url)=>{
  setFormData({
    ...FormData,
    imgUrl: url
})
  alert("Image was Succesfully Updated");
}


//  const handleChange = e => {
//       const { value } = e.target
//       setFormData({
//           ...FormData,
//              value
//       })
//   }

  
   // if(!checking()){
    //     alert("Please Upload Valid image on 400KB");
    // }
    // else 
  
  const uploadimage=async ()=>{
    console.log("change image");
    try{
   if(imageUpload!==null){
        const imageRef=ref(storage,'popup/'+v4()+imageUpload.name);
        await uploadBytes(imageRef,imageUpload).then((snapshot)=>{
          getDownloadURL(snapshot.ref).then((url)=>{
            console.log({url}); 
             afterurl(url);
          })
        }) 
    }
    else{
        console.log("nothing")
    }
    // console.log(user);
      } catch (err) {
     console.error(err);
       }
    }


    
    
    useEffect(() => {
      console.log("img change")
        uploadimage();
    }, [imageUpload])



  

  async function submit() {
    try {
      await axios.post("/mypopupapi/addpopup",FormData)
      .then(()=>{alert("popup added successfully")})
      .catch((err)=>{alert(err)})
      window.location.reload()
    } catch (err) {
      alert(err);
    }
  }


  const [popup, setpopup] = useState([]);
  const apicall=async ()=>{
    await axios.get("/mypopupapi/mypopup").then((res) => { setpopup(res.data) });
  }
  useEffect(() => {
    apicall();
  }, [])




  
  return (
    <div>
       <div className="img-upload">
                  <p>Upload image :</p>
                  <label htmlFor="event-img">
                    <i className="fa-solid fa-upload"/>
                  </label>
                  <input type="file" name="event-img"  accept="image/png, image/gif, image/jpeg" 
                   onChange={(e)=>{setImageUpload(e.target.files[0])}} />
                   {/* <button onClick={uploadimage}> add popup</button> */}
                     <button onClick={()=>{submit()}} id='blog-txt-add' className='popupbuton' >Add popup</button>
                </div>

                {popup.map((item) => {
                 return  <img  className='popupimg' src={item?.imgUrl} alt="foto" />  })}
    </div>
  )
}

export default Popup













