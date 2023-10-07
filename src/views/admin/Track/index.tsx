import React from 'react'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import axios from "axios";
import { baseURL } from 'lib/url';


function Track() {

    let { id } = useParams();

    const [code, setCode] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [company, setCompany] = React.useState<string>("");



  return (
    <div>
          <div style={{textAlign: 'center'}}>
              <h1>ส่งข้อมูลขนส่งพัสดุ</h1>

              <form onSubmit={ (e) => { 
                  e.preventDefault();
                 let  id_int : number = parseInt(id as string);
                 const formData = new FormData();
                    formData.append('track', code);
                    formData.append('company', company);
                    formData.append('description', description);
                    formData.append('id', id_int.toString());

                  axios.post(`${baseURL}/track`, formData)
                  .then( (response: any) => {

                    if (response.data.code === 200){
                      alert("Email Sent!");
                      window.location.href = '/admin/shipping';
      
                    } else if (response.data.code === 500) {
                      alert('เกิดข้อผิดพลาด');
                    }
                  })
                  .catch((error: any) => {
                    console.log(error);
                  });
                } }>
              <TextField
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  fullWidth
                  id="company"
                  label="บริษัทขนส่ง"
                  name="company"
                  autoComplete="company"
                />
                <br /> <br />
                <TextField
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  fullWidth
                  id="code"
                  label="รหัสพัสดุ"
                  name="code"
                  autoComplete="code"
                />
                <br /> <br />
                <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="รายละเอียด"
                defaultValue={description}
                name='description'
                onChange={(e) => setDescription(e.target.value)}
                style={{width: '100%', height: '5rem'}}
                />
                <br />
                <br />
                
                <Button type="submit"
                fullWidth
                variant="contained"
                color='success'
                sx={{marginTop: '10px' , borderRadius: '20px' , marginBottom: '10px'}} >ส่งข้อมูล</Button>

              </form>
          </div>
    </div>
  )
}

export default Track
